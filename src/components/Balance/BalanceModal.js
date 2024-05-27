import React, { useState } from "react";
import Modal from "react-modal";
import "./BalanceModal.css";
const BalanceModal = ({ isModalOpen, closeModal, balance, setBalance }) => {
  const [income, setIncome] = useState("");
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "#efefefd9",
      width: "538px",
      height: "164px",
      borderRadius: "15px",
    },
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setBalance(Number(balance) + Number(income));
    closeModal();
  };

  return (
    <Modal
      style={customStyles}
      isOpen={isModalOpen}
      onRequestClose={closeModal}
    >
      <p className="balance-form-title">Add Balance</p>
      <form onSubmit={(e) => handleSubmit(e)} className="balance-form">
        <input
          placeholder="Income Amount"
          value={income}
          onChange={(e) => setIncome(e.target.value)}
          className="balance-form-input"
        />
        <button type="submit" className="balance-form-submit-button">
          Add Balance
        </button>
        <button
          onClick={() => closeModal()}
          className="balance-form-cancel-button"
        >
          Cancel
        </button>
      </form>
    </Modal>
  );
};

export default BalanceModal;
