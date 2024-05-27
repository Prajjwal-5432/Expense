import React, { useState } from "react";
import BalanceModal from "./BalanceModal";
import { useExpense } from "../context/ExpenseTrackerContext";
import "./Balance.css";
const Balance = () => {
  const { balance, setBalance } = useExpense();
  const [isModalOpen, setIsModalOpen] = useState(false);

  function openModal() {
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  return (
    <div className="balance">
      <p className="balance-title">
        Wallet Balance: <span className="balance-money">₹{balance}</span>
      </p>
      <button className="balance-button" onClick={() => openModal()}>
        + Add Income
      </button>
      {isModalOpen && (
        <BalanceModal
          balance={balance}
          setBalance={setBalance}
          isModalOpen={isModalOpen}
          closeModal={closeModal}
        />
      )}
    </div>
  );
};

export default Balance;
