import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import { userProfile } from "../../store/users/userAuthSlice";
import { getUserOrders } from "../../store/order/orderSlice";
import { Header } from "../../components/Header/Header";
import { Footer } from "../../components/Footer/Footer";
import { UserAccount } from "../../components/UserAccount/UserAccount";
import { ToastContainer } from "react-toastify";
import { CategoriesNavigation } from "../../components/CategoriesNav/CategoriesNavigation";
import { PersonalData } from "../../components/PersonalData/PersonalData";
import { ContentWrapper } from "../../components/contentWrapper/ContentWrapper";

export const UserMain = () => {
  window.scroll(0, 0);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userProfile());
    dispatch(getUserOrders());
  }, [dispatch]);

  return (
    <>
      <Header />
      <CategoriesNavigation />
      <ToastContainer />
      <ContentWrapper>
        <UserAccount />
        <PersonalData />
      </ContentWrapper>
      <Footer />
    </>
  );
};
