import React from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { checkIsAuth } from "../../store/users/userAuthSlice";
import { Login } from "../../pages/Login/Login";

export const ProtectedRoute = () => {
  const isAuth = useSelector(checkIsAuth);
  return isAuth ? <Outlet /> : <Login />;
};
