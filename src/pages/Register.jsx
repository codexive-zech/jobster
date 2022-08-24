import React, { useState } from "react";
import { Logo, FormRow } from "../components";
import Wrapper from "../assets/wrappers/RegisterPage";

const initialFormState = {
  name: "",
  email: "",
  password: "",
  isMember: true,
};

const Register = () => {
  const [values, setValues] = useState(initialFormState);

  const handleValues = (e) => {
    const key = e.target.name;
    const value = e.target.value;
    setValues({ ...values, [key]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, isMember } = values;
    if (!email || !password || (!isMember && !name)) {
      console.log("Please Provide Credentials");
    }
  };

  const handleMemberToggle = () => {
    setValues({ ...values, isMember: !values.isMember });
  };
  return (
    <Wrapper className="full-page">
      {/* Form */}
      <form className="form" onSubmit={handleSubmit}>
        <Logo />
        <h3>{values.isMember ? "Login" : "Register"}</h3>
        {/* Name Field */}
        {values.isMember ? null : (
          <FormRow
            type="name"
            name="name"
            value={values.name}
            handleChange={handleValues}
          />
        )}
        {/* Email Field */}
        <FormRow
          type="email"
          name="email"
          value={values.email}
          handleChange={handleValues}
        />
        {/* Password Field */}
        <FormRow
          type="password"
          name="password"
          value={values.password}
          handleChange={handleValues}
        />
        <button className="btn btn-block">Submit</button>
        <p>
          {values.isMember ? "Not a member yet?" : "Already a member"}
          <button
            type="button"
            className="member-btn"
            onClick={handleMemberToggle}
          >
            {values.isMember ? "Register" : "Login"}
          </button>
        </p>
      </form>
    </Wrapper>
  );
};

export default Register;
