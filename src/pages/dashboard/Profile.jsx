import React, { useState } from "react";
import { FormRow } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import { toast } from "react-toastify";
import { updateUserDetails } from "../../features/user/userSlice";

const Profile = () => {
  const { isLoading, user } = useSelector((store) => store.user); // picking state available in the userSlice store
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    lastName: user?.lastName || "",
    location: user?.location || "",
  }); // getting user data state from the user obj in the LocalStorage

  const handleUserDetails = (e) => {
    const key = e.target.name;
    const value = e.target.value;
    setUserData({ ...userData, [key]: value }); // changing the input field to a new value
  };

  const submitUpdatedDetails = (e) => {
    e.preventDefault();
    const { name, email, lastName, location } = userData;
    if (!name || !email || !lastName || !location) {
      toast.error("Please Provide Complete User Details"); // display if all fields are empty
      return;
    }
    dispatch(updateUserDetails({ name, email, lastName, location })); // update the user info if all fields are provided
  };
  return (
    <Wrapper>
      <form className="form" onSubmit={submitUpdatedDetails}>
        <h3>Profile</h3>
        <div className="form-center">
          {/* Name Field */}
          <FormRow
            name="name"
            type="text"
            value={userData.name}
            handleChange={handleUserDetails}
          />
          {/* Email Field */}

          <FormRow
            name="email"
            type="email"
            value={userData.email}
            handleChange={handleUserDetails}
          />
          {/* Last Name Field */}

          <FormRow
            name="lastName"
            type="name"
            labelText="Last Name"
            value={userData.lastName}
            handleChange={handleUserDetails}
          />
          {/* Location Field */}
          <FormRow
            name="location"
            type="text"
            value={userData.location}
            handleChange={handleUserDetails}
          />
          <button className="btn btn-block" disabled={isLoading}>
            {isLoading ? "Please Wait..." : "Save Changes"}
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

export default Profile;
