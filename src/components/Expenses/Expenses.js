import React, { useState } from "react";
import Expense from "./Expense/Expense";
import { useExpense } from "../context/ExpenseTrackerContext";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import "./Expenses.css";
import ExpenseFormModal from "./ExpenseForm/ExpenseFormModal";

const Expenses = () => {
  const { expenses } = useExpense();
  const [page, setPage] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [type, setType] = useState("");
  const [id, setId] = useState(0);
  const handleNext = () => {
    const pages = Math.ceil(expenses.length / 3);
    setPage(Math.min(page + 1, pages - 1));
  };
  const handlePrev = () => {
    setPage(Math.max(page - 1, 0));
  };

  function closeModal() {
    setIsModalOpen(false);
    setType("");
  }

  return (
    <div className="expenses">
      <p className="expenses-title">Recent Transactions</p>

      <div className="expenses-content">
        {expenses
          .filter((expense, ind) => ind >= page * 3 && ind <= page * 3 + 2)
          .map((expense, ind) => (
            <Expense
              key={ind}
              setIsModalOpen={setIsModalOpen}
              setType={setType}
              expense={expense}
              setId={setId}
              id={ind}
            />
          ))}
        <div className="pagination">
          <div className="pagination-icon">
            <FaArrowLeftLong onClick={handlePrev} />
          </div>
          <div className="pagination-number">{page + 1}</div>
          <div className="pagination-icon">
            <FaArrowRightLong onClick={handleNext} />
          </div>
        </div>
      </div>
      {isModalOpen && (
        <ExpenseFormModal
          isModalOpen={isModalOpen}
          id={id}
          closeModal={closeModal}
          type={type}
        />
      )}
    </div>
  );
};

export default Expenses;
