import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Wrapper from "../assets/wrappers/JobsContainer";
import { Job, Loading, PageBtnContainer } from "../components";
import { getAllJobs } from "../features/allJobs/allJobsSlice";

const JobsContainer = () => {
  const { jobs, isLoading, totalJobs, numOfPages } = useSelector(
    (store) => store.allJobs
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllJobs());
  }, []);

  if (isLoading) {
    return (
      <Wrapper>
        <Loading center />
      </Wrapper>
    );
  }

  if (jobs.length === 0) {
    <Wrapper>
      <h2>No Job Available To Display</h2>
    </Wrapper>;
  }
  return (
    <Wrapper>
      <h5>
        {totalJobs} {jobs.length > 1 ? "Jobs" : "Job"} Available
      </h5>

      <div className="jobs">
        {jobs.map((job) => {
          return <Job key={job._id} {...job} />;
        })}
      </div>
      {numOfPages > 1 ? <PageBtnContainer /> : null}
    </Wrapper>
  );
};

export default JobsContainer;
