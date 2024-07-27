import React from "react";
import { Route, Navigate } from "react-router-dom";

const PrivateRoute = ({ element: Element, roles, ...rest }) => {
  const currentUser = JSON.parse(localStorage.getItem("user"));

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  if (roles && roles.indexOf(currentUser.role) === -1) {
    return <Navigate to="/forbidden" replace />;
  }

  return <Route {...rest} element={<Element />} />;
};

export default PrivateRoute;
