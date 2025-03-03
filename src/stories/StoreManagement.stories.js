import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";

import StoreManagementView from "../../src/pages/dashboards/StoreManagement";
import reviewReducer from "../redux/slices/reviews";

const Template = (args) => <StoreManagementView {...args} />;

const storeManagementStore = configureStore({ reducer: reviewReducer });

const StoreManagement = Template.bind({});

StoreManagement.decorators = [
  (Story) => (
    <Provider store={storeManagementStore}>
      <Story />
    </Provider>
  ),
];
