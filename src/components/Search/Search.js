import React from "react";
import "./Search.css";

const Search = ({ handleSearch, searchText }) => {
  return (
    <input
      type="text"
      placeholder="search by name, email or role"
      className="search"
      value={searchText}
      onChange={(e) => handleSearch(e)}
    />
  );
};

export default Search;
