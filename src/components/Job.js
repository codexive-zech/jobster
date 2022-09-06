import React from "react";
import Wrapper from "../assets/wrappers/Job";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { FaLocationArrow, FaBriefcase, FaCalendarAlt } from "react-icons/fa";
import { JobInfo } from "./index";
import moment from "moment";
import { deleteJob, setJobEdit } from "../features/job/jobSlice";
const Job = ({
  _id,
  company,
  position,
  status,
  jobType,
  jobLocation,
  createdAt,
}) => {
  const dispatch = useDispatch();
  const date = moment(createdAt).format("MMMM Do YYYY");
  return (
    <Wrapper>
      <header>
        <div className="main-icon">{company.charAt(0)}</div>
        <div className="info">
          <h5>{company}</h5>
          <p>{position}</p>
        </div>
      </header>
      <div className="content">
        <div className="content-center">
          <JobInfo icon={<FaLocationArrow />} text={jobLocation} />
          <JobInfo icon={<FaCalendarAlt />} text={date} />
          <JobInfo icon={<FaBriefcase />} text={jobType} />
          <div className={`status ${status}`}>{status}</div>
        </div>
        <footer>
          <div className="actions">
            <Link
              to="/add-job"
              className="btn edit-btn"
              onClick={
                () =>
                  dispatch(
                    setJobEdit({
                      editJobId: _id,
                      company,
                      position,
                      status,
                      jobType,
                      jobLocation,
                    })
                  ) // set jobId and returned back all the values form the server
              }
            >
              Edit
            </Link>
            <button
              type="button"
              className="btn delete-btn"
              onClick={() => dispatch(deleteJob(_id))} // handle delete job DELETe request
            >
              Delete
            </button>
          </div>
        </footer>
      </div>
    </Wrapper>
  );
};

export default Job;
