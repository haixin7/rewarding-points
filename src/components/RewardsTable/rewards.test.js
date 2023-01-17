import React from "react";
import { render, screen } from "@testing-library/react";
import RewardsTable from "./RewardsTable";
import handleGetAllTransData from "../../service/mockApi";

jest.mock("../../service/mockApi");

describe("RewardsTable component", () => {
  beforeEach(() => {
    handleGetAllTransData.mockResolvedValue([
      { order_id: 1, customer_id: "001", date: "2022-09-01", amount: 150 },
      { order_id: 2, customer_id: "001", date: "2022-09-15", amount: 75 },
      { order_id: 3, customer_id: "002", date: "2022-10-01", amount: 200 },
      { order_id: 4, customer_id: "002", date: "2022-10-15", amount: 125 },
    ]);
  });

  it("should display the spinner when data is loading", () => {
    render(<RewardsTable />);
    const spinner = screen.getByTestId("spinner");

    expect(spinner).toBeInTheDocument();
  });

  it("should display the rewards table after data is loaded", async () => {
    render(<RewardsTable />);
    const rewardsTable = await screen.findByTestId("rewards-table");

    expect(rewardsTable).toBeInTheDocument();
  });

  const earnedRewardsData = [
    {
      customerId: "001",
      months: {
        8: { monthlyPoints: 175 },
      },
      totalPoints: 175,
    },
    {
      customerId: "002",
      months: {
        9: { monthlyPoints: 350 },
      },
      totalPoints: 350,
    },
  ];
  it("should render the data correctly", async () => {
    render(<RewardsTable />);
    const customerIdCells = await screen.findAllByTestId("customer-id-cell");
    const totalPointsCells = await screen.findAllByTestId("total-points-cell");

    for (let i = 0; i < earnedRewardsData.length; i++) {
      expect(customerIdCells[i]).toHaveTextContent(
        earnedRewardsData[i].customerId
      );
      expect(totalPointsCells[i]).toHaveTextContent(
        earnedRewardsData[i].totalPoints
      );
    }
  });
});
