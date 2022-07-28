import React from "react";
import { Header } from "../../components/Header/Header";
import { Footer } from "../../components/Footer/Footer";
import { Orders } from "../../components/Orders/Orders";
import { UserAccount } from "../../components/UserAccount/UserAccount";

export const UserOrders = () => {
  return (
    <>
      <Header />
      <UserAccount children={<Orders />} />
      <Footer />
    </>
  );
};
