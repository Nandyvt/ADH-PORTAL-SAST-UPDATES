import React, { useEffect } from "react";
import store from "app/store";
import { setSearchParamFilter } from "../common/TransactionalLogs.slice";
import { SearchFilterStyled } from "./styled";

const SearchInputField: React.FunctionComponent<any> = ({ reset }) => {
  const [searchFieldValue, setSearchFieldValue] = React.useState("");
  const [searchType, setSearchType] = React.useState("");

  const handleInputChange = (event: any) => {
    setSearchFieldValue(event.target.value);
    if (event.target.value === "") {
      store.dispatch(
        setSearchParamFilter({ searchFieldValue: "", searchType })
      );
    }
  };

  const handleSearch = () => {
    store.dispatch(setSearchParamFilter({ searchFieldValue, searchType }));
  };

  React.useEffect(() => {
    setSearchFieldValue("");
    setSearchType("");
  }, [reset]);

  useEffect(() => {
    setSearchFieldValue("");
  }, [searchType]);

  return (
    <SearchFilterStyled className="col-12 pr-lg-0 d-flex w-100 p-0">
      <label className="search-field p-0 m-0" htmlFor="searchField">
        <span className="search-label py-2" id="button-addon">
          Search By
        </span>
        <div
          className="input-group flex-nowrap search-input-field"
          id="searchField"
        >
          <div className="dropdown input-group-prepend">
            <button
              className={`btn noBtnStyle dropdown-toggle ${
                searchType ? "" : "placeholder"
              }`}
              type="button"
              id="dropdownButton"
              data-toggle="dropdown"
              aria-expanded="false"
              aria-label="Search By Select Category dropdown"
            >
              {searchType || "Select Category"}
            </button>
            <div className="dropdown-menu">
              <button
                className="dropdown-item"
                type="button"
                onClick={() => setSearchType("Transaction ID")}
              >
                Transaction ID
              </button>

              <button
                className="dropdown-item"
                type="button"
                onClick={() => setSearchType("Error Message")}
              >
                Error Message
              </button>
              <button
                className="dropdown-item"
                type="button"
                onClick={() => setSearchType("Organization Code")}
              >
                Organization Code
              </button>
              <button
                className="dropdown-item"
                type="button"
                onClick={() => setSearchType("Email")}
              >
                Email
              </button>
            </div>
          </div>
          <div className="input-group-append search-input-field-container">
            <input
              type="text"
              className="form-control search-input-dropdown"
              placeholder={`Enter ${
                searchType?.trim()?.length > 0 ? searchType : "Search Query"
              }`}
              value={searchFieldValue}
              onChange={handleInputChange}
              aria-label="Search By"
            />
          </div>
          <div className="input-group-append">
            <button
              className="btn noBtnStyle search-btn"
              type="button"
              name="Search"
              onClick={handleSearch}
              aria-label="Search"
            >
              <aui-icon
                block={false}
                icon="search"
                svgwidth="20"
                svgheight="20"
              />
            </button>
          </div>
        </div>
      </label>
    </SearchFilterStyled>
  );
};

export default SearchInputField;
