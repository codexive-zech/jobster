import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import customFetch from "../../utils/customFetch";
import { getUserFromLocalStorage } from "../../utils/localStorageData";
import { logoutUser } from "../user/userSlice";
import { showLoading, getAllJobs, hideLoading } from "../allJobs/allJobsSlice";

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
};

export const createJob = createAsyncThunk(
  "job/createJob",
  async (job, thunkApi) => {
    try {
      const resp = await customFetch.post("/jobs", job, {
        headers: {
          authorization: `Bearer ${thunkApi.getState().user.user.token}`,
        },
      });
      thunkApi.dispatch(clearValues());
      return resp.data;
    } catch (error) {
      if (error.response.status === 401) {
        thunkApi.dispatch(logoutUser());
        return thunkApi.rejectWithValue("Unauthorized! Logging Out...");
      }
      return thunkApi.rejectWithValue(error.response.data.msg);
    }
  }
);

export const deleteJob = createAsyncThunk(
  "job/deleteJob",
  async (jobId, thunkApi) => {
    thunkApi.dispatch(showLoading()); // displaying the loading of all jobs page/slice
    try {
      const resp = await customFetch.delete(`/jobs/${jobId}`, {
        headers: {
          authorization: `Bearer ${thunkApi.getState().user.user.token}`,
        },
      });
      thunkApi.dispatch(getAllJobs()); // getting all the available jobs from jobs on the server
      return resp.data.msg;
    } catch (error) {
      thunkApi.dispatch(hideLoading());
      thunkApi.rejectWithValue(error.response.data.msg);
    }
  }
);

const jobSlice = createSlice({
  name: "job",
  initialState,
  reducers: {
    handleChange: (state, { payload: { name, value } }) => {
      state[name] = value;
    },
    clearValues: () => {
      return {
        ...initialState,
        jobLocation: getUserFromLocalStorage()?.location || "",
      };
    },
  },
  // create New Jobs
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
    [deleteJob.fulfilled]: () => {
      toast.success("Success! Job Removed");
    },
    [deleteJob.rejected]: ({ payload }) => {
      toast.error(payload);
    },
  },
});

export const { handleChange, clearValues } = jobSlice.actions;

export default jobSlice.reducer;
