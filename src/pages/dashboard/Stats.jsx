import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getJobStats } from "../../features/allJobs/allJobsSlice";
import { ChartContainer, StatsContainer, Loading } from "../../components";

const Stats = () => {
  const dispatch = useDispatch();
  const { isLoading, monthlyApplication } = useSelector(
    (store) => store.allJobs
  ); // picking state needed in the allJobs Slice store

  useEffect(() => {
    dispatch(getJobStats()); // invoke the get all job stats ajax request
  }, []); // render when the page loads

  if (isLoading) {
    <Loading center />;
  }
  return (
    <>
      <StatsContainer />
      {/* show the chart when the monthly application length is bigger than 1 */}
      {monthlyApplication.length > 0 ? <ChartContainer /> : null}
    </>
  );
};

export default Stats;
