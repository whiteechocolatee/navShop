import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { paths } from "../../paths";
import { useDispatch, useSelector } from "react-redux";
import { saveAddress } from "../../store/users/userAuthSlice";

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
  const navigate = useNavigate();

  const { user } = useSelector(
    (state) => state.userAuthReducer,
  );

  const handleAddress = (values) => {
    if (user.addresses.length === 3) {
      navigate(paths.account);
      return;
    }
    let addresses = [...user.addresses];
    if (values.main === "yes") {
      addresses = addresses.map((address) => {
        if (address.main === "yes") {
          return { ...address, main: "no" };
        }
        return address;
      });
      addresses.push(values);
      dispatch(saveAddress(addresses)).then((res) => {
        if (res.payload) {
          navigate(paths.account);
        }
      });
    } else {
      addresses.push(values);
      dispatch(saveAddress(addresses)).then((res) => {
        if (res.payload) {
          navigate(paths.account);
        }
      });
    }
  };

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
        <UserAddAddress handleAddress={handleAddress} />
      </ContentWrapper>
      <Footer />
    </React.Fragment>
  );
};
