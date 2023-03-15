import React from "react";
import main from "../assets/images/Interview.png";
import Wrapper from "../assets/wrappers/LandingPage";
import { Logo } from "../components";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>
      <div className="container page">
        {/* Info */}
        <div>
          <h1>
            Job <span>Tracking</span> App
          </h1>
          <p>
            Keep track of all the jobs you are applying for and manage your
            resources, time, costs and profitability every time. Enjoy seamless
            jobs management and insightful reporting.
          </p>
          <Link to="/register" className="btn btn-hero">
            Sign Up
          </Link>
        </div>
        {/* Image */}
        <img src={main} alt="job hunters" className="img main-img" />
      </div>
    </Wrapper>
  );
};

export default Landing;
