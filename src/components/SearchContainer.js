import React from "react";
import { clearJobFilter, handleChange } from "../features/allJobs/allJobsSlice";
import Wrapper from "../assets/wrappers/SearchContainer";
import { useSelector, useDispatch } from "react-redux";
import { FormRow, FormRowSelect } from "./index";

const SearchContainer = () => {
  const { isLoading, search, searchStatus, searchType, sort, sortOptions } =
    useSelector((store) => store.allJobs); // picking state needed in the allJobs Slice store

  const { jobTypeOptions, statusOptions } = useSelector((store) => store.job); // picking state needed in the job Slice store
  const dispatch = useDispatch();

  const handleSearch = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    if (isLoading) return; // if is loading pause accept no input
    dispatch(handleChange({ name, value })); // changing the input field to a new value
  };

  const handleClearSubmit = (e) => {
    e.preventDefault();
    dispatch(clearJobFilter()); // clear filed and reset all the filter input to default state
  };
  return (
    <Wrapper>
      <form className="form">
        <h4>Search Jobs</h4>
        <div className="form-center">
          {/* Search Field */}
          <FormRow
            type="text"
            name="search"
            value={search}
            handleChange={handleSearch}
          />

          {/* Status Field */}
          <FormRowSelect
            type="text"
            name="searchStatus"
            value={searchStatus}
            labelText="status"
            handleChange={handleSearch}
            listOptions={["all", ...statusOptions]}
          />

          {/* Job Type Field */}
          <FormRowSelect
            type="text"
            name="searchType"
            value={searchType}
            labelText="Job Type"
            handleChange={handleSearch}
            listOptions={["all", ...jobTypeOptions]}
          />

          {/* Sort Field */}
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
