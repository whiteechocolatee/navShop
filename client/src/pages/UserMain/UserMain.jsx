import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";

import { userProfile } from "../../store/users/userAuthSlice";
import { getUserOrders } from "../../store/order/orderSlice";
import { Header } from "../../components/Header/Header";
import { Footer } from "../../components/Footer/Footer";
import { UserAccount } from "../../components/UserAccount/UserAccount";
import { CategoriesNavigation } from "../../components/CategoriesNav/CategoriesNavigation";
import { PersonalData } from "../../components/PersonalData/PersonalData";
import { ContentWrapper } from "../../components/contentWrapper/ContentWrapper";

import { saveAddress } from "../../store/users/userAuthSlice";

export const UserMain = () => {
  window.scroll(0, 0);
  const dispatch = useDispatch();

  const { user, isLoading } = useSelector(
    (state) => state.userAuthReducer,
  );

  const handleDelete = (id) => {
    const editedArray = user.addresses.filter((address) => {
      return address._id !== id;
    });
    dispatch(saveAddress(editedArray));
  };

  const changeMain = (id) => {
    const changedAddresses = user.addresses.map(
      (addressMap) => {
        if (addressMap._id === id) {
          return { ...addressMap, main: "yes" };
        }
        return { ...addressMap, main: "no" };
      },
    );
    dispatch(saveAddress(changedAddresses));
  };

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
        <PersonalData
          isLoading={isLoading}
          user={user}
          handleDelete={handleDelete}
          changeMain={changeMain}
        />
      </ContentWrapper>
      <Footer />
    </>
  );
};
