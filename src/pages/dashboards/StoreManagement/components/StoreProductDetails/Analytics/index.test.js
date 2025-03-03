import { cleanup, render, screen, waitFor } from "@testing-library/react";

import App from "./App";
import { dates } from "./data";

beforeEach(() => {
  render(<App />);
});
afterEach(cleanup);
describe("first section", () => {
  it("heading", () =>
    expect(screen.getByText("Analytics")).toBeInTheDocument());
  describe("calendar", () => {
    it("iconBefore", () => {
      expect(screen.getByTestId("calendarIconBefore")).toBeInTheDocument();
    });
    it("text", () =>
      expect(screen.getByText("This month")).toBeInTheDocument());
    it("iconAfter", () => {
      expect(screen.getByTestId("calendarIconAfter")).toBeInTheDocument();
    });
  });
  describe("stores", () => {
    it("text", () =>
      expect(screen.getByText("All Stores")).toBeInTheDocument());
    it("iconAfter", () => {
      expect(screen.getByTestId("storesIconAfter")).toBeInTheDocument();
    });
  });
});
describe("second section", () => {
  describe("cards", () => {
    describe("first", () => {
      it("i1", () =>
        expect(screen.getByTestId("Sales_i1")).toBeInTheDocument());
      it("e1", () =>
        expect(screen.getAllByText("Sales")[0]).toBeInTheDocument());
      it("e2", () => expect(screen.getByText("$229,582")).toBeInTheDocument());
      it("i2", () =>
        expect(screen?.getByTestId("Sales_i2")).toBeInTheDocument());
      it("e3", () => expect(screen.getByText("9.2%")).toBeInTheDocument());
      it("e4", () =>
        expect(screen.getByText("Net profit ($)")).toBeInTheDocument());
      it("e5", () => expect(screen.getByText("$127,582")).toBeInTheDocument());
      it("e6", () =>
        expect(screen.getByText("Net margin (%)")).toBeInTheDocument());
      it("e7", () => expect(screen.getByText("59.2%")).toBeInTheDocument());
    });
    describe("second", () => {
      it("i1", () =>
        expect(screen.getByTestId("Orders_i1")).toBeInTheDocument());
      it("e1", () => expect(screen.getByText("Orders")).toBeInTheDocument());
      it("e2", () => expect(screen.getByText("692")).toBeInTheDocument());
      it("i2", () =>
        expect(screen?.getByTestId("Orders_i2")).toBeInTheDocument());
      it("e3", () => expect(screen.getByText("8.4%")).toBeInTheDocument());
      it("e4", () => expect(screen.getByText("Returns")).toBeInTheDocument());
      it("e5", () => expect(screen.getByText("45")).toBeInTheDocument());
      it("e6", () => expect(screen.getByText("Customers")).toBeInTheDocument());
      it("e7", () => expect(screen.getByText("628")).toBeInTheDocument());
    });
    describe("third", () => {
      it("i1", () =>
        expect(screen.getByTestId("Conversion Rate_i1")).toBeInTheDocument());
      it("e1", () =>
        expect(screen.getByText("Conversion Rate")).toBeInTheDocument());
      it("e2", () => expect(screen.getByText("2.56%")).toBeInTheDocument());
      it("i2", () =>
        expect(screen?.getByTestId("Conversion Rate_i2")).toBeInTheDocument());
      it("e3", () => expect(screen.getByText("5.3%")).toBeInTheDocument());
      it("e4", () => expect(screen.getByText("Sessions")).toBeInTheDocument());
      it("e5", () => expect(screen.getByText("18,400")).toBeInTheDocument());
      it("e6", () =>
        expect(screen.getByText("Page Views")).toBeInTheDocument());
      it("e7", () => expect(screen.getByText("22,200")).toBeInTheDocument());
    });
    describe("fourth", () => {
      it("i1", () =>
        expect(screen.getByTestId("Ads Spent_i1")).toBeInTheDocument());
      it("e1", () => expect(screen.getByText("Ads Spent")).toBeInTheDocument());
      it("e2", () => expect(screen.getByText("$50,703")).toBeInTheDocument());
      it("i2", () =>
        expect(screen?.getByTestId("Ads Spent_i2")).toBeInTheDocument());
      it("e3", () => expect(screen.getByText("2.3%")).toBeInTheDocument());
      it("e4", () => expect(screen.getByText("Tacos")).toBeInTheDocument());
      it("e5", () => expect(screen.getByText("20.6%")).toBeInTheDocument());
      it("e6", () => expect(screen.getByText("ROAS")).toBeInTheDocument());
      it("e7", () => expect(screen.getByText("8.94%")).toBeInTheDocument());
    });
  });
});
describe("third section", () => {
  it("date above chart", () => {
    expect(
      screen.getByText("Mon, Oct 1 – Tue, Oct 30 · As of 2 mins ago")
    ).toBeInTheDocument();
  });
  it("chart line identifiers", () => {
    expect(screen.getByTestId("chartLineIdentifierIcon1")).toBeInTheDocument();
    screen.getAllByText("Sales").forEach((s) => {
      expect(s).toBeInTheDocument();
    });
    screen.getAllByText("Units").forEach((u) => {
      expect(u).toBeInTheDocument();
    });
    expect(screen.getByTestId("chartLineIdentifierIcon2")).toBeInTheDocument();
  });
});
describe("chart", () => {
  it("render", async () => {
    await waitFor(() => {
      expect(screen.getByTestId("chart")).toBeInTheDocument();
      expect(screen.getByTestId("chart").tagName).toBe("CANVAS");
    });
  });
});
describe("chart below dates", () => {
  it("render", () => {
    dates.forEach(async (d) => {
      const day = Object.keys(d)[0];
      const date = Object.values(d)[0];
      await waitFor(() => {
        expect(screen.getByText(day)).toBeInTheDocument();
        expect(screen.getByText(date)).toBeInTheDocument();
      });
    });
  });
});
describe("chart below festivals", () => {
  it("render", () => {
    expect(screen.getByText("Black Friday")).toBeInTheDocument();
    expect(screen.getByText("Valentines")).toBeInTheDocument();
  });
});
describe("last section cards", () => {
  describe("first", () => {
    it("e1", () => {
      expect(screen.getByText("Choose Period")).toBeInTheDocument();
    });
    it("i1", () => {
      expect(screen.getByTestId("Choose Period_i1")).toBeInTheDocument();
    });
    it("e3", () => {
      expect(screen.getByText("$131,336.48")).toBeInTheDocument();
    });
    it("e4", () => {
      expect(screen.getByText("4,208 units")).toBeInTheDocument();
    });
  });
  describe("second", () => {
    it("e1", () => {
      expect(screen.getByText("Last Period")).toBeInTheDocument();
    });
    it("i1", () => {
      expect(screen.getByTestId("Last Period_i1")).toBeInTheDocument();
    });
    it("e3", () => {
      expect(screen.getByText("$119,384.32")).toBeInTheDocument();
    });
    it("e4", () => {
      expect(screen.getByText("3,680 units")).toBeInTheDocument();
    });
  });
  describe("third", () => {
    it("e1", () => {
      expect(screen.getByText("Same Period Last Year")).toBeInTheDocument();
    });
    it("i1", () => {
      expect(
        screen.getByTestId("Same Period Last Year_i1")
      ).toBeInTheDocument();
    });
    it("e3", () => {
      expect(screen.getByText("$72,669.42")).toBeInTheDocument();
    });
    it("e4", () => {
      expect(screen.getByText("2,433 units")).toBeInTheDocument();
    });
  });
});
