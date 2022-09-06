import customFetch, {
  checkForUnauthorizedResponse,
} from "../../utils/customFetch";

export const getAllJobsThunk = async (_, thunkApi) => {
  const { page, search, searchStatus, searchType, sort } =
    thunkApi.getState().allJobs;
  let url = `/jobs?status=${searchStatus}&jobType=${searchType}&sort=${sort}&page=${page}`;
  if (search) {
    url = `${url}&search=${search}`;
  }
  try {
    const resp = await customFetch.get(url);
    return resp.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkApi);
  }
};

export const getAllStatsThunk = async (_, thunkApi) => {
  try {
    const resp = await customFetch.get("/jobs/stats");
    return resp.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkApi);
  }
};
