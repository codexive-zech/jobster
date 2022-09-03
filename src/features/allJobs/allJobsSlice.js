import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import customFetch from "../../utils/customFetch";
import { toast } from "react-toastify";
import { getAllJobsThunk, getAllStatsThunk } from "./allJobThunk";

const initialFilterSearch = {
  search: "",
  searchStatus: "all",
  searchType: "all",
  sort: "latest",
  sortOptions: ["latest", "old", "a-z", "z-a"],
};

const initialState = {
  isLoading: false,
  jobs: [],
  totalJobs: 0,
  numOfPages: 1,
  page: 1,
  stats: {},
  monthlyApplication: [],
  ...initialFilterSearch,
};

export const getAllJobs = createAsyncThunk(
  "allJobs/getAllJobs",
  getAllJobsThunk
);

export const getJobStats = createAsyncThunk(
  "allJobs/getJobStats",
  getAllStatsThunk
);

const allJobsSlice = createSlice({
  name: "allJobs",
  initialState,
  reducers: {
    clearJobFilter: () => {
      return initialFilterSearch;
    },
    showLoading: (state) => {
      state.isLoading = true;
    },
    hideLoading: (state) => {
      state.isLoading = false;
    },
  },
  extraReducers: {
    [getAllJobs.pending]: (state) => {
      state.isLoading = true;
    },
    [getAllJobs.fulfilled]: (state, { payload }) => {
      const { jobs, totalJobs } = payload; // getting back the list of jobs earlier created into the job object
      state.isLoading = false;
      state.jobs = jobs;
      state.totalJobs = totalJobs;
    },
    [getAllJobs.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    },
    // get stats
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

export const { clearJobFilter, showLoading, hideLoading, statsInfoDefault } =
  allJobsSlice.actions;

export default allJobsSlice.reducer;
