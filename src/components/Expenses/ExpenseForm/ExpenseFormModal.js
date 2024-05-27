import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { useExpense } from "../../context/ExpenseTrackerContext";
import { useSnackbar } from "notistack";
import "./ExpenseFormModal.css";

const ExpenseFormModal = ({ isModalOpen, closeModal, type, id }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [data, setData] = useState({
    title: "",
    price: "",
    category: "",
    date: "",
  });

  const { balance, setBalance, expenses, setExpenses, expense, setExpense } =
    useExpense();

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    if (type === "Edit") {
      setData({
        title: expenses[id].title,
        price: expenses[id].price,
        category: expenses[id].category,
        date: expenses[id].date,
      });
    }
  }, []);

  const handleAdd = () => {
    if (Number(data.price) > Number(balance)) {
      return enqueueSnackbar("Expense price is greater than balance", {
        variant: "error",
        autoHideDuration: 2000,
      });
    }
    setExpense(Number(expense) + Number(data.price));
    setBalance(Number(balance) - Number(data.price));
    setExpenses([...expenses, data]);
    enqueueSnackbar("Expense added", {
      variant: "success",
      autoHideDuration: 2000,
    });
    closeModal();
  };

  const handleEdit = () => {
    if (Number(balance) + Number(expenses[id].price) - Number(data.price) < 0) {
      return enqueueSnackbar("Expense price is greater than balance", {
        variant: "error",
        autoHideDuration: 2000,
      });
    }

    setBalance(
      Number(balance) + Number(expenses[id].price) - Number(data.price)
    );
    setExpense(
      Number(expense) - Number(expenses[id].price) + Number(data.price)
    );
    setExpenses((prevExpenses) => {
      const updatedExpenses = [...prevExpenses];

      updatedExpenses[id] = data;

      return updatedExpenses;
    });
    enqueueSnackbar("Expense updated", {
      variant: "success",
      autoHideDuration: 2000,
    });
    closeModal();
  };

  const handleDelete = () => {
    setBalance(Number(balance) + Number(expenses[id].price));
    setExpense(Number(expense) - Number(expenses[id].price));
    setExpenses((prevExpenses) => {
      const updatedExpenses = [...prevExpenses];
      updatedExpenses.splice(id, 1);
      return updatedExpenses;
    });
    enqueueSnackbar("Expense deleted", {
      variant: "success",
      autoHideDuration: 2000,
    });
    closeModal();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    type === "Add"
      ? handleAdd()
      : type === "Edit"
      ? handleEdit()
      : handleDelete();
  };
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "#efefefd9",
      width: "500px",
      height: "290px",
      borderRadius: "15px",
    },
  };
  return (
    <Modal
      style={customStyles}
      isOpen={isModalOpen}
      onRequestClose={closeModal}
    >
      <p className="expense-modal-title">{type} Expense</p>
      {type !== "Delete" ? (
        <form onSubmit={(e) => handleSubmit(e)} className="expense-modal-form">
          <input
            type="text"
            placeholder="Title"
            name="title"
            value={data.title}
            onChange={handleChange}
            required
            className="expense-modal-input"
          />
          <input
            type="text"
            placeholder="Price"
            name="price"
            value={data.price}
            onChange={handleChange}
            required
            className="expense-modal-input"
          />
          <select
            required
            name="category"
            value={data.category}
            onChange={handleChange}
            className="expense-modal-select"
          >
            <option value="">Select Category...</option>
            {["Entertainment", "Food", "Travel"].map((item) => (
              <option value={item} key={item}>
                {item}
              </option>
            ))}
          </select>
          <input
            type="date"
            placeholder="dd/mm/yyyy"
            name="date"
            value={data.date}
            onChange={handleChange}
            required
            className="expense-modal-input"
          />
          <div className="expense-btns">
            <button type="submit" className="expense-modal-submit-button">
              {type}
            </button>
            <button
              onClick={() => closeModal()}
              className="expense-modal-cancel-button"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <form onSubmit={(e) => handleSubmit(e)} className="expense-modal-form">
          <h2>Do you want to delete this expense</h2>
          <button type="submit" className="expense-modal-submit-button">
            {type}
          </button>
          <button
            onClick={() => closeModal()}
            className="expense-modal-cancel-button"
          >
            Cancel
          </button>
        </form>
      )}
    </Modal>
  );
};

export default ExpenseFormModal;
