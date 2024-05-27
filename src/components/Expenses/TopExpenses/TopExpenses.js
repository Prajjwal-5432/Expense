import React, { useEffect, useState } from "react";
import "./TopExpenses.css";
import { useExpense } from "../../context/ExpenseTrackerContext";
const TopExpenses = () => {
  const { expense, expenses } = useExpense();

  const [data, setData] = useState({
    Entertainment: 0,
    Food: 0,
    Travel: 0,
  });

  useEffect(() => {
    const newData = { ...data };

    Object.keys(newData).forEach((key) => {
      const expenseMade = expenses.reduce((acc, cur) => {
        return acc + (cur.category === key ? Number(cur.price) : 0);
      }, 0);

      newData[key] = (expenseMade * 100) / Number(expense);
    });

    setData(newData);
  }, [expense, expenses]);

  return (
    <div className="topexpense">
      <p className="topexpense-title">Top Expenses</p>
      <div className="topexpense-content">
        {Object.keys(data).map((category) => (
          <div key={category} className="expense-category">
            <p>{category}</p>
            <div className="progress-bar-container">
              <div
                className="progress-bar"
                style={{ width: `${data[category]}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopExpenses;
