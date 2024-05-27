import "./App.css";
import Balance from "./components/Balance/Balance";
import Chart from "./components/Chart/Chart";
import ExpenseForm from "./components/Expenses/ExpenseForm/ExpenseForm";
import Expenses from "./components/Expenses/Expenses";
import TopExpenses from "./components/Expenses/TopExpenses/TopExpenses";

function App() {
  return (
    <div className="app">
      <p className="app-title">Expense Tracker</p>
      <div className="forms">
        <Balance />
        <ExpenseForm />
        <Chart />
      </div>
      <div className="app-expense">
        <Expenses />
        <TopExpenses />
      </div>
      {/* <Play /> */}
    </div>
  );
}

export default App;
