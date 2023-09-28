import React from "react";
import { FiChevronLeft } from "react-icons/fi";
import { LuChevronFirst } from "react-icons/lu";
import { FiChevronRight } from "react-icons/fi";
import { LuChevronLast } from "react-icons/lu";
import "./Paginate.css";

const Paginate = ({
  handleFirstPage,
  handleLastPage,
  handlePreviousPage,
  handleNextPage,
  pageNumbers,
  currentPage,
  totalpages,
  handlePageClick,
}) => {
  return (
    <div className="pagination-container">
      <div className="pagination">
        <button onClick={handleFirstPage} disabled={currentPage === 1}>
          <LuChevronFirst />
        </button>
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
          <FiChevronLeft />
        </button>
        {pageNumbers.map((page) => (
          <button
            className="page-button"
            key={page}
            onClick={() => handlePageClick(page)}
          >
            {page}
          </button>
        ))}
        <button onClick={handleNextPage} disabled={currentPage === totalpages}>
          <FiChevronRight />
        </button>
        <button onClick={handleLastPage} disabled={currentPage === totalpages}>
          <LuChevronLast />
        </button>
      </div>
    </div>
  );
};

export default Paginate;
