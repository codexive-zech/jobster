import React, { useState, useEffect } from "react";
import { Logo, FormRow } from "../components";
import Wrapper from "../assets/wrappers/RegisterPage";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { registerUser, loginUser } from "../features/user/userSlice";
import { useNavigate } from "react-router-dom";

const initialFormState = {
  name: "",
  email: "",
  password: "",
  isMember: true,
};

const Register = () => {
  const [values, setValues] = useState(initialFormState); // define the user values state
  const { isLoading, user } = useSelector((store) => store.user); // picking state available in the userSlice store
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleValues = (e) => {
    const key = e.target.name;
    const value = e.target.value;
    setValues({ ...values, [key]: value }); // changing the input field to a new value
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, isMember } = values;
    if (!email || !password || (!isMember && !name)) {
      toast.error("Please Provide Credentials"); // display if all fields are empty
      return;
    }
    if (isMember) {
      dispatch(loginUser({ email, password })); // handle login POST request if the user is a member(user details already exist)
      return;
    }
    dispatch(registerUser({ name, email, password })); // handle register POST request to create a new user
  };

  const handleMemberToggle = () => {
    setValues({ ...values, isMember: !values.isMember }); // handling the toggling of member state
  };

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate("/");
      }, 3000); // if user obj details exist, navigate to the dashboard (index page)
    }
  }, [user]); // navigate from register and login page to the dashboard page if the user exist
  return (
    <Wrapper className="full-page">
      {/* Form */}
      <form className="form" onSubmit={handleSubmit}>
        <Logo />
        <h3>{values.isMember ? "Login" : "Sign Up"}</h3>
        {/* Name Field */}
        {values.isMember ? null : (
          <FormRow
            type="name"
            name="name"
            value={values.name}
            handleChange={handleValues}
          />
        )}
        {/*  display the name input field if the user is not a member and wants to register*/}
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
        <button className="btn btn-block" disabled={isLoading}>
          {isLoading ? "Loading..." : "Submit"}
        </button>
        {/* <button
          className="btn btn-block btn-hipster"
          disabled={isLoading}
          onClick={() =>
            dispatch(
              loginUser({ email: "testUser@test.com", password: "secret" })
            )
          }
        >
          {isLoading ? "Loading..." : "Demo"}
        </button> */}
        <p>
          {values.isMember ? "Not a member yet?" : "Already a member?"}
          <button
            type="button"
            className="member-btn"
            onClick={handleMemberToggle}
          >
            {values.isMember ? "Sign Up" : "Login"}
          </button>
        </p>
      </form>
    </Wrapper>
  );
};

export default Register;
