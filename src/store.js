import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user/userSlice";
import addJobReducer from "./features/job/jobSlice";
import allJobsReducer from "./features/allJobs/allJobsSlice";
export const store = configureStore({
  reducer: {
    user: userReducer, // accessing user slice reducer functions
    job: addJobReducer, // accessing job slice reducer functions
    allJobs: allJobsReducer, // accessing all user slice reducer functions
  },
}); // creating a store to house all slice
