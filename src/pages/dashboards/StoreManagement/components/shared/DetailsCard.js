import { ArrowBackIos } from "@mui/icons-material";
import { Button, Container, Typography } from "@mui/material";
// import Box from "@mui/material/Box";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import Modal from "@mui/material/Modal";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components/macro";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  height: 700,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  display: "flex",
  justifyContent: "center",
};

const Card = styled.div`
  padding: 24px;
  height: 100%;
  width: 100%;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Logo = styled.div`
  width: 24px;
  height: 24px;
  background: #a855f7;
  border-radius: 4.8px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  width: 100%;
  height: 24px;
  font-family: "Inter";
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  color: #0f172a;
  padding-left: 12px;
  margin: 0px;
`;

const HighlightedArea = styled.div`
  display: flex;
  align-items: center;
  padding: 16px;
  gap: 8px;
  width: 100%;
  height: 64px;
  background: #f8fafc;
  border-radius: 8px;
  margin-top: 24px;
  margin-bottom: 24px;
`;

const StatusTitle = styled.span`
  width: 100%;
  height: 32px;
  font-family: "Inter";
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 32px;
  color: #0f172a;
`;

const Warnings = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const WarningTitle = styled.h3`
  flex: 1;
  min-height: 24px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 24px;
  color: #0f172a;
  padding-left: 13px;
  margin: 0px;
`;

const WarningDescription = styled.h3`
  flex: 1.1;
  min-height: 24px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 24px;
  text-align: right;
  color: #475569;
  padding-right: 20px;
  margin: 0px;
`;

const HorizontalLine = styled.div`
  width: 100%;
  height: 1px;
  background: #e2e8f0;
  margin-top: 15px;
  margin-bottom: 15px;
`;

const Boxes = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Box1 = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 16px;
  gap: 8px;
  width: 100%;
  height: 96px;
  background: #f8fafc;
  border-radius: 8px;
  margin-top: 24px;
  margin-bottom: 24px;
`;

const BoxTitle = styled.h3`
  width: 100%;
  height: 24px;
  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 24px;
  color: #64748b;
  padding: 0px;
  margin: 0px;
`;

const BoxValue = styled.h1`
  width: 100%;
  height: 32px;
  font-family: "Inter";
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 32px;
  color: #0f172a;
  padding: 0px;
  margin: 0px;
`;

const Reviews = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
  width: 100%;
  height: 96px;
  background: #f8fafc;
  border-radius: 8px;
  margin-top: 24px;
  margin-bottom: 24px;
`;

const ReviewTitle = styled.h1`
  width: 100%;
  height: 32px;
  font-family: "Inter";
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 32px;
  color: #0f172a;
  margin: 0px;
`;

const ReviewDescription = styled.p`
  width: 100%;
  height: 24px;
  font-family: "Inter";
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 24px;
  color: #d99706;
  margin: 0px;
  padding-top: 10px;
  display: flex;
  flex: 1;
  align-items: center;
`;

const NewReviewsText = styled.span`
  padding-left: 6.3px;
  padding-right: 12px;
`;

const Dot = styled.span`
  width: 3px;
  height: 3px;
  background: #475569;
  border-radius: 50%;
  display: inline-block;
`;

const TotalReviewsText = styled.span`
  height: 24px;
  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 24px;
  color: #64748b;
  padding-left: 12px;
`;

const Error = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 24px;
`;

const BackButton = styled.span`
  svg {
    cursor: pointer;
  }
`;

const NotificationContent = styled.div`
  overflow-y: auto;
  height: 180px;
`;

const Notification = styled.div`
  padding: 8px;
  margin: 5px;
  background-color: aliceblue;
  display: flex;
  align-items: start;
`;

const Message = styled.p`
  margin: 0px;
`;

const LearnBtn = styled(Button)`
  font-family: "Inter";
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 24px;
  color: #334155;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  margin-top: 20px;
  background: #ffffff;
  padding: 4px 16px;
`;

const CheckIcon = styled.img`
  width: 14px;
  height: 10px;
`;

const DetailsCard = ({
  title,
  firstWarningTitle,
  firstWarningValue,
  firstWarningDetails,
  secondWarningTitle,
  secondWarningValue,
  inventory,
  reviews,
  questionList,
  showLearnMore,
  isCheck,
  notifications,
  dismissNotification,
  dismissAllNotification,
  strikeFirstWarning = false,
  strikeSecondWarning = false,
  secondRowShow = true,
}) => {
  const [detailsMessage, setDetailsMessage] = useState(false);
  const is_static_data = () => {
    if (title !== "Listings") {
      return <img src="/static/img/random/warning.svg" alt="warning" />;
    }
  };
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const { store_analytics } = useSelector((state) => state);

  const handleClose = () => {
    setOpen(false);
    setDetailsMessage(false);
  };

  const dismissAll = () => {
    if (
      window.confirm("Are you sure you want to dismiss all notifications?") ===
      true
    ) {
      dismissAllNotification();
      handleClose();
    }
  };

  useEffect(() => {
    if (detailsMessage !== false) {
      handleOpen(true);
    }
  }, [detailsMessage]);

  const renderContent = () => {
    if (title === "Listings") {
      return (
        <HighlightedArea>
          <img src="/static/img/random/light.svg" alt="light" />
          <StatusTitle>All active</StatusTitle>
        </HighlightedArea>
      );
    } else if (title === "Ads") {
      return (
        <HighlightedArea>
          <img src="/static/img/random/light.svg" alt="light" />
          <StatusTitle>All active</StatusTitle>
        </HighlightedArea>
      );
    } else if (title === "Inventory") {
      return (
        <Boxes>
          <Box1>
            <BoxTitle>Manufacturing</BoxTitle>
            <BoxValue
              style={{
                textDecoration: inventory?.strikeManufacturing
                  ? "line-through"
                  : "none",
              }}
            >
              {inventory.manufacturing}
            </BoxValue>
          </Box1>
          <Box1>
            <BoxTitle>Shipping</BoxTitle>
            <BoxValue
              style={{
                textDecoration: inventory?.strikeManufacturing
                  ? "line-through"
                  : "none",
              }}
            >
              {inventory.shipping}
            </BoxValue>
          </Box1>
          <Box1>
            <BoxTitle>Warehouses</BoxTitle>
            <BoxValue
              style={{
                textDecoration: inventory?.strikeWarehouses
                  ? "line-through"
                  : "none",
              }}
            >
              {inventory.warehouses}
            </BoxValue>
          </Box1>
        </Boxes>
      );
    } else {
      return (
        <Reviews>
          <ReviewTitle
            style={{
              textDecoration: reviews?.strikeReviews ? "line-through" : "none",
            }}
          >
            {reviews.average}
          </ReviewTitle>
          <ReviewDescription>
            <img src="/static/img/random/star.svg" alt="arrow-forward" />
            <NewReviewsText
              style={{
                textDecoration: reviews?.strikeReviews
                  ? "line-through"
                  : "none",
              }}
            >
              {reviews.new} new reviews
            </NewReviewsText>
            <Dot />
            <TotalReviewsText
              style={{
                textDecoration: reviews?.strikeReviews
                  ? "line-through"
                  : "none",
              }}
            >
              {reviews.total} reviews in total
            </TotalReviewsText>
          </ReviewDescription>
        </Reviews>
      );
    }
  };

  const getLogoBg = () => {
    if (title === "Listings" || title === "Inventory") {
      return "#A855F7";
    } else if (title === "Ads" || title === "Trending Q&A") {
      return "#6366F1";
    } else {
      return "#F59E0B";
    }
  };

  const getCardHeight = () => {
    if (title === "Listings" || title === "Ads") {
      return 272;
    } else {
      return 304;
    }
  };

  const questionsList = (item, index) => {
    return (
      <React.Fragment key={index}>
        {index !== 0 && <HorizontalLine />}
        <Warnings>
          <span>{index + 1}</span>
          <WarningTitle>Question</WarningTitle>
          <WarningDescription style={{ textDecoration: "line-through" }}>
            {item.number}
          </WarningDescription>
          <img src="/static/img/random/arrow-forward.svg" alt="arrow-forward" />
        </Warnings>
      </React.Fragment>
    );
  };

  return (
    <>
      <Card style={{ minHeight: getCardHeight() }}>
        {!detailsMessage ? (
          <>
            <Header>
              <Logo style={{ backgroundColor: getLogoBg() }}>
                <img src="/static/img/random/trolley.svg" alt="trolley" />
              </Logo>
              <Title>{title}</Title>
              {is_static_data()}
            </Header>

            {title === "Trending Q&A" ? (
              <Container
                sx={{ marginTop: 8 }}
                style={{ textDecoration: "line-through" }}
              >
                {questionList.map((item, index) => {
                  return questionsList(item, index);
                })}
              </Container>
            ) : (
              <>
                {renderContent()}

                <Warnings>
                  {isCheck ? (
                    <CheckIcon src="./assets/Vector.png" alt="check" />
                  ) : (
                    <img src="/static/img/random/warning.svg" alt="warning" />
                  )}

                  <WarningTitle
                    style={
                      title !== "Listings"
                        ? {
                            textDecoration: strikeFirstWarning
                              ? "line-through"
                              : "none",
                          }
                        : {}
                    }
                  >
                    {firstWarningTitle}
                  </WarningTitle>
                  <WarningDescription
                    style={
                      title !== "Listings"
                        ? {
                            textDecoration: strikeFirstWarning
                              ? "line-through"
                              : "none",
                          }
                        : {}
                    }
                  >
                    {firstWarningValue}
                  </WarningDescription>
                  <img
                    style={{ cursor: "pointer" }}
                    src="/static/img/random/arrow-forward.svg"
                    alt="arrow-forward"
                    onClick={() => setDetailsMessage(firstWarningDetails)}
                  />
                </Warnings>
                <HorizontalLine />
                {secondRowShow && (
                  <Warnings>
                    {isCheck ? (
                      <CheckIcon src="./assets/Vector.png" alt="check" />
                    ) : (
                      <img src="/static/img/random/warning.svg" alt="warning" />
                    )}
                    <WarningTitle
                      style={{
                        textDecoration: strikeSecondWarning
                          ? "line-through"
                          : "none",
                      }}
                    >
                      {secondWarningTitle}
                    </WarningTitle>
                    <WarningDescription
                      style={{
                        textDecoration: strikeSecondWarning
                          ? "line-through"
                          : "none",
                      }}
                    >
                      {secondWarningValue}
                    </WarningDescription>
                    <img
                      src="/static/img/random/arrow-forward.svg"
                      alt="arrow-forward"
                    />
                  </Warnings>
                )}
              </>
            )}
          </>
        ) : (
          <>
            <Header>
              <Logo style={{ backgroundColor: getLogoBg() }}>
                <img src="/static/img/random/trolley.svg" alt="trolley" />
              </Logo>
              <Title>{title}</Title>
            </Header>

            {title === "Listings" ? (
              <>
                <Modal
                  aria-labelledby="transition-modal-title"
                  aria-describedby="transition-modal-description"
                  open={open}
                  onClose={handleClose}
                  // closeAfterTransition
                  BackdropComponent={Backdrop}
                  BackdropProps={{
                    timeout: 500,
                  }}
                >
                  <Fade in={open}>
                    <Box sx={style}>
                      <div
                        style={{
                          display: "inline-flex",
                          width: "100%",
                          justifyContent: "space-between",
                          position: "absolute",
                          left: "0",
                          right: "0",
                          padding: "0 20px",
                          alignItems: "center",
                        }}
                      >
                        {store_analytics && (
                          <Typography
                            style={{
                              textTransform: "capitalize",
                              alignItems: "start",
                              float: "left",
                              fontWeight: 600,
                              fontSize: "15px",
                            }}
                          >
                            {store_analytics.store} Notifications
                          </Typography>
                        )}
                        <div>
                          <span
                            variant=""
                            style={{
                              alignItems: "end",
                              float: "right",
                              marginLeft: 10,
                              paddingTop: 8,
                              fontWeight: "bold",
                              cursor: "pointer",
                            }}
                            onClick={handleClose}
                          >
                            X
                          </span>
                          <Button
                            variant="outlined"
                            color="error"
                            style={{
                              alignItems: "end",
                              float: "right",
                              marginBottom: "10px",
                            }}
                            disabled={!notifications.length}
                            onClick={dismissAll}
                          >
                            Dismiss All
                          </Button>
                        </div>
                      </div>
                      {notifications.length ? (
                        <NotificationContent
                          style={{
                            height: "95%",
                            display: "inline-block",
                            marginTop: "45px",
                          }}
                        >
                          {notifications.map((notification) => {
                            return (
                              <Notification key={notification.notification_id}>
                                <Message style={{ marginTop: 0 }}>
                                  {notification.message}
                                </Message>
                                <Button
                                  variant="outlined"
                                  color="error"
                                  onClick={() =>
                                    dismissNotification(
                                      notification.notification_id
                                    )
                                  }
                                >
                                  Dismiss
                                </Button>
                              </Notification>
                            );
                          })}
                        </NotificationContent>
                      ) : (
                        <Typography
                          style={{
                            alignItems: "center",
                            float: "left",
                            fontWeight: 600,
                            fontSize: "15px",
                            display: "flex",
                          }}
                        >
                          You don't have any notification
                        </Typography>
                      )}
                    </Box>
                  </Fade>
                </Modal>
              </>
            ) : (
              <Error>
                <BackButton onClick={() => setDetailsMessage(false)}>
                  <ArrowBackIos />
                </BackButton>
                <Message>{detailsMessage}</Message>
              </Error>
            )}
          </>
        )}
        {showLearnMore && <LearnBtn>Learn more</LearnBtn>}
      </Card>
    </>
  );
};

export default DetailsCard;
