import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux/es/exports";
import { toast } from "react-toastify";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import { FormRow, FormRowSelect } from "../../components/";
import {
  handleChange,
  clearValues,
  createJob,
  editJob,
} from "../../features/job/jobSlice";

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
  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    dispatch(handleChange({ name, value }));
  };

  const submitAddedJob = (e) => {
    e.preventDefault();
    if (!position || !company || !jobLocation) {
      toast.error("Please Fill Out All Field");
      return;
    }

    if (isEditing) {
      dispatch(
        editJob({
          jobId: editJobId,
          job: {
            position,
            company,
            jobLocation,
            status,
            jobType,
          },
        })
      );
      return;
    }
    dispatch(createJob({ position, company, jobLocation, status, jobType }));
  };

  useEffect(() => {
    if (!isEditing) {
      dispatch(handleChange({ name: "jobLocation", value: user.location }));
    }
  }, []);

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
            listOptions={statusOptions}
            value={status}
            handleChange={handleInputChange}
          />
          {/* Job Type */}
          <FormRowSelect
            name="jobType"
            labelText="Job Type"
            listOptions={jobTypeOptions}
            value={jobType}
            handleChange={handleInputChange}
          />
          {/* clear and submit button */}
          <div className="btn-container">
            <button
              className="btn btn-block clear-btn"
              type="button"
              onClick={() => dispatch(clearValues())}
            >
              Clear
            </button>
            <button
              className="btn btn-block submit-btn"
              type="submit"
              onClick={submitAddedJob}
              disabled={isLoading}
            >
              {isEditing ? "Edit" : "Submit"}
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  );
};

export default AddJob;
