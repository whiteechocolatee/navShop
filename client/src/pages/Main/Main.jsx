import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

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

import { getItems } from "../../store/items/itemsSlice";

export const Main = () => {
  const { items, isLoading } = useSelector((state) => {
    return state.itemsReducer;
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getItems());
  }, [dispatch]);

  const category = items.filter((elem) => {
    return elem.category === "charger";
  });

  const discount = items.filter((elem) => {
    return elem.discount > 0;
  });

  if (isLoading) {
    return <Loader />;
  }

  let itemsQuantity = 4;

  const width = window.innerWidth;

  if (width <= 1285) {
    itemsQuantity = 3;
  }

  if (width <= 890) {
    itemsQuantity = 2;
  }

  return (
    <React.Fragment>
      <Header />
      <CategoriesNavigation />
      <BannersSlider />
      <Brands />
      <ItemCarousel
        itemsQuantity={itemsQuantity}
        title={"Новые товары"}
        items={items}
      />
      <Banner />
      <ItemCarousel
        itemsQuantity={itemsQuantity}
        title={"Зарядные"}
        items={category}
      />
      <CategoryCards />
      <ItemCarousel
        itemsQuantity={itemsQuantity}
        title={"Предложения"}
        items={discount}
      />
      <CallbackBlock />
      <Footer />
    </React.Fragment>
  );
};
