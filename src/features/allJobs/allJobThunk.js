import customFetch from "../../utils/customFetch";

export const getAllJobsThunk = async (_, thunkApi) => {
  let url = "/jobs";
  try {
    const resp = await customFetch.get(url);
    return resp.data;
  } catch (error) {
    return thunkApi.rejectWithValue(error.response.data.msg);
  }
};

export const getAllStatsThunk = async (_, thunkApi) => {
  try {
    const resp = await customFetch.get("/jobs/stats");
    return resp.data;
  } catch (error) {
    return thunkApi.rejectWithValue(error.response.data.msg);
  }
};
