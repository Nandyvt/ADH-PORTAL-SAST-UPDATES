/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from "react";
import SearchByFieldStyled from "./styled";

const SearchByField = ({
  options = [],
  getSearchByFieldFilterValue,
  clearAll = false,
  searchFieldValue,
  searchType,
}: any) => {
  // Initialize state with default props
  const [selectedOption, setSelectedOption] = useState<any>(searchType || "");
  const [searchText, setSearchText] = useState<string>(searchFieldValue || "");

  useEffect(() => {
    if (clearAll && document) {
      setSelectedOption("");
      setSearchText("");
      const inputSearchElement = document?.querySelector(
        "#inputsearch"
      ) as HTMLInputElement;
      if (inputSearchElement) {
        inputSearchElement.value = "";
      }

      const dropdownMenuButtonElement =
        document?.querySelector(".dropdown-toggle");
      if (dropdownMenuButtonElement) {
        dropdownMenuButtonElement.textContent = "Select Category";
      }
    }
  }, [clearAll]);

  const generateOptions = (dropdownOptions: any) => {
    return dropdownOptions.map((option: any) => {
      return (
        <button
          className="dropdown-item"
          type="button"
          key={option.label}
          onClick={() => setSelectedOption(option.label)}
          value={searchType}
        >
          {option.label}
        </button>
      );
    });
  };

  useEffect(() => {
    getSearchByFieldFilterValue(searchText, selectedOption);
  }, [searchText, selectedOption]);

  return (
    <SearchByFieldStyled>
      <label htmlFor="inputsearch" className="col-form-label text-break">
        Search by
      </label>
      <div className="dropdown position-relative">
        <button
          className="btn btn-secondary dropdown-toggle w-100"
          type="button"
          id="dropdownMenuButton"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          {selectedOption || "Select Category"}
        </button>
        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
          {generateOptions(options)}
        </div>
        <hr className="position-absolute" />
      </div>
      <div className="input">
        <input
          type="text"
          id="inputsearch"
          value={searchText}
          placeholder={`Enter ${selectedOption || "Search"} Query`}
          className="form-control aui-input-placeholder aui-input-clear positive-relative aui-input-clear-search"
          onChange={(e) => {
            if (e.target.value === "") {
              setSearchText("");
            } else {
              setSearchText(e.target.value);
            }
          }}
        />
      </div>
    </SearchByFieldStyled>
  );
};

export default SearchByField;
