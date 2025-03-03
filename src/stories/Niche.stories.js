import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";

import NicheView from "../../src/pages/dashboards/Niche";
import nicheReducer from "../redux/slices/niche";

const Template = (args) => <NicheView {...args} />;

const nicheStore = configureStore({ reducer: nicheReducer });

const Niche = Template.bind({});

Niche.decorators = [
  (Story) => (
    <Provider store={nicheStore}>
      <Story />
    </Provider>
  ),
];
