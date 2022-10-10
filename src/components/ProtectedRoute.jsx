import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ user, children }) => {
  if (!user) <Navigate to="/login" replace />;

  return children ? children : <Outlet />;
};

export default ProtectedRoute;
