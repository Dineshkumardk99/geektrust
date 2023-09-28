import "./App.css";
import DeleteSelectedButton from "./components/DeleteSelectedButton/DeleteSelectedButton";
import Table from "./components/Table/Table";
import { useEffect, useState } from "react";
import axios from "axios";
import Search from "./components/Search/Search";
import Paginate from "./components/Paginate/Paginate";
import EditModal from "./components/EditModal/EditModal";

const API_URL =
  "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json";

function App() {
  const [users, setUsers] = useState([]);
  const [currentpage, setCurrentPage] = useState(1);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [itemEdit, setItemEdit] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  let itemsPerPage = 10;

  useEffect(() => {
    displayData();
  }, []);

  const displayData = async () => {
    try {
      const response = await axios.get(API_URL);
      setUsers(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const totalPages = Math.ceil(users.length / itemsPerPage); // to get the total pages
  const startIndex = (currentpage - 1) * itemsPerPage; // to get the start index of the currentpage
  const endIndex = startIndex + itemsPerPage; // to get the end index of the currentpage
  const isAllSelected = selectedRows.length === itemsPerPage;

  //handlers for search bar
  const handleSearch = (e) => {
    const searchItem = e.target.value;
    setSearchText(searchItem);
  };
  // filter the data based on given search text

  const filtered = () => {
    if (searchText !== "") {
      const filters = users.filter(
        (user) =>
          user.name.toLowerCase().includes(searchText) ||
          user.email.toLowerCase().includes(searchText) ||
          user.role.toLowerCase().includes(searchText)
      );
      setUsers(filters);
      setCurrentPage(1);
    } else {
      setUsers(users);
    }
  };

  useEffect(() => {
    filtered();
  }, [searchText]);

  // handlers for editmodal
  const handleEditModal = (item) => {
    setItemEdit(item);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setItemEdit(null);
  };

  const handleSaveModal = (itemEdited) => {
    const updatedData = [...users];

    const indexToEdited = updatedData.findIndex(
      (item) => item.id === itemEdited.id
    );

    if (indexToEdited !== -1) {
      updatedData[indexToEdited] = itemEdited;
      setUsers(updatedData);
    }
    setItemEdit(null);
  };

  // handlers for pagination
  const handleFirstPage = () => {
    setCurrentPage(1);
    setSelectedRows([]);
  };

  const handlePreviousPage = () => {
    setCurrentPage(currentpage - 1);
    setSelectedRows([]);
  };

  const handleNextPage = () => {
    setCurrentPage(currentpage + 1);
    setSelectedRows([]);
  };

  const handleLastPage = () => {
    setCurrentPage(totalPages);
    setSelectedRows([]);
  };

  const handlePageClick = (page) => {
    setCurrentPage(page);
    setSelectedRows([]);
  };

  // to get the page numbers in the pagination
  const getPageNumbers = (totalPages) => {
    const pageNumbers = [];

    for (let currPage = 1; currPage <= totalPages; currPage++)
      pageNumbers.push(currPage);
    return pageNumbers;
  };
  const pageNumbers = getPageNumbers(totalPages);

  // handlers for rowcheckbox and allcheckbox
  const handleAllCheckbox = (event, data) => {
    const isAllChecked = event.target.checked;
    if (isAllChecked) {
      const startIndex = (currentpage - 1) * itemsPerPage;

      let rowSelected = [];
      for (let i = startIndex; i < startIndex + itemsPerPage; i++) {
        if (i < data.length) {
          rowSelected.push(data[i].id);
        } else {
          rowSelected.push("");
        }
      }
      setSelectedRows(rowSelected);
    } else {
      setSelectedRows([]);
    }
  };

  const handleRowCheckbox = (event, id) => {
    const isChecked = event.target.checked;
    if (isChecked) {
      setSelectedRows([...selectedRows, id]);
    } else {
      setSelectedRows(selectedRows.filter((item) => item !== id));
    }
  };

  // handlers for rowdelete
  const handleDelete = (id) => {
    const updatedData = users.filter((ele) => ele.id !== id);
    setUsers(updatedData);
  };

  //handlers for deleteselectedbutton
  const handleDeleteSelectedAll = () => {
    if (selectedRows.length === 0) return;

    const updatedData = users.filter((ele) => !selectedRows.includes(ele.id));

    setUsers(updatedData);
    setFilteredData(updatedData);
    setSelectedRows([]);
  };

  return (
    <div className="App">
      <Search handleSearch={handleSearch} searchText={searchText} />
      <DeleteSelectedButton handleDeleteSelectedAll={handleDeleteSelectedAll} />
      <Table
        users={users}
        displayData={displayData}
        handleAllCheckbox={handleAllCheckbox}
        handleRowCheckBox={handleRowCheckbox}
        selectedRows={selectedRows}
        startIndex={startIndex}
        endIndex={endIndex}
        isAllSelected={isAllSelected}
        handleDelete={handleDelete}
        handleEditModal={handleEditModal}
      />
      <Paginate
        handleFirstPage={handleFirstPage}
        handleLastPage={handleLastPage}
        handlePreviousPage={handlePreviousPage}
        handleNextPage={handleNextPage}
        pageNumbers={pageNumbers}
        currentPage={currentpage}
        totalpages={totalPages}
        handlePageClick={handlePageClick}
      />
      {isModalOpen && (
        <EditModal
          item={itemEdit}
          handleCloseModal={handleCloseModal}
          handleSaveModal={handleSaveModal}
        />
      )}
    </div>
  );
}

export default App;
