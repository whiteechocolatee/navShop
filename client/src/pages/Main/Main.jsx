import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styles from "./main.module.css";

import { Header } from "../../components/Header/Header";
import { CallbackBlock } from "../../components/CallbackForm/CallbackBlock";
import { Footer } from "../../components/Footer/Footer";
import { CategoriesNavigation } from "../../components/CategoriesNav/CategoriesNavigation";
import { CategoryCards } from "../../components/CategoryCard/CategoryCards";
import { Brands } from "../../components/BrandsLine/Brands";
import { ItemCarousel } from "../../components/ItemsByType/ItemCarousel";
import { Banner } from "../../components/Banner/Banner";
import { BannersSlider } from "../../components/BannersSlider/BannersSlider";
import { Loader } from "../../components/Loader/Loader";
import { paths } from "../../paths";

import {
  logout,
  checkIsAuth,
  userProfile,
} from "../../store/users/userAuthSlice";
import { getItems } from "../../store/items/itemsSlice";

export const Main = () => {
  const isAuth = useSelector(checkIsAuth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { items, isLoading } = useSelector((state) => {
    return state.itemsReducer;
  });

  useEffect(() => {
    dispatch(getItems());
    dispatch(userProfile());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logout());
    window.localStorage.removeItem("token");
    navigate(paths.main);
  };

  const category = items.filter((elem) => {
    return elem.category === "charger";
  });

  const discount = items.filter((elem) => {
    return elem.discount > 0;
  });

  let itemsQuantity = 4;

  const width = window.innerWidth;

  if (width <= 1285) {
    itemsQuantity = 3;
  }

  if (width <= 890) {
    itemsQuantity = 2;
  }

  return (
    <div className={styles.container}>
      {isLoading ? (
        <Loader containerClassName={styles.loader} />
      ) : (
        <>
          <Header
            handleLogout={handleLogout}
            isAuth={isAuth}
          />
          <CategoriesNavigation />
          <BannersSlider />
          <Brands />
          <ItemCarousel
            containerClassName={styles.flex}
            itemsQuantity={itemsQuantity}
            title={"Новые товары"}
            items={items}
          />
          <Banner />
          <ItemCarousel
            containerClassName={styles.flex}
            itemsQuantity={itemsQuantity}
            title={"Зарядные"}
            items={category}
          />
          <CategoryCards />
          <ItemCarousel
            containerClassName={styles.flex}
            itemsQuantity={itemsQuantity}
            title={"Предложения"}
            items={discount}
          />
          <CallbackBlock />
          <Footer />
        </>
      )}
    </div>
  );
};
