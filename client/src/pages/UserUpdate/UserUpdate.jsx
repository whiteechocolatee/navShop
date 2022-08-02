import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Header } from "../../components/Header/Header";
import { Footer } from "../../components/Footer/Footer";
import { UpdateUserInfo } from "../../components/UpdateForm/UpdateUserInfo";
import { UserAccount } from "../../components/UserAccount/UserAccount";

import { userProfile } from "../../store/users/userAuthSlice";

import { ToastContainer } from "react-toastify";
import { CategoriesNavigation } from "../../components/CategoriesNav/CategoriesNavigation";

export const UserUpdate = () => {
  window.scroll(0, 0);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userProfile());
  }, [dispatch]);

  return (
    <>
      <Header />
      <CategoriesNavigation />
      <ToastContainer />
      <UserAccount children={<UpdateUserInfo />} />
      <Footer />
    </>
  );
};
