import React from "react";
import logo from "../assets/images/logo.svg";
import main from "../assets/images/main.svg";
import styled from "styled-components";

const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <img src={logo} className="logo" alt="jobster logo" />
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
          <button className="btn btn-hero">Sign Up</button>
        </div>
        {/* Image */}
        <img src={main} alt="job hunters" className="img main-img" />
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  nav {
    width: var(--fluid-width);
    max-width: var(--max-width);
    margin: 0 auto;
    height: var(--nav-height);
    display: flex;
    align-items: center;
  }
  .page {
    min-height: calc(100vh - var(--nav-height));
    display: grid;
    align-items: center;
    margin-top: -3rem;
  }

  h1 {
    font-weight: 700;
    span {
      color: var(--primary-500);
    }
  }
  p {
    color: var(--gray-600);
  }

  .main-img {
    display: none;
  }

  @media (min-width: 992px) {
    .page {
      grid-template-columns: repeat(2, 1fr);
      column-gap: 2rem;
    }
    .main-img {
      display: block;
    }
  }
`;

export default Landing;
