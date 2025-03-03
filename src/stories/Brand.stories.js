import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";

import BrandView from "../../src/pages/dashboards/Brand";
import brandReducer from "../redux/slices/brand";

const Template = (args) => <BrandView {...args} />;

const brandStore = configureStore({ reducer: brandReducer });

const Brand = Template.bind({});

Brand.decorators = [
  (Story) => (
    <Provider store={brandStore}>
      <Story />
    </Provider>
  ),
];
