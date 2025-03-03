import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import * as React from "react";

import { columns, products } from "./Data";
import TableCustom from "./Table";
import { calculations } from "./TableRow";

describe("if table component renders all data", () => {
  beforeEach(() => {
    render(<TableCustom />);
  });
  afterEach(cleanup);
  it("if there is button for first dropdown / stores filteration", () => {
    const button = screen.getByText("All Stores");
    expect(button).toBeInTheDocument();
    expect(button.tagName).toBe("BUTTON");
  });
  it("if there is button for second dropdown / conditional comparison", () => {
    const button = screen.getByText("7 days snapshot - Last period");
    expect(button).toBeInTheDocument();
    expect(button.tagName).toBe("BUTTON");
  });
  it("if table header columns are all rendered / verified from dummy api", () => {
    // if all columns headers from dummy data api is present
    columns.forEach((column) => {
      const column_local = screen.getByText(column);
      expect(column_local).toBeInTheDocument();
      const tagIdentity = column_local.getAttribute("data-testid");
      expect(tagIdentity).toBe("table_header");
    });
  });
});
describe("if dummy data API table body data is rendered", () => {
  beforeEach(() => {
    render(<TableCustom />);
  });
  afterEach(cleanup);
  it("if product rows are rendered", () => {
    // if first row is rendered
    const productsNames = screen.getAllByTestId("product_name");
    for (let i = 0; i < products.length; i++) {
      expect(productsNames[i].textContent).toBe(products[i].name);
    }
    const productsImages = screen.getAllByTestId("product_image");
    for (let i = 0; i < products.length; i++) {
      expect(productsImages[i].src).toBe(products[i].image);
    }
    const productsLinks = screen.getAllByTestId("product_href");
    for (let i = 0; i < products.length; i++) {
      expect(productsLinks[i].href).toBe(products[i].href);
    }
    const productsSku = screen.getAllByTestId("product_sku");
    for (let i = 0; i < products.length; i++) {
      expect(productsSku[i].textContent).toBe(`SKU: ${products[i].sku}`);
    }
  });
  it("if all other rows data is rendered", async () => {
    const table_data_metrics = calculations(products[0], {
      duration: 7,
      compare: "last_period",
    });

    for (let key in table_data_metrics) {
      // testing for 3pl_quantity, fba_quantity and days_of supply visible data for first row
      if (key === "quantity3pl") {
        const element = screen.getAllByTestId("2nd_3rd_column_visible_data")[0];
        expect(element).toHaveTextContent(table_data_metrics[key]);
      }
      if (key === "quantityfba") {
        const element = screen.getAllByTestId("2nd_3rd_column_visible_data")[1];
        expect(element).toHaveTextContent(table_data_metrics[key]);
      }
      if (key === "daysOfSupply") {
        const element = screen.getAllByTestId("4th_column_visible_data")[0];
        expect(element).toHaveTextContent(table_data_metrics[key]);
      }
      // testing for 3pl_quantity tooltip data for first row
      if (
        key === "quantity3plAvailable" ||
        key === "quantity3plReserved" ||
        key === "quantity3plInbound"
      ) {
        fireEvent.mouseOver(
          screen.getAllByTestId("2nd_3rd_columns_tooltip")[0]
        );
        await waitFor(() => {
          const element = screen.getAllByTestId(
            "2nd_3rd_column_tooltip_menu"
          )[0];
          expect(element).toHaveTextContent(table_data_metrics[key]);
        });
      }
      // testing for fba_quantity tooltip data for first row
      if (
        key === "quantityfbaAvailable" ||
        key === "quantityfbaReserved" ||
        key === "quantityfbaInbound"
      ) {
        fireEvent.mouseOver(
          screen.getAllByTestId("2nd_3rd_columns_tooltip")[1]
        );
        await waitFor(() => {
          const element = screen.getAllByTestId(
            "2nd_3rd_column_tooltip_menu"
          )[1];
          expect(element).toHaveTextContent(table_data_metrics[key]);
        });
      }
      // testing for days_of_supply tooltip data for first row
      if (key === "daysOfSupplyPieces" || key === "daysOfSupplyBefore") {
        fireEvent.mouseOver(screen.getAllByTestId("4th_column_tooltip")[0]);
        await waitFor(() => {
          const element = screen.getAllByTestId("4th_column_tooltip_menu")[0];
          expect(element).toHaveTextContent(table_data_metrics[key]);
        });
      }
      // testing for current data - conversion_rate , sales_velocity, reviews_velocity and bsr for first row
      if (key === "conversionRateCurrent") {
        const element = screen.getAllByTestId("comparison_data_current")[0];
        expect(element).toHaveTextContent(table_data_metrics[key]);
      }
      if (key === "salesVelocityCurrent") {
        const element = screen.getAllByTestId("comparison_data_current")[1];
        expect(element).toHaveTextContent(table_data_metrics[key]);
      }
      if (key === "reviewVelocityCurrent") {
        const element = screen.getAllByTestId("comparison_data_current")[2];
        expect(element).toHaveTextContent(table_data_metrics[key]);
      }
      if (key === "bsrCurrent") {
        const element = screen.getAllByTestId("comparison_data_current")[3];
        expect(element).toHaveTextContent(table_data_metrics[key]);
      }
      // testing for compare data - conversion_rate , sales_velocity, reviews_velocity and bsr for first row
      if (key === "conversionRateChangePercent") {
        const element = screen.getAllByTestId("comparison_data_compare")[0];
        expect(element).toHaveTextContent(table_data_metrics[key]);
      }
      if (key === "salesVelocityChangePercent") {
        const element = screen.getAllByTestId("comparison_data_compare")[1];
        expect(element).toHaveTextContent(table_data_metrics[key]);
      }
      if (key === "reviewVelocityChangePercent") {
        const element = screen.getAllByTestId("comparison_data_compare")[2];
        expect(element).toHaveTextContent(table_data_metrics[key]);
      }
      if (key === "bsrChangePercent") {
        const element = screen.getAllByTestId("comparison_data_compare")[3];
        expect(element).toHaveTextContent(table_data_metrics[key]);
      }
    }
  });
  it("if values change on stores filteration", async () => {
    // removing the first store from front list
    fireEvent.click(screen.getByTestId("button_stores_filteration"));
    fireEvent.click(screen.getAllByTestId("store_selection_checkbox")[0]);
    fireEvent.click(screen.getByTestId("stores_filteration_save"));
    // verifying with the first row = 3pl quantity
    const element = screen.getAllByTestId(
      "2nd_3rd_column_visible_data"
    ).textContent;
    expect(element).not.toBe(products[0].data.quantity_3pl.visible);
  });
  it("if values change on compare conditions- for 30 days - last period", async () => {
    // removing the first store from front list
    fireEvent.click(screen.getByTestId("button_conditional_filteration"));
    fireEvent.click(screen.getByTestId("30_days_duration_checkbox"));
    // calcuating the average for conversion rate current and compare
    const object = calculations(products[0], {
      duration: 30,
      compare: "last_period",
    });
    // verifying with the first row - conversion rate
    const element1 = screen.getAllByTestId("comparison_data_current")[0];
    expect(element1).toHaveTextContent(object.conversionRateCurrent);
    const element2 = screen.getAllByTestId("comparison_data_compare")[0];
    expect(element2).toHaveTextContent(object.conversionRateChangePercent);
  });
});
