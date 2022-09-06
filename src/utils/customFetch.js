import axios from "axios";
import { clearAllStoreValues } from "../features/user/userSlice";
import { getUserFromLocalStorage } from "./localStorageData";

const customFetch = axios.create({
  baseURL: "https://jobify-prod.herokuapp.com/api/v1/toolkit",
});

customFetch.interceptors.request.use((config) => {
  const user = getUserFromLocalStorage(); // get the user from the storage
  if (user) {
    config.headers.common["Authorization"] = `Bearer ${user.token}`;
  } // if the is a user add the authorization header to all request
  return config;
}); // handling the authorization headers

export const checkForUnauthorizedResponse = (error, thunkApi) => {
  if (error.response.status === 401) {
    thunkApi.dispatch(clearAllStoreValues());
    return thunkApi.rejectWithValue("Unauthorized! Logging Out...");
  } // fire up incase of illegal login without token
  return thunkApi.rejectWithValue(error.response.data.msg);
};

export default customFetch;
