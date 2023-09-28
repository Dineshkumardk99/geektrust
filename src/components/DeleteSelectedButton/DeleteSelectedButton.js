import React from "react";
import "./DeleteSelectedButton.css";

const DeleteSelectedButton = ({ handleDeleteSelectedAll, selectedRows }) => {
  return (
    <button className="delete-button" onClick={handleDeleteSelectedAll}>
      Delete selected
    </button>
  );
};

export default DeleteSelectedButton;
