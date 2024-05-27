import React, { useState } from "react";
import { useExpense } from "../../context/ExpenseTrackerContext";
import ExpenseFormModal from "./ExpenseFormModal";
import "./ExpenseForm.css";

const ExpenseForm = () => {
  const { expense } = useExpense();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [type, setType] = useState("");
  function openModal() {
    setIsModalOpen(true);
    setType("Add");
  }

  function closeModal() {
    setIsModalOpen(false);
    setType("");
  }
  return (
    <div className="expense-form">
      <h2 className="expense-form-title">
        Expenses: <span className="expense-form-money">₹{expense}</span>
      </h2>
      <button className="expense-form-button" onClick={() => openModal()}>
        +Add Expense
      </button>
      {isModalOpen && (
        <ExpenseFormModal
          type={type}
          isModalOpen={isModalOpen}
          closeModal={closeModal}
        />
      )}
    </div>
  );
};

export default ExpenseForm;
