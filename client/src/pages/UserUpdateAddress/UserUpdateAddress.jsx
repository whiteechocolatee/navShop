import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Header } from "../../components/Header/Header";
import { CategoriesNavigation } from "../../components/CategoriesNav/CategoriesNavigation";
import { ContentWrapper } from "../../components/contentWrapper/ContentWrapper";
import { UserAccount } from "../../components/UserAccount/UserAccount";
import { Footer } from "../../components/Footer/Footer";
import { UserChangeAddress } from "../../components/UserChangeAddress/UserChangeAddress";
import {
  userProfile,
  saveAddress,
} from "../../store/users/userAuthSlice";
import { getUserOrders } from "../../store/order/orderSlice";
import { useNavigate } from "react-router-dom";
import { paths } from "../../paths";

export const UserUpdateAddress = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, chosenAddress } = useSelector(
    (state) => state.userAuthReducer,
  );

  const handleUpdate = (address) => {
    let addresses = [...user?.addresses];

    let editedAddresses = addresses.filter(
      (userAddress) => userAddress._id !== address._id,
    );

    editedAddresses.push(address);

    const checkMain = editedAddresses.map(
      (address, index) => {
        if (address.main === "yes") {
          dispatch(saveAddress(editedAddresses)).then(
            (res) => {
              if (res.payload) {
                navigate(paths.account);
              }
            },
          );
        } else {
          if (index === 0) {
            return { ...address, main: "yes" };
          }
          return address;
        }
      },
    );
    dispatch(saveAddress(checkMain)).then((res) => {
      if (res.payload) {
        navigate(paths.account);
      }
    });
  };

  useEffect(() => {
    dispatch(userProfile());
    dispatch(getUserOrders());
  }, [dispatch]);

  return (
    <>
      <Header />
      <CategoriesNavigation />
      <ContentWrapper>
        <UserAccount />
        <UserChangeAddress
          handleUpdate={handleUpdate}
          chosenAddress={chosenAddress}
        />
      </ContentWrapper>
      <Footer />
    </>
  );
};
