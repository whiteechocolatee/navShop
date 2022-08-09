import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import styles from "./favorite.module.css";
import { Header } from "../../components/Header/Header";
import { CategoriesNavigation } from "../../components/CategoriesNav/CategoriesNavigation";
import { ContentWrapper } from "../../components/contentWrapper/ContentWrapper";
import { Footer } from "../../components/Footer/Footer";
import { UserFavorites } from "../../components/UserFavorites/UserFavorites";
import { Loader } from "../../components/Loader/Loader";

import {
  userProfile,
  removeFromFavorites,
} from "../../store/users/userAuthSlice";
import { setItemInCart } from "../../store/cart/cartSlice";

export const Favorite = () => {
  window.scroll(0, 0);
  const dispatch = useDispatch();

  const { favorites, isLoading } = useSelector(
    (state) => state.userAuthReducer,
  );

  useEffect(() => {
    dispatch(userProfile());
  }, [dispatch]);

  const removeItem = (params) => {
    dispatch(removeFromFavorites(params));
  };

  const cart = useSelector(
    (state) => state.cartReducer.itemsInCart,
  );

  const addToCart = (item) => {
    dispatch(setItemInCart(item));
  };

  return (
    <>
      <Header />
      <CategoriesNavigation />
      {isLoading ? (
        <Loader containerClassName={styles.loader} />
      ) : (
        <ContentWrapper>
          <UserFavorites
            cart={cart}
            removeItem={removeItem}
            addToCart={addToCart}
            favorites={favorites}
          />
        </ContentWrapper>
      )}
      <Footer />
    </>
  );
};
