import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getJobStats } from "../../features/allJobs/allJobsSlice";
import { ChartContainer, StatsContainer, Loading } from "../../components";

const Stats = () => {
  const dispatch = useDispatch();
  const { isLoading, monthlyApplication } = useSelector(
    (store) => store.allJobs
  );

  useEffect(() => {
    dispatch(getJobStats());
  }, []);

  if (isLoading) {
    <Loading center />;
  }
  return (
    <>
      <StatsContainer />
      {monthlyApplication.length > 0 ? <ChartContainer /> : null}
    </>
  );
};

export default Stats;
