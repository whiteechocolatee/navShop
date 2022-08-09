import React from "react";
import { ToastContainer } from "react-toastify";

import { CategoriesNavigation } from "../../components/CategoriesNav/CategoriesNavigation";
import { ContentWrapper } from "../../components/contentWrapper/ContentWrapper";
import { Header } from "../../components/Header/Header";
import { Footer } from "../../components/Footer/Footer";
import { UserPassword } from "../../components/UserUpdatePassword/UserPassword";
import { UserAccount } from "../../components/UserAccount/UserAccount";

export const UserUpdatePassword = () => {
  return (
    <>
      <Header />
      <CategoriesNavigation />
      <ToastContainer />
      <ContentWrapper>
        <UserAccount />
        <UserPassword />
      </ContentWrapper>
      <Footer />
    </>
  );
};
