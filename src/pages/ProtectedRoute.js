import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { user } = useSelector((store) => store.user); // picking state in the userSlice store
  if (!user) {
    return <Navigate to="/landing" />;
  } // route to landing page if user state does not exist
  return children; // route to rest page if user exist
};

export default ProtectedRoute;
