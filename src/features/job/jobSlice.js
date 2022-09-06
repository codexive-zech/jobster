import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { getUserFromLocalStorage } from "../../utils/localStorageData";
import { createJobThunk, editJobThunk, deleteJobThunk } from "./jobThunk";

const initialState = {
  isLoading: false,
  position: "",
  company: "",
  jobLocation: "",
  jobTypeOptions: ["full-time", "part-time", "remote", "internship"],
  jobType: "full-time",
  statusOptions: ["interview", "declined", "pending"],
  status: "pending",
  isEditing: false,
  editJobId: "",
}; // defining the state values for job store

export const createJob = createAsyncThunk("job/createJob", createJobThunk); // new job post ajax request

export const editJob = createAsyncThunk("job/editJob", editJobThunk); // edit job patch ajax request

export const deleteJob = createAsyncThunk("job/deleteJob", deleteJobThunk); // delete job delete ajax request

const jobSlice = createSlice({
  name: "job", // slice name
  initialState, // define the store state in the slice
  reducers: {
    handleChange: (state, { payload: { name, value } }) => {
      state[name] = value;
    }, // handling the input value change
    clearValues: () => {
      return {
        ...initialState,
        jobLocation: getUserFromLocalStorage()?.location || "", // getting location state form the user obj if they is
      };
    }, // handling the clearing of value
    setJobEdit: (state, { payload }) => {
      return { ...state, isEditing: true, ...payload }; // return all the state value and the values on the server from the job obj
    }, // making job ready for edit
  }, // adding all simple reducer actions functionality

  // create new job ajax request
  extraReducers: {
    [createJob.pending]: (state) => {
      state.isLoading = true;
    },
    [createJob.fulfilled]: (state) => {
      state.isLoading = false;
      toast.success("Job Created Successfully");
    },
    [createJob.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    },
    // delete job ajax request
    [deleteJob.fulfilled]: () => {
      toast.success("Success! Job Removed");
    },
    [deleteJob.rejected]: ({ payload }) => {
      toast.error(payload);
    },
    // editing job ajax request
    [editJob.pending]: (state) => {
      state.isLoading = true;
    },
    [editJob.fulfilled]: (state) => {
      state.isLoading = false;
      toast.success("Job Modified Successfully");
    },
    [editJob.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    },
  },
});

export const { handleChange, clearValues, setJobEdit } = jobSlice.actions; // sending all job reducer action

export default jobSlice.reducer;
