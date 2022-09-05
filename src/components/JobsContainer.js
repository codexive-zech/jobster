import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Wrapper from "../assets/wrappers/JobsContainer";
import { Job, Loading, PageBtnContainer } from "../components";
import { getAllJobs } from "../features/allJobs/allJobsSlice";

const JobsContainer = () => {
<<<<<<< HEAD
=======

>>>>>>> 7cbf9403ac9ea22aeb9fc56d1da9855a651044e8
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
<<<<<<< HEAD
=======

>>>>>>> 7cbf9403ac9ea22aeb9fc56d1da9855a651044e8
      <h5>
        {totalJobs} {jobs.length > 1 ? "Jobs" : "Job"} Available
      </h5>

<<<<<<< HEAD
=======

>>>>>>> 7cbf9403ac9ea22aeb9fc56d1da9855a651044e8
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
