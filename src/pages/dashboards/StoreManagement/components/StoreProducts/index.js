import { Typography } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import TransitionAlerts from "../../../../../components/alerts/TransitionAlert";
import {
  dismissledgerAlerts,
  fetchLedgerAlerts,
  notificationsSelector,
} from "../../../../../redux/slices/notifications";

import TableCustom from "./Table";
import Alerts from "./alerts";

const AlertsTitle = styled(Typography)`
  font: 700 14px "Inter", sans-serif;
  font-size: 25px;
  margin-top: 20px;
`;

const StoreProducts = ({ value }) => {
  const { ledgerAlerts, notificationMessage, notificationFailureErrorMessage } =
    useSelector(notificationsSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    if (value !== "all") {
      dispatch(fetchLedgerAlerts(value));
    }
  }, [dispatch, value]);
  const dismissNotification = useCallback(
    (alert_id, sku, date) => {
      dispatch(
        dismissledgerAlerts({ value, alert_id, sku, date }, () => {
          dispatch(fetchLedgerAlerts(value));
        })
      );
    },
    [dispatch, value]
  );

  const [alertData, setAlertData] = useState({
    errorAlert: false,
    successAlert: false,
    messageSuccess: "",
    messageFailure: "",
  });

  useEffect(() => {
    if (notificationFailureErrorMessage !== null) {
      setAlertData({
        errorAlert: true,
        successAlert: false,
        messageSuccess: "",
        messageFailure: notificationFailureErrorMessage,
      });
    }
  }, [notificationFailureErrorMessage]);
  useEffect(() => {
    if (notificationMessage !== null && notificationMessage?.result !== null) {
      let initData = {
        errorAlert: false,
        successAlert: false,
        messageSuccess: "",
        messageFailure: "",
      };

      if (notificationMessage?.result?.success) {
        initData.successAlert = true;
        initData.messageSuccess = `Alert successfully dismissed for ${notificationMessage?.payload?.value}`;
      }
      if (!notificationMessage?.result?.success) {
        initData.errorAlert = true;
        initData.messageFailure = `Error Occur while dismissed notification for ${notificationMessage?.payload?.value}`;
      }
      setAlertData(initData);
    }
  }, [notificationMessage]);

  return (
    <React.Fragment>
      <>
        <AlertsTitle>Alerts</AlertsTitle>
        <Alerts
          notifications={ledgerAlerts}
          dismissNotification={dismissNotification}
        />
      </>
      <br />
      <>
        <TableCustom value={value} />
      </>
      <TransitionAlerts alert={alertData} />
    </React.Fragment>
  );
};

export default StoreProducts;
