import React, { useState } from "react";
import { FormRow } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import { toast } from "react-toastify";
import { updateUserDetails } from "../../features/user/userSlice";

const Profile = () => {
  const { isLoading, user } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    lastName: user?.lastName || "",
    location: user?.location || "",
  });

  const handleUserDetails = (e) => {
    const key = e.target.name;
    const value = e.target.value;
    setUserData({ ...userData, [key]: value });
  };

  const submitUpdatedDetails = (e) => {
    e.preventDefault();
    const { name, email, lastName, location } = userData;
    if (!name || !email || !lastName || !location) {
      toast.error("Please Provide Complete User Details");
      return;
    }
    dispatch(updateUserDetails({ name, email, lastName, location }));
  };
  return (
    <Wrapper>
      <form className="form" onSubmit={submitUpdatedDetails}>
        <h3>Profile</h3>
        <div className="form-center">
          <FormRow
            name="name"
            type="text"
            value={userData.name}
            handleChange={handleUserDetails}
          />
          <FormRow
            name="email"
            type="email"
            value={userData.email}
            handleChange={handleUserDetails}
          />
          <FormRow
            name="lastName"
            type="name"
            labelText="Last Name"
            value={userData.lastName}
            handleChange={handleUserDetails}
          />
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
