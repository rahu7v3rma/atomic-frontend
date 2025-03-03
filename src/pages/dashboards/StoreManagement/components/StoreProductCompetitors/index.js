// import { Link } from "@mui/material";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import styled from "styled-components";

import { fetchSkuASINList } from "../../../../../redux/slices/advance_business_report";
import {
  dismissASINNotificationById,
  dismissStoreAllNotifications,
  fetchASINNotifications,
  notificationsSelector,
} from "../../../../../redux/slices/notifications";
import {
  deleteTrackedASIN,
  fetchTrackedASINs,
  productDetailSelector,
} from "../../../../../redux/slices/product_detail";
import { fetchActiveNotificationsCount } from "../../../../../redux/slices/store_analytics";
// import { Gap } from "../ProductSKUDashboard/styles";

import Alerts from "./alerts";
import Keywords from "./keywords";
import TrackCompetitors from "./track-competitors";

// const Store = "/assets/Store.png";

// const ProductText = styled.div`
//   display: flex;
// `;

// const BackArrow = styled.img`
//   width: 32px;
//   height: 32px;
// `;

// const Details = styled.div`
//   margin-left: 16px;
//   font-family: Inter;
//   font-style: normal;
//   font-weight: 600;
//   font-size: 24px;
//   line-height: 32px;
// `;

const StoreProductCompetitors = ({ value }) => {
  const { asinNotifications } = useSelector(notificationsSelector);

  const { trackedASINsData, createAsinData } = useSelector(
    productDetailSelector
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (value !== "all") {
      dispatch(fetchASINNotifications(value));
      dispatch(
        fetchSkuASINList({
          store: value,
        })
      );
      dispatch(fetchTrackedASINs());
    }
  }, [dispatch, value]);

  useEffect(() => {
    if (createAsinData !== null && createAsinData?.message !== null) {
      dispatch(fetchTrackedASINs());
    }
  }, [dispatch, createAsinData]);

  // Dismiss ASIN notification
  //const dismissNotification = (notification_id, alert_category) => {
  // dispatch(
  //    dismissASINNotificationById({ notification_id, alert_category }, () => {
  //      dispatch(fetchActiveNotificationsCount());
  //      dispatch(fetchASINNotifications(value));
  //    })
  //  );
  //};

  // Dismiss All notifications
  const dismissAllNotification = useCallback(() => {
    dispatch(
      dismissStoreAllNotifications(value, () => {
        dispatch(fetchActiveNotificationsCount(value));
        dispatch(fetchASINNotifications(value));
      })
    );
  }, [dispatch, value]);

  const dismissNotification = useCallback(
    (notification_id, alert_category) => {
      dispatch(
        dismissASINNotificationById({ notification_id, alert_category }, () => {
          dispatch(fetchActiveNotificationsCount(value));
          dispatch(fetchASINNotifications(value));
        })
      );
    },
    [dispatch, value]
  );

  // Remove ASIN item from list
  //const removeASINItem = (asin, parentAsin) => {
  //  dispatch(deleteTrackedASIN({ asin, parentAsin }));
  //};
  const removeASINItem = useCallback(
    (asin, parentAsin) => {
      dispatch(deleteTrackedASIN({ asin, parentAsin }));
    },
    [dispatch]
  );
  return (
    <>
      {/*<Gap height={40} />*/}
      {/* <ProductText>
        <div>
          <Link href={"/sm-product-list"}>
            <BackArrow src={Store} />
          </Link>
        </div>
        <Details>Competitors</Details>
      </ProductText> */}

      <TrackCompetitors />
      <Alerts
        notifications={asinNotifications}
        dismissNotification={dismissNotification}
        dismissAllNotification={dismissAllNotification}
      />
      <Keywords
        asinList={trackedASINsData}
        removeASINItem={removeASINItem}
        value={value}
      />
    </>
  );
};

export default StoreProductCompetitors;
