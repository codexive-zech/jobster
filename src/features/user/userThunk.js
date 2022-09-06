import customFetch, {
  checkForUnauthorizedResponse,
} from "../../utils/customFetch";
import { clearAllJobsValue } from "../allJobs/allJobsSlice";
import { clearValues } from "../job/jobSlice";
import { logoutUser } from "./userSlice";

export const loginUserThunk = async (url, user, thunkApi) => {
  try {
    const resp = await customFetch.post(url, user);
    return resp.data;
  } catch (error) {
    return thunkApi.rejectWithValue(error.response.data.msg);
  }
};

export const registerUserThunk = async (url, user, thunkApi) => {
  try {
    const resp = await customFetch.post(url, user);
    return resp.data;
  } catch (error) {
    return thunkApi.rejectWithValue(error.response.data.msg);
  }
};

export const updateUserDetailsThunk = async (url, user, thunkApi) => {
  try {
    const resp = await customFetch.patch(url, user);
    return resp.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkApi);
  }
};

export const clearAllStoreValueThunk = async (message, thunkApi) => {
  try {
    thunkApi.dispatch(logoutUser(message));
    thunkApi.dispatch(clearValues());
    thunkApi.dispatch(clearAllJobsValue());
    return Promise.resolve;
  } catch (error) {
    return Promise.reject;
  }
};
