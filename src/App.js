import "./App.css";
import RewardsTable from "./components/RewardsTable/RewardsTable.js";

function App() {
  return (
    <div className="App">
      <p>
        <b>Scenario:</b>
        <br />
        1. A customer receives 2 points for every dollar spent over $100 in each
        transaction, plus 1 point for every dollar spent over $50 in each
        transaction. <br /> 2. Given a record of every transaction during a
        three month period, calculate the reward points earned for each customer
        per month and total.
        <br />
        (e.g. a $120 purchase = 2x$20 + 1x$50 = 90 points)
        <br />
        <b>Ex:Based on my mock customerData records (001_John):</b>
        <br />
        October: John didn't spend anything(no transaction), no reward point
        <br />
        November: John made 2 transaction $120 + $40 purchase, reward
        points:(2x$20 + 1x$50 = 90 points)
        <br />
        December: John made 1 transaction $170 purchase, reward points(2x$70 +
        1x$50 = 190 points)
      </p>
      <h1> Awarding Points Summary</h1>
      <RewardsTable />
    </div>
  );
}

export default App;
