import React from "react";

import { Header } from "../../components/Header/Header";
import { Footer } from "../../components/Footer/Footer";
import { Orders } from "../../components/Orders/Orders";
import { UserAccount } from "../../components/UserAccount/UserAccount";
import { CategoriesNavigation } from "../../components/CategoriesNav/CategoriesNavigation";
import { ContentWrapper } from "../../components/contentWrapper/ContentWrapper";

export const UserOrders = () => {
  return (
    <>
      <Header />
      <CategoriesNavigation />
      <ContentWrapper>
        <UserAccount />
        <Orders />
      </ContentWrapper>
      <Footer />
    </>
  );
};
