import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  getUserFromLocalStorage,
  setUserToLocalStorage,
  removeUserFromLocalStorage,
} from "../../utils/localStorageData";
import {
  clearAllStoreValueThunk,
  loginUserThunk,
  registerUserThunk,
  updateUserDetailsThunk,
} from "./userThunk";

const initialState = {
  isLoading: false,
  isSidebarOpen: false,
  user: getUserFromLocalStorage(), // getting user from the local storage
}; // defining the state values for user store

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (user, thunkAPI) => {
    return registerUserThunk("/auth/register", user, thunkAPI);
  }
); // an ajax POST request to the user obj on the server when a new user is added

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (user, thunkAPI) => {
    return loginUserThunk("/auth/login", user, thunkAPI);
  }
); // an ajax POST request to the user obj on the server when user is logging in

export const updateUserDetails = createAsyncThunk(
  "user/updateUserDetails",
  async (user, thunkAPI) => {
    return updateUserDetailsThunk("/auth/updateUser", user, thunkAPI);
  }
); // an ajax PATCH request to the user obj on the server to update user detail

export const clearAllStoreValues = createAsyncThunk(
  "user/clearStoreValue",
  clearAllStoreValueThunk
); // clearing all store state to default when a user logout

const userSlice = createSlice({
  name: "user", // slice name
  initialState, // define the store state in the slice
  reducers: {
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    }, // changing the state of the sidebar
    logoutUser: (state, { payload }) => {
      state.user = null;
      state.isSidebarOpen = false;
      removeUserFromLocalStorage();
      toast.success(payload);
    }, // handling logout functionality
  }, // adding all simple reducer actions functionality
  extraReducers: {
    // register user ajax request
    [registerUser.pending]: (state) => {
      state.isLoading = true;
    },
    [registerUser.fulfilled]: (state, { payload }) => {
      const { user } = payload;
      state.isLoading = false;
      state.user = user;
      setUserToLocalStorage(user);
      toast.success(`Hello, ${user.name}`);
    },
    [registerUser.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    },

    // Login user ajax request
    [loginUser.pending]: (state) => {
      state.isLoading = true;
    },
    [loginUser.fulfilled]: (state, { payload }) => {
      const { user } = payload;
      state.isLoading = false;
      state.user = user;
      setUserToLocalStorage(user);
      toast.success(`Welcome back, ${user.name}`);
    },
    [loginUser.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    },

    // update user ajax request
    [updateUserDetails.pending]: (state) => {
      state.isLoading = true;
    },
    [updateUserDetails.fulfilled]: (state, { payload }) => {
      const { user } = payload;
      state.isLoading = false;
      state.user = user;
      setUserToLocalStorage(user);
      toast.success("User Updated Successfully");
    },
    [updateUserDetails.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    },

    // clearing all store value
    [clearAllStoreValueThunk.rejected]: () => {
      toast.error("There Was an Error...");
    },
  },
});

export const { toggleSidebar, logoutUser } = userSlice.actions; // sending all user reducer action

export default userSlice.reducer;
