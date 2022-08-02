import React from "react";
import { Header } from "../../components/Header/Header";
import { Footer } from "../../components/Footer/Footer";
import { Orders } from "../../components/Orders/Orders";
import { UserAccount } from "../../components/UserAccount/UserAccount";
import { CategoriesNavigation } from "../../components/CategoriesNav/CategoriesNavigation";

export const UserOrders = () => {
  return (
    <>
      <Header />
      <CategoriesNavigation />
      <UserAccount children={<Orders />} />
      <Footer />
    </>
  );
};
