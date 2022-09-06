import React from "react";
import { clearJobFilter, handleChange } from "../features/allJobs/allJobsSlice";
import Wrapper from "../assets/wrappers/SearchContainer";
import { useSelector, useDispatch } from "react-redux";
import { FormRow, FormRowSelect } from "./index";

const SearchContainer = () => {
  const { isLoading, search, searchStatus, searchType, sort, sortOptions } =
    useSelector((store) => store.allJobs);

  const { jobTypeOptions, statusOptions } = useSelector((store) => store.job);
  const dispatch = useDispatch();

  const handleSearch = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    if (isLoading) return;
    dispatch(handleChange({ name, value }));
  };

  const handleClearSubmit = (e) => {
    e.preventDefault();
    dispatch(clearJobFilter());
  };
  return (
    <Wrapper>
      <form className="form">
        <h4>Search</h4>
        <div className="form-center">
          {/* Search */}
          <FormRow
            type="text"
            name="search"
            value={search}
            handleChange={handleSearch}
          />

          {/* Status */}
          <FormRowSelect
            type="text"
            name="searchStatus"
            value={searchStatus}
            labelText="status"
            handleChange={handleSearch}
            listOptions={["all", ...statusOptions]}
          />

          {/* Job Type */}
          <FormRowSelect
            type="text"
            name="searchType"
            value={searchType}
            labelText="Job Type"
            handleChange={handleSearch}
            listOptions={["all", ...jobTypeOptions]}
          />

          {/* Sort */}
          <FormRowSelect
            type="text"
            name="sort"
            value={sort}
            handleChange={handleSearch}
            listOptions={sortOptions}
          />
          {/* clear button */}
          <button
            className="btn btn-block btn-danger"
            disabled={isLoading}
            onClick={handleClearSubmit}
          >
            Clear
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

export default SearchContainer;
