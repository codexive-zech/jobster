import React from "react";
import main from "../assets/images/main.svg";
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
            Salvia everyday carry echo park, ethical skateboard gentrify sus
            franzen knausgaard. Raw denim drinking vinegar humblebrag, pickled
            gatekeep neutra activated charcoal fixie twee organic post-ironic
            beard craft beer pinterest.
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
