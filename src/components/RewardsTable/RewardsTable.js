import React, { useState, useEffect } from "react";
import "./style.css";
import { customerData } from "../../data/customerData";
import { monthsData } from "../../data/months";
import getAllTransData from "../../service/mockApi";
import Spinner from "../Spinner/Spinner";

const createRewardsData = (transData) => {
  const rewardsData = [];
  transData.forEach((transaction) => {
    const { customer_id, date, amount } = transaction;
    const rewordMonth = new Date(date).getMonth();
    const points = calculatePoints(amount);
    const customer = rewardsData.find((c) => c.customerId === customer_id);
    if (!customer) {
      rewardsData.push({
        customerId: customer_id,
        months: { [rewordMonth]: { monthlyPoints: points } },
        totalPoints: points,
      });
    } else {
      if (customer.months[rewordMonth]) {
        customer.months[rewordMonth].monthlyPoints += points;
      } else {
        customer.months[rewordMonth] = { monthlyPoints: points };
      }
      customer.totalPoints += points;
    }
  });
  return rewardsData;
};

const calculatePoints = (amount) => {
  let points = 0;
  if (amount > 100) {
    points += 2 * (amount - 100) + 1 * 50;
  } else if (amount > 50) {
    points += 1 * (amount - 50);
  }
  return points;
};

const extractDisplayMonth = (transData) => {
  const displayMonth = new Set();
  transData.forEach((transaction) => {
    const { date } = transaction;
    const rewordMonth = new Date(date).getMonth();

    if (!displayMonth.has(rewordMonth)) {
      displayMonth.add(rewordMonth);
    }
  });
  return Array.from(displayMonth).sort((a, b) => a - b);
};

const RewardsTable = () => {
  const [transData, setTransData] = useState([]);
  const [earnedRewardsData, setEarnedRewardsData] = useState([]);
  const [displayMonth, setDisplayMonth] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    getAllTransData(customerData)
      .then((data) => {
        setTransData(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (isLoading) {
      return;
    }
    const rewardsData = createRewardsData(transData);
    const displayMonth = extractDisplayMonth(transData);
    setDisplayMonth(displayMonth);
    setEarnedRewardsData(rewardsData);
  }, [transData, isLoading]);

  return (
    <div>
      {isLoading ? (
        <Spinner />
      ) : (
        <table data-testid="rewards-table">
          <thead>
            <tr>
              <th>Customer ID</th>
              {displayMonth.map((m) => (
                <th key={m}>{monthsData[m]} </th>
              ))}
              <th>Total Points</th>
            </tr>
          </thead>
          <tbody>
            {earnedRewardsData.map((customer) => (
              <tr key={customer.customerId}>
                <td data-testid="customer-id-cell">{customer.customerId}</td>
                {displayMonth.map((m) =>
                  customer.months[m] ? (
                    <td key={m}>{customer.months[m].monthlyPoints}</td>
                  ) : (
                    <td key={m}>-</td>
                  )
                )}
                <td data-testid="total-points-cell">{customer.totalPoints}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default RewardsTable;
