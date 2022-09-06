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
  } = useSelector((store) => store.job); // picking state available in the job Slice store
  const { user } = useSelector((store) => store.user); // picking state in the userSlice store
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    dispatch(handleChange({ name, value })); // changing the input field to a new value
  };

  const submitAddedJob = (e) => {
    e.preventDefault();
    if (!position || !company || !jobLocation) {
      toast.error("Please Fill Out All Field"); // display if all fields are empty
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
          }, // set the jobId and get back the job obj available
        })
      );
      return;
    } // if edit is true handle edit job PATCH request if all field is provided (get back the job obj)
    dispatch(createJob({ position, company, jobLocation, status, jobType })); // handle create job POST request
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
          {/* Position Field */}
          <FormRow
            name="position"
            type="text"
            value={position}
            handleChange={handleInputChange}
          />
          {/* Company Field */}
          <FormRow
            name="company"
            type="text"
            value={company}
            handleChange={handleInputChange}
          />
          {/* Job Location Field */}
          <FormRow
            name="jobLocation"
            labelText="Job Location"
            type="text"
            value={jobLocation}
            handleChange={handleInputChange}
          />
          {/* Status Field */}
          <FormRowSelect
            name="status"
            listOptions={statusOptions}
            value={status}
            handleChange={handleInputChange}
          />
          {/* Job Type Field */}
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
              onClick={() => dispatch(clearValues())} // handle clearing of input values
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
