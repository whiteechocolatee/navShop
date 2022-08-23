import React from "react";
import { Outlet } from "react-router-dom";

import { Login } from "../../pages/Login/Login";

export const ProtectedRoute = ({ condition }) => {
  return condition ? <Outlet /> : <Login />;
};
