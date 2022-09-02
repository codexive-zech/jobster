import customFetch from "../../utils/customFetch";
import { logoutUser } from "../user/userSlice";
import { clearValues } from "./jobSlice";
import { showLoading, hideLoading, getAllJobs } from "../allJobs/allJobsSlice";

export const createJobThunk = async (job, thunkApi) => {
  try {
    const resp = await customFetch.post("/jobs", job);
    thunkApi.dispatch(clearValues());
    return resp.data;
  } catch (error) {
    if (error.response.status === 401) {
      thunkApi.dispatch(logoutUser());
      return thunkApi.rejectWithValue("Unauthorized! Logging Out...");
    }
    return thunkApi.rejectWithValue(error.response.data.msg);
  }
};

export const editJobThunk = async ({ jobId, job }, thunkApi) => {
  try {
    const resp = await customFetch.patch(`/jobs/${jobId}`, job);
    thunkApi.dispatch(clearValues());
    return resp.data;
  } catch (error) {
    if (error.response.status === 401) {
      thunkApi.dispatch(logoutUser());
      return thunkApi.rejectWithValue("Unauthorized Logging Out...");
    }
    return thunkApi.rejectWithValue(error.response.msg);
  }
};

export const deleteJobThunk = async (jobId, thunkApi) => {
  thunkApi.dispatch(showLoading()); // displaying the loading of all jobs page/slice
  try {
    const resp = await customFetch.delete(`/jobs/${jobId}`);
    thunkApi.dispatch(getAllJobs()); // getting all the available jobs from jobs on the server
    return resp.data.msg;
  } catch (error) {
    if (error.response.status === 401) {
      thunkApi.dispatch(logoutUser());
      return thunkApi.rejectWithValue("Unauthorized! Logging Out...");
    }
    thunkApi.dispatch(hideLoading());
    thunkApi.rejectWithValue(error.response.data.msg);
  }
};
