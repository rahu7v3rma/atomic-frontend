import { Box, Button, Skeleton, Tab, Tabs, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ShowMoreText from "react-show-more-text";
import styled from "styled-components";

import { notificationsSelector } from "../../../../../redux/slices/notifications";
import { TabPanel } from "../../helpers";

const AlertsContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  background: #ffffff;
  width: 100%;
  margin-top: 20px;
`;

const AlertsContent = styled(Box)`
  display: flex;
  flex-direction: column;
  margin: 0 20px 20px;
  overflow-y: scroll;
  max-height: 300px;

  ::-webkit-scrollbar {
    width: 5px;
    margin-left: 10px;
  }

  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  ::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

const AlertText = styled(Typography)`
  font-family: "Inter", sans-serif;
  border: none;
  align-items: center;
  margin-left: 10px;
  color: #171717;
  padding-right: 20px;
  display: inline;
  flex-wrap: wrap;
  .text {
    color: #000000;
    font-weight: bold;
  }
`;

const DismissButton = styled(Button)`
  background-color: #f6ccce;
  border: 1px solid #f2b1b3;
  position: relative;
  padding: 0 10px;
  border-radius: 10px;
  height: 40px;
  align-self: flex-end;
`;

const RowView = styled(Box)`
  display: flex;
  flex-direction: row;
  background-color: #fae6e7;
  border: 2px solid #f2b1b3;
  border-radius: 10px;
  padding: 10px;
  margin: 3px;
`;

const TextContainer = styled(Box)`
  display: flex;
  flex-direction: row;
  flex: 1;
  align-items: center;
`;

const ImageView = styled(Box)`
  width: 40px;
  height: 40px;
  min-width: 40px;
  margin-left: 15px;
`;

const LightningDealsImageView = styled(Box)`
  width: 70px;
  height: 80px;
  margin-left: 15px;
`;

const ShowMoreLess = styled(ShowMoreText)({
  display: "inline",
  "& .show-more-less-clickable": {
    color: "grey",
    textDecoration: "none",
  },
});

const Alerts = ({
  notifications,
  dismissNotification,
  dismissAllNotification,
}) => {
  const [filterNotification, setFilterNotification] = useState(notifications);
  const [value, setValue] = React.useState(0);

  useEffect(() => {
    if (notifications.constructor === Object) {
      //Showing only last week's alerts
      let lastWeekDate = new Date().getTime() - 7 * 24 * 60 * 60 * 1000;
      var lastWeekNotifications = notifications.notifications.filter(
        (item) => new Date(item.create_date).getTime() > lastWeekDate
      );
      var lastWeekDeals = notifications.lightning_deals.filter(
        (item) => item.end_date * 1000 > lastWeekDate
      );
      let recentAlerts = {};
      recentAlerts["notifications"] = lastWeekNotifications;
      recentAlerts["lightning_deals"] = lastWeekDeals;
      setFilterNotification(recentAlerts);

      let oosNumAlerts = lastWeekNotifications.filter((line) =>
        line.cause.includes("Stock")
      ).length;
      let priceNumAlerts = lastWeekNotifications - oosNumAlerts;
      let dealsAlertCount = recentAlerts["lightning_deals"].length;
      let tabValue =
        oosNumAlerts > 0
          ? 1
          : dealsAlertCount > 0 && priceNumAlerts === 0
          ? 2
          : 0;
      setValue(tabValue);
    }
  }, [notifications]);

  const { asinNotificationsLoading } = useSelector(notificationsSelector);

  const dismissNotificaitonHandler = (id, alert_category) => {
    dismissNotification(id, alert_category);
  };
  const formatTimeStamp = (dateTimeObject) => {
    const formattedTimestamp = dateTimeObject.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    });
    return formattedTimestamp;
  };

  function tabsProps(index) {
    return {
      value: index,
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }
  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  const dismissAll = () => {
    if (
      window.confirm("Are you sure you want to dismiss all notifications?") ===
      true
    ) {
      dismissAllNotification();
      // handleClose();
    }
  };

  return (
    <AlertsContainer>
      {asinNotificationsLoading === true ? (
        <>
          {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
            <Skeleton
              key={item}
              width={"97%"}
              sx={{ mt: 5, ml: 5 }}
              variant="rectangular"
              height={15}
            />
          ))}
        </>
      ) : (
        <>
          <Tabs value={value} onChange={handleTabChange}>
            <Tab
              label={
                "Price change (" +
                (filterNotification?.notifications?.filter((line) =>
                  line.cause.includes("Price was changed")
                ).length || 0) +
                ")"
              }
              {...tabsProps(0)}
            />
            <Tab
              label={
                "Out of Stock (" +
                (filterNotification?.notifications?.filter((line) =>
                  line.cause.includes("Stock")
                ).length || 0) +
                ")"
              }
              {...tabsProps(1)}
            />
            <Tab
              label={
                "Deals (" +
                (filterNotification?.lightning_deals?.length || 0) +
                ")"
              }
              {...tabsProps(2)}
            />
            <Button
              variant="outlined"
              color="error"
              style={{
                maxWidth: "150px",
                maxHeight: "30px",
                marginLeft: "20px",
                marginTop: "10px",
              }}
              disabled={
                !filterNotification?.notifications?.length &&
                !filterNotification?.lightning_deals?.length
              }
              onClick={dismissAll}
            >
              Dismiss All
            </Button>
          </Tabs>
          <AlertsContent>
            <TabPanel value={value} index={0}>
              {filterNotification?.notifications
                ?.filter((line) => line.cause.includes("Price was changed"))
                .map((notification) => (
                  <RowView>
                    <TextContainer>
                      <ImageView component="img" src={notification.image} />
                      <AlertText>
                        {`New Alert for ASIN `}
                        <span className="text">
                          <a
                            href={`https://www.amazon.com/dp/${notification.asin}?th=1`}
                            target="_blank"
                            rel="noreferrer"
                            style={{ textDecoration: "none" }}
                          >
                            {notification.asin}
                          </a>
                          : {`${notification.cause} `}
                          {` ${notification.price} USD to ${notification.new_price} USD`}
                          {` on ${notification.create_date}. `}
                        </span>
                        <ShowMoreLess
                          /* Default options */
                          lines={1}
                          more="More"
                          less="Less"
                          expanded={false}
                          width={580}
                          truncatedEndingComponent={"... "}
                        >
                          {notification.product_title}
                        </ShowMoreLess>
                      </AlertText>
                    </TextContainer>
                    <DismissButton
                      color="inherit"
                      size="small"
                      onClick={() =>
                        dismissNotificaitonHandler(
                          notification.notification_id,
                          "AT"
                        )
                      }
                    >
                      Dismiss
                    </DismissButton>
                  </RowView>
                ))}
            </TabPanel>
            <TabPanel value={value} index={1}>
              {filterNotification?.notifications
                ?.filter((line) => line.cause.includes("Stock"))
                .map((notification) => (
                  <RowView>
                    <TextContainer>
                      <ImageView component="img" src={notification.image} />
                      <AlertText>
                        {`New Alert for ASIN `}
                        <span className="text">
                          <a
                            href={`https://www.amazon.com/dp/${notification.asin}?th=1`}
                            target="_blank"
                            rel="noreferrer"
                            style={{ textDecoration: "none" }}
                          >
                            {notification.asin}
                          </a>
                          : {`${notification.cause} `}
                          {` on ${notification.create_date}. `}
                        </span>
                        <ShowMoreLess
                          /* Default options */
                          lines={1}
                          more="More"
                          less="Less"
                          expanded={false}
                          width={580}
                          truncatedEndingComponent={"... "}
                        >
                          {notification.product_title}
                        </ShowMoreLess>
                      </AlertText>
                    </TextContainer>
                    <DismissButton
                      color="inherit"
                      size="small"
                      onClick={() =>
                        dismissNotificaitonHandler(
                          notification.notification_id,
                          "AT"
                        )
                      }
                    >
                      Dismiss
                    </DismissButton>
                  </RowView>
                ))}
            </TabPanel>
            <TabPanel value={value} index={2}>
              {filterNotification?.lightning_deals?.map((deal) => (
                <RowView>
                  <TextContainer>
                    <LightningDealsImageView component="img" src={deal.image} />
                    <AlertText>
                      <ShowMoreLess
                        /* Default options */
                        lines={1}
                        more="More"
                        less="Less"
                        expanded={false}
                        width={980}
                        truncatedEndingComponent={"... "}
                      >
                        <>
                          New lightning deal alert for ASIN{" "}
                          <a
                            href={`https://www.amazon.com/dp/${deal.asin}?th=1`}
                            target="_blank"
                            rel="noreferrer"
                            style={{ textDecoration: "none", fontWeight: 700 }}
                          >
                            {deal.asin}
                          </a>{" "}
                          The Confidential - {deal.title}
                        </>
                      </ShowMoreLess>
                      <br />
                      {`Status: ${deal.status}`}
                      <br />
                      {`Start Time: ${formatTimeStamp(
                        new Date(deal.start_date * 1000)
                      )} End Time: ${formatTimeStamp(
                        new Date(deal.end_date * 1000)
                      )}`}
                      <br />
                      {`Deal Price: ${deal.deal_price}`}
                      <br />
                      {`Percent Claimed: ${deal.percent_claimed}`}
                      <br />
                      {`Variation: ${Object.keys(deal.variation)
                        .map((k) => `${k} - ${deal.variation[k]}`)
                        .join(" : ")}`}
                    </AlertText>
                  </TextContainer>
                  <DismissButton
                    color="inherit"
                    size="small"
                    onClick={() => dismissNotificaitonHandler(deal.id, "LD")}
                  >
                    Dismiss
                  </DismissButton>
                </RowView>
              ))}
            </TabPanel>
          </AlertsContent>
        </>
      )}
    </AlertsContainer>
  );
};

export default Alerts;
