import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import { CategoriesNavigation } from "../../components/CategoriesNav/CategoriesNavigation";
import { Header } from "../../components/Header/Header";
import { ContentWrapper } from "../../components/contentWrapper/ContentWrapper";
import { UserAccount } from "../../components/UserAccount/UserAccount";
import { Footer } from "../../components/Footer/Footer";
import { UserAddAddress } from "../../components/UserAddAddress/UserAddAddress";

import { userProfile } from "../../store/users/userAuthSlice";
import { getUserOrders } from "../../store/order/orderSlice";

export const UserAddress = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userProfile());
    dispatch(getUserOrders());
  }, [dispatch]);

  return (
    <React.Fragment>
      <Header />
      <CategoriesNavigation />
      <ContentWrapper>
        <UserAccount />
        <UserAddAddress />
      </ContentWrapper>
      <Footer />
    </React.Fragment>
  );
};
