import { Navigate } from "react-router-dom";
import React from "react";

const PrivateRoute = ({ children, token }) => {
  return token ? children : <Navigate to="/login" replace={true} />;
};

export default PrivateRoute;
