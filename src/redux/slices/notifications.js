import { createSlice } from "@reduxjs/toolkit";

import { atomicConfig } from "../../config";
import { call_api_auth } from "../../utils/services";

const initialState = {
  notifications: [],
  notificationsLoading: false,
  notificationsErrorMessage: null,
  asinNotifications: [],
  asinNotificationsLoading: false,
  asinNotificationsErrorMessage: null,
  notificationMessage: null,
  notificationMessageLoading: null,
  notificationFailureErrorMessage: null,
  ledgerAlerts: [],
  ledgerAlertsLoading: false,
  ledgerAlertsErrorMessage: null,
};

// A slice for notifications with our 3 reducers
const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    getNotifications: (state) => {
      state.notifications = [];
      state.notificationsLoading = true;
      state.notificationsErrorMessage = null;
    },
    getNotificationsSuccess: (state, { payload }) => {
      state.notifications = payload;
      state.notificationsLoading = false;
      state.notificationsErrorMessage = null;
    },
    getNotificationsFailure: (state, { payload }) => {
      state.notificationsLoading = false;
      state.notificationsErrorMessage = payload;
    },
    getASINNotifications: (state) => {
      state.asinNotifications = [];
      state.asinNotificationsLoading = true;
      state.asinNotificationsErrorMessage = null;
    },
    getASINNotificationsSuccess: (state, { payload }) => {
      state.asinNotifications = payload;
      state.asinNotificationsLoading = false;
      state.asinNotificationsErrorMessage = null;
    },
    getASINNotificationsFailure: (state, { payload }) => {
      state.asinNotificationsLoading = false;
      state.asinNotificationsErrorMessage = payload;
    },
    dismissASINNotification: (state) => {
      state.notificationMessage = [];
      state.notificationMessageLoading = true;
      state.notificationFailureErrorMessage = null;
    },
    dismissASINNotificationSuccess: (state, { payload }) => {
      state.asinNotifications.notifications =
        state.asinNotifications.notifications.filter(
          (notification) =>
            notification.notification_id !== payload.payload.notification_id
        );
      state.notificationMessage = payload;
      state.notificationMessageLoading = false;
      state.notificationFailureErrorMessage = null;
    },
    dismissASINNotificationFailure: (state, { payload }) => {
      state.notificationMessageLoading = false;
      state.notificationFailureErrorMessage = payload;
    },
    dismissNotification: (state) => {
      state.notificationsLoading = true;
    },
    dismissNotificationSuccess: (state, { payload }) => {
      if (payload?.storeName) {
        state.notifications = [];
      } else {
        state.notifications = state.notifications.filter(
          (notification) =>
            notification.notification_id !== payload.notification_id
        );
      }
      state.notificationsLoading = false;
      state.notificationsErrorMessage = null;
    },
    dismissNotificationFailure: (state, { payload }) => {
      state.notificationsLoading = false;
      state.notificationsErrorMessage = payload;
    },
    dismissAllStoreNotifications: (state) => {
      state.asinNotificationsLoading = true;
      state.notificationFailureErrorMessage = null;
    },
    dismissAllStoreNotificationsSuccess: (state, { _ }) => {
      state.asinNotifications.notifications = [];
      state.asinNotificationsLoading = false;
      state.notificationsErrorMessage = null;
    },
    dismissAllStoreNotificationsFailure: (state, { payload }) => {
      state.asinNotificationsLoading = false;
      state.notificationFailureErrorMessage = payload;
    },
    getLedgerAlerts: (state) => {
      state.ledgerAlerts = [];
      state.ledgerAlertsLoading = true;
      state.ledgerAlertsErrorMessage = null;
    },
    getLedgerAlertsSuccess: (state, { payload }) => {
      state.ledgerAlerts = payload;
      state.ledgerAlertsLoading = false;
      state.ledgerAlertsErrorMessage = null;
    },
    getLedgerAlertsFailure: (state, { payload }) => {
      state.ledgerAlertsLoading = false;
      state.ledgerAlertsErrorMessage = payload;
    },
    dismissLedgerAlerts: (state) => {
      state.notificationMessage = [];
      state.notificationMessageLoading = true;
      state.notificationFailureErrorMessage = null;
    },
    dismissLedgerAlertsSuccess: (state, { payload }) => {
      for (const key in state.ledgerAlerts[payload.payload.sku]) {
        if (key === payload.payload.date) {
          delete state.ledgerAlerts[payload.payload.sku][key];
        }
      }
      state.notificationMessage = payload;
      state.notificationMessageLoading = false;
      state.notificationFailureErrorMessage = null;
    },
    dismissLedgerAlertsFailure: (state, { payload }) => {
      state.notificationMessageLoading = false;
      state.notificationFailureErrorMessage = payload;
    },
  },
});

// Three actions generated from the slice
const {
  getNotifications,
  getNotificationsSuccess,
  getNotificationsFailure,
  getASINNotifications,
  getASINNotificationsSuccess,
  getASINNotificationsFailure,
  dismissNotification,
  dismissNotificationSuccess,
  dismissNotificationFailure,
  dismissAllStoreNotifications,
  dismissAllStoreNotificationsSuccess,
  dismissAllStoreNotificationsFailure,
  dismissASINNotification,
  dismissASINNotificationSuccess,
  dismissASINNotificationFailure,
  getLedgerAlerts,
  getLedgerAlertsSuccess,
  getLedgerAlertsFailure,
  dismissLedgerAlerts,
  dismissLedgerAlertsSuccess,
  dismissLedgerAlertsFailure,
} = notificationsSlice.actions;

// A selector
export const notificationsSelector = (state) => state.notifications;

// The reducer
export default notificationsSlice.reducer;

export function fetchNotifications(payload) {
  return async (dispatch) => {
    dispatch(getNotifications());

    if (payload.store === "all" || payload.store === null) {
      dispatch(getNotificationsFailure("No store selected"));
      return;
    }

    let url = `${atomicConfig.storeManagementServiceUrl}/fetch-notifications/${payload.store}`;
    try {
      let result = await call_api_auth(url, "GET");

      result = result.data;

      dispatch(getNotificationsSuccess(result));
    } catch (error) {
      const message = error.message || "Something went wrong";
      dispatch(getNotificationsFailure(message));
    }
  };
}

export function dismissNotifications(payload) {
  return async (dispatch) => {
    fetch(dismissNotification());
    let url = `${atomicConfig.storeManagementServiceUrl}/read-notification`;
    let json_body = {};

    // Creating a JSON based on dismiss single and dismiss all notifications
    if (payload.notification_id) {
      json_body = JSON.stringify({
        notification_id: payload.notification_id,
      });
    } else {
      json_body = JSON.stringify({
        store: payload.storeName,
      });
    }

    try {
      let result = await call_api_auth(url, "POST", json_body);
      result = result.data;
      if (result.message) {
        dispatch(dismissNotificationSuccess(payload));
      }
    } catch (error) {
      const message = error.message || "Something went wrong";
      dispatch(dismissNotificationFailure(message));
    }
  };
}

export function fetchASINNotifications(store) {
  return async (dispatch) => {
    dispatch(getASINNotifications());

    let url = `${atomicConfig.storeManagementServiceUrl}/fetch-asin-notifications/${store}`;
    try {
      let result = await call_api_auth(url, "GET");
      result = result.data;

      dispatch(getASINNotificationsSuccess(result));
    } catch (error) {
      const message = error.message || "Something went wrong";
      dispatch(getASINNotificationsFailure(message));
    }
  };
}

export function dismissStoreAllNotifications(store, callback) {
  return async (dispatch) => {
    dispatch(dismissAllStoreNotifications());

    let url = `${atomicConfig.storeManagementServiceUrl}/dismiss-store-asin-tracking-notification/${store}`;
    try {
      let result = await call_api_auth(url, "GET");
      result = result.data;

      dispatch(dismissAllStoreNotificationsSuccess(result));
      callback();
    } catch (error) {
      const message = error.message || "Something went wrong";
      dispatch(dismissAllStoreNotificationsFailure(message));
    }
  };
}

export function dismissASINNotificationById(payload, callback) {
  return async (dispatch) => {
    fetch(dismissASINNotification());
    let url = `${atomicConfig.storeManagementServiceUrl}/dismiss-asin-tracking-notification`;
    let json_body = {};

    json_body = JSON.stringify({
      notification_id: payload.notification_id,
      alert_category: payload.alert_category,
    });

    try {
      let result = await call_api_auth(url, "POST", json_body);
      result = result.data;
      if (result.message) {
        dispatch(dismissASINNotificationSuccess({ result, payload }));
        callback();
      }
    } catch (error) {
      const message = error.message || "Something went wrong";
      dispatch(dismissASINNotificationFailure(message));
    }
  };
}

export function fetchLedgerAlerts(store) {
  return async (dispatch) => {
    dispatch(getLedgerAlerts());

    let url = `${atomicConfig.storeManagementServiceUrl}/get-inventory-alerts/${store}`;
    try {
      let result = await call_api_auth(url, "GET");
      result = result.data;

      dispatch(getLedgerAlertsSuccess(result));
    } catch (error) {
      const message = error.message || "Something went wrong";
      dispatch(getLedgerAlertsFailure(message));
    }
  };
}

export function dismissledgerAlerts(payload, callback) {
  return async (dispatch) => {
    fetch(dismissLedgerAlerts());
    let url = `${atomicConfig.storeManagementServiceUrl}/dismiss-inventory-alert/${payload.value}`;
    let json_body = {};

    if (payload.alert_id) {
      json_body = JSON.stringify({
        alert_ids: payload.alert_id,
      });
    }

    try {
      let result = await call_api_auth(url, "POST", json_body);
      result = result.data;
      if (result.success) {
        dispatch(dismissLedgerAlertsSuccess({ result, payload }));
        callback();
      }
    } catch (error) {
      const message = error.message || "Something went wrong";
      dispatch(dismissLedgerAlertsFailure(message));
    }
  };
}
