import React from "react";
import "./Table.css";
import { BiSolidEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";

const Table = ({
  users,
  handleAllCheckbox,
  handleRowCheckBox,
  selectedRows,
  isAllSelected,
  handleDelete,
  handleEditModal,
  startIndex,
  endIndex,
}) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>
            <input
              type="checkbox"
              className="table-check"
              checked={isAllSelected}
              onChange={(event) => handleAllCheckbox(event, users)}
            />
          </th>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.slice(startIndex, endIndex).map((items, index) => (
          <tr key={items.id} className="table-row">
            <td>
              <input
                type="checkbox"
                checked={selectedRows.includes(items.id)}
                onChange={(event) => handleRowCheckBox(event, items.id)}
              />
            </td>
            <td>{items.name}</td>
            <td>{items.email}</td>
            <td>{items.role}</td>
            <td>
              <BiSolidEdit onClick={() => handleEditModal(items)} />
              <AiFillDelete
                onClick={() => handleDelete(items.id)}
                className="row-delete"
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
