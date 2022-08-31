import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import customFetch from "../../utils/customFetch";
import { toast } from "react-toastify";

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
  async (_, thunkApi) => {
    let url = "/jobs";
    try {
      const resp = await customFetch.get(url, {
        headers: {
          authorization: `Bearer ${thunkApi.getState().user.user.token}`,
        },
      });
      return resp.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data.msg);
    }
  }
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
      const { jobs } = payload; // getting back the list of jobs earlier created into the job object
      state.isLoading = false;
      state.jobs = jobs;
    },
    [getAllJobs.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    },
  },
});

export const { clearJobFilter, showLoading, hideLoading } =
  allJobsSlice.actions;

export default allJobsSlice.reducer;
