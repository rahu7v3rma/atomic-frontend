import { Box, Button, Skeleton, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

import { notificationsSelector } from "../../../../../redux/slices/notifications";

const AlertsContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  background: #ffffff;
  width: 100%;
  margin-top: 20px;
  max-height: 270px;
`;

const AlertsTitle = styled(Typography)`
  font: 500 14px "Inter", sans-serif;
  color: #adb7c4;
  margin: 20px;
`;

const AlertsContent = styled(Box)`
  display: flex;
  flex-direction: column;
  margin: 0 20px;
  overflow-y: scroll;

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

const Alerts = ({ notifications, dismissNotification }) => {
  const [filterNotification, setFilterNotification] = useState(notifications);

  useEffect(() => {
    setFilterNotification(notifications);
  }, [notifications]);

  const { notificationMessage, ledgerAlertsLoading } = useSelector(
    notificationsSelector
  );

  useEffect(() => {
    if (notificationMessage?.result?.success) {
      setFilterNotification((prevFilterNotification) => {
        for (const key in prevFilterNotification[
          notificationMessage?.payload?.sku
        ]) {
          if (key === notificationMessage?.payload?.date) {
            delete prevFilterNotification[notificationMessage?.payload?.sku][
              key
            ];
          }
        }
        return prevFilterNotification;
      });
    }
  }, [notificationMessage]);

  const dismissNotificaitonHandler = (id, sku, date) => {
    dismissNotification(id, sku, date);
  };
  let totalAlerts = 0;
  let lastWeekNotifications = Object.keys(filterNotification).map((sku) =>
    Object.keys(filterNotification[sku]).filter(
      (date) => Date.parse(date) > new Date().setDate(new Date().getDate() - 14)
    )
  );

  if (lastWeekNotifications.length > 0) {
    lastWeekNotifications.forEach((notifications) =>
      notifications.length > 0 ? totalAlerts++ : totalAlerts
    );
  }

  return (
    <AlertsContainer>
      <AlertsTitle>Alerts ({totalAlerts})</AlertsTitle>
      {ledgerAlertsLoading === true ? (
        <>
          {[1, 2, 3, 4, 5].map((item) => (
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
          <AlertsContent>
            {Object.keys(filterNotification).map((sku) =>
              Object.keys(filterNotification[sku])
                .filter(
                  (date) =>
                    Date.parse(date) >
                    new Date().setDate(new Date().getDate() - 14)
                )
                .map((date) => (
                  <RowView>
                    <TextContainer>
                      <AlertText>
                        {`New Inventory alert for SKU `}
                        <span className="text">{sku}</span>
                        {`. Same starting and ending warehouse balance for `}
                        <span className="text">{date}</span>
                        {`: `}
                        <br />
                        {filterNotification[sku][date]["warehouse"].map(
                          (notification) => (
                            <>
                              <span className="text">{notification.units}</span>
                              {` units in warehouse `}
                              <span className="text">
                                {notification.warehouse_code}
                              </span>
                              <br />
                            </>
                          )
                        )}
                        {`Overall `}
                        <span className="text">
                          {filterNotification[sku][date]["sum_units"]}
                        </span>
                      </AlertText>
                    </TextContainer>
                    <DismissButton
                      color="inherit"
                      size="small"
                      onClick={() =>
                        dismissNotificaitonHandler(
                          filterNotification[sku][date]["alert_ids"],
                          sku,
                          date
                        )
                      }
                    >
                      Dismiss
                    </DismissButton>
                  </RowView>
                ))
            )}
          </AlertsContent>
        </>
      )}
    </AlertsContainer>
  );
};

export default Alerts;
