import React, { useState } from "react";
import "./EditModal.css";

const EditModal = ({ item, handleCloseModal, handleSaveModal }) => {
  const [itemEdited, setItemEdited] = useState({ ...item });
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setItemEdited((prevItem) => ({ ...prevItem, [name]: value }));
  };

  const handleSaveClick = () => {
    handleSaveModal(itemEdited);
    handleCloseModal();
  };
  return (
    <div className="edit-modal">
      <div className="modal-content">
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={itemEdited.name}
          onChange={handleInputChange}
        />
        <label>Email</label>
        <input
          type="text"
          name="email"
          value={itemEdited.email}
          onChange={handleInputChange}
        />
        <label>Role</label>
        <input
          type="text"
          name="role"
          value={itemEdited.role}
          onChange={handleInputChange}
        />

        <div className="modal-buttons">
          <button onClick={handleCloseModal} className="close-button">
            Close
          </button>
          <button onClick={handleSaveClick}>Save</button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
