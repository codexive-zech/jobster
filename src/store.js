import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user/userSlice";
import addJobReducer from "./features/job/jobSlice";
export const store = configureStore({
  reducer: {
    user: userReducer,
    job: addJobReducer,
  },
});
