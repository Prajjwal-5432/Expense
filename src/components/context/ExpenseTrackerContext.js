import React, { createContext, useContext } from "react";
import useLocalStorage from "../../hooks/useLocalStorage";

const ExpenseTrackerContext = createContext();

export const ExpenseTrackerProvider = ({ children }) => {
  const [balance, setBalance] = useLocalStorage("balance", 5000);
  const [expenses, setExpenses] = useLocalStorage("expenses", []);
  const [expense, setExpense] = useLocalStorage("expense", 0);
  return (
    <ExpenseTrackerContext.Provider
      value={{
        balance,
        setBalance,
        expenses,
        setExpenses,
        expense,
        setExpense,
      }}
    >
      {children}
    </ExpenseTrackerContext.Provider>
  );
};

export const useExpense = () => useContext(ExpenseTrackerContext);
