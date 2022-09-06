import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { getAllJobsThunk, getAllStatsThunk } from "./allJobThunk";

const initialFilterSearch = {
  search: "",
  searchStatus: "all",
  searchType: "all",
  sort: "latest",
  sortOptions: ["latest", "old", "a-z", "z-a"],
}; // defining the state values for filter search

const initialState = {
  isLoading: false,
  jobs: [],
  totalJobs: 0,
  numOfPages: 1,
  page: 1,
  stats: {},
  monthlyApplication: [],
  ...initialFilterSearch,
}; // defining the state values for all jobs store

export const getAllJobs = createAsyncThunk(
  "allJobs/getAllJobs",
  getAllJobsThunk
); // get all job ajax request

export const getJobStats = createAsyncThunk(
  "allJobs/getJobStats",
  getAllStatsThunk
); // get job stats ajax request

const allJobsSlice = createSlice({
  name: "allJobs", // slice name
  initialState, // define the store state in the slice
  reducers: {
    showLoading: (state) => {
      state.isLoading = true;
    }, // make loading to true
    hideLoading: (state) => {
      state.isLoading = false;
    }, // making loading to false
    clearJobFilter: (state) => {
      return { ...state, ...initialFilterSearch };
    }, // clear all input state for the filter
    handleChange: (state, { payload: { name, value } }) => {
      state[name] = value;
      state.page = 1;
    }, // handling the input value change and page state
    changePage: (state, { payload }) => {
      state.page = payload;
    }, // set page state to the value on the server
    clearAllJobsValue: () => initialState,
  },
  extraReducers: {
    // get all jobs ajax request
    [getAllJobs.pending]: (state) => {
      state.isLoading = true;
    },
    [getAllJobs.fulfilled]: (state, { payload }) => {
      const { jobs, totalJobs, numOfPages } = payload; // getting back the list of jobs earlier created into the job object
      state.isLoading = false;
      state.jobs = jobs;
      state.totalJobs = totalJobs;
      state.numOfPages = numOfPages;
    },
    [getAllJobs.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    },
    // get all jobs stats ajax request
    [getJobStats.pending]: (state) => {
      state.isLoading = true;
    },
    [getJobStats.fulfilled]: (state, { payload }) => {
      const { defaultStats, monthlyApplications } = payload;
      state.isLoading = false;
      state.stats = defaultStats;
      state.monthlyApplication = monthlyApplications;
    },
    [getJobStats.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    },
  },
});

export const {
  clearJobFilter,
  showLoading,
  hideLoading,
  handleChange,
  changePage,
  clearAllJobsValue,
} = allJobsSlice.actions; // sending allJob reducer action

export default allJobsSlice.reducer;
