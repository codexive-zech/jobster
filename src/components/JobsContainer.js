import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Wrapper from "../assets/wrappers/JobsContainer";
import { Job, Loading, PageBtnContainer } from "../components";
import { getAllJobs } from "../features/allJobs/allJobsSlice";

const JobsContainer = () => {
  const {
    jobs,
    isLoading,
    totalJobs,
    numOfPages,
    page,
    sort,
    searchStatus,
    searchType,
    search,
  } = useSelector((store) => store.allJobs); // picking state available in the all job Slice store

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllJobs()); // invoke the get all job ajax request
  }, [page, sort, searchStatus, searchType, search]); // re-render based on the dependency list

  if (isLoading) {
    return (
      <Wrapper>
        <Loading center />
      </Wrapper>
    );
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
