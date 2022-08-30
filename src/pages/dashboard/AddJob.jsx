import React from "react";
import { useSelector, useDispatch } from "react-redux/es/exports";
import { toast } from "react-toastify";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import { FormRow, FormRowSelect } from "../../components/";

const AddJob = () => {
  const {
    isLoading,
    position,
    company,
    jobLocation,
    jobType,
    jobTypeOptions,
    status,
    statusOptions,
    isEditing,
    editJobId,
  } = useSelector((store) => store.job);
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    const key = e.target.name;
    const value = e.target.value;
    console.log(key, value);
  };

  const submitAddedJob = (e) => {
    e.preventDefault();
    if (!position || !company || !jobLocation) {
      toast.error("Please Fill Out All Field");
      return;
    }
  };

  return (
    <Wrapper>
      <form className="form">
        <h3>{isEditing ? "Editing Job" : "Add Job"}</h3>
        <div className="form-center">
          {/* Position */}
          <FormRow
            name="position"
            type="text"
            value={position}
            handleChange={handleInputChange}
          />
          {/* Company */}
          <FormRow
            name="company"
            type="text"
            value={company}
            handleChange={handleInputChange}
          />
          {/* Job Location */}
          <FormRow
            name="jobLocation"
            labelText="Job Location"
            type="text"
            value={jobLocation}
            handleChange={handleInputChange}
          />
          {/* Status */}
          <FormRowSelect
            name="status"
            lists={statusOptions}
            value={status}
            handleChange={handleInputChange}
          />
          {/* Job Type */}
          <FormRowSelect
            name="jobType"
            labelText="Job Type"
            lists={jobTypeOptions}
            value={jobType}
            handleChange={handleInputChange}
          />
          <div className="btn-container">
            <button
              className="btn btn-block clear-btn"
              type="button"
              onClick={() => console.log("clear")}
            >
              Clear
            </button>
            <button
              className="btn btn-block submit-btn"
              type="submit"
              onClick={submitAddedJob}
              disabled={isLoading}
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  );
};

export default AddJob;
