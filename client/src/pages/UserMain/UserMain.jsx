import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { paths } from "../../paths";
import { Header } from "../../components/Header/Header";
import { Footer } from "../../components/Footer/Footer";
import { UpdateUserInfo } from "../../components/UpdateForm/UpdateUserInfo";
import { UserAccount } from "../../components/UserAccount/UserAccount";

import {
  logout,
  userProfile,
} from "../../store/users/userAuthSlice";

import { ToastContainer } from "react-toastify";

export const UserMain = () => {
  window.scroll(0, 0);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, errors } = useSelector(
    (state) => state.userAuthReducer,
  );

  const isAdmin = user.isAdmin;

  useEffect(() => {
    dispatch(userProfile());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logout());
    window.localStorage.removeItem("token");
    navigate(paths.main);
  };

  return (
    <>
      <Header
        handleLogout={handleLogout}
        isAuth={user ? true : false}
      />
      <ToastContainer />
      <UserAccount
        errors={errors}
        user={user}
        children={<UpdateUserInfo />}
      />
      <Footer />
    </>
  );
};
