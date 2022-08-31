import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user/userSlice";
import addJobReducer from "./features/job/jobSlice";
import allJobsReducer from "./features/allJobs/allJobsSlice";
export const store = configureStore({
  reducer: {
    user: userReducer,
    job: addJobReducer,
    allJobs: allJobsReducer,
  },
});
