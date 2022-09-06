import customFetch, {
  checkForUnauthorizedResponse,
} from "../../utils/customFetch";
import { clearValues } from "./jobSlice";
import { showLoading, hideLoading, getAllJobs } from "../allJobs/allJobsSlice";
export const createJobThunk = async (job, thunkApi) => {
  try {
    const resp = await customFetch.post("/jobs", job);
    thunkApi.dispatch(clearValues());
    return resp.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkApi);
  }
};

export const editJobThunk = async ({ jobId, job }, thunkApi) => {
  try {
    const resp = await customFetch.patch(`/jobs/${jobId}`, job);
    thunkApi.dispatch(clearValues());
    return resp.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkApi);
  }
};

export const deleteJobThunk = async (jobId, thunkApi) => {
  thunkApi.dispatch(showLoading()); // displaying the loading of all jobs page/slice
  try {
    const resp = await customFetch.delete(`/jobs/${jobId}`);
    thunkApi.dispatch(getAllJobs()); // getting all the available jobs from jobs on the server
    return resp.data.msg;
  } catch (error) {
    thunkApi.dispatch(hideLoading());
    return checkForUnauthorizedResponse(error, thunkApi);
  }
};
