import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Header } from "../../components/Header/Header";
import { Footer } from "../../components/Footer/Footer";
import { UpdateUserInfo } from "../../components/UpdateForm/UpdateUserInfo";
import { UserAccount } from "../../components/UserAccount/UserAccount";

import { userProfile } from "../../store/users/userAuthSlice";

import { ToastContainer } from "react-toastify";

export const UserMain = () => {
  window.scroll(0, 0);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userProfile());
  }, [dispatch]);

  return (
    <>
      <Header />
      <ToastContainer />
      <UserAccount children={<UpdateUserInfo />} />
      <Footer />
    </>
  );
};
