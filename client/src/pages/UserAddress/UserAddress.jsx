import React from "react";
import { CategoriesNavigation } from "../../components/CategoriesNav/CategoriesNavigation";
import { Header } from "../../components/Header/Header";
import { ContentWrapper } from "../../components/contentWrapper/ContentWrapper";
import { UserAccount } from "../../components/UserAccount/UserAccount";
import { Footer } from "../../components/Footer/Footer";
import { UserAddAddress } from "../../components/UserAddress/UserAddAddress";

export const UserAddress = () => {


  
  return (
    <React.Fragment>
      <Header />
      <CategoriesNavigation />
      <ContentWrapper>
        <UserAccount />
        <UserAddAddress/>
      </ContentWrapper>
      <Footer />
    </React.Fragment>
  );
};
