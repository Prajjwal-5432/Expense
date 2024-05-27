import React from "react";
import "./Expense.css";
import { PiPizzaLight } from "react-icons/pi";
import { IoGiftOutline } from "react-icons/io5";
import { CiRollingSuitcase, CiEdit } from "react-icons/ci";
import { MdOutlineCancel } from "react-icons/md";
import moment from "moment";
const Expense = ({ expense, setIsModalOpen, setType, setId, id }) => {
  const { title, price, category, date } = expense;
  return (
    <div className="expense-container">
      <div className="expense">
        <p className="expense-icon">
          {category === "Entertainment" ? (
            <IoGiftOutline />
          ) : category === "Food" ? (
            <PiPizzaLight />
          ) : (
            <CiRollingSuitcase />
          )}
        </p>
        <div className="expense-item">
          <p>{title}</p>
          <p>{moment(date).format("MMMM D, YYYY")}</p>
        </div>
        <p className="expense-price">₹{price}</p>
        <div className="expense-edit">
          <CiEdit
            onClick={() => {
              setIsModalOpen(true);
              setType("Edit");
              setId(id);
            }}
          />
        </div>
        <div className="expense-cancel">
          <MdOutlineCancel
            onClick={() => {
              setIsModalOpen(true);
              setType("Delete");
              setId(id);
            }}
          />
        </div>
      </div>
      <div className="horizontal-line"></div>
    </div>
  );
};

export default Expense;
