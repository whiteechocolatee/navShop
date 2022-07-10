import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Header } from "../../components/Header/Header";
import { CallbackBlock } from "../../components/CallbackForm/CallbackBlock";
import { Footer } from "../../components/Footer/Footer";
import { CategoriesNavigation } from "../../components/CategoriesNav/CategoriesNavigation";
import { CategoryCards } from "../../components/CategoryCard/CategoryCards";
import { Brands } from "../../components/BrandsLine/Brands";
import { ItemCarousel } from "../../components/ItemsByType/ItemCarousel";
import { ItemsContainer } from "../../components/ItemsContainer/ItemsContainer";
import { Banner } from "../../components/Banner/Banner";
import { BannersSlider } from "../../components/BannersSlider/BannersSlider";

import {
  getNewItemsCarousel,
  getItemsByCategoryCarousel,
  getDiscountItemsCarousel,
} from "../../store/carouselMainPage/carouselMainSlice";

export const Main = () => {
  const { items, isLoading } = useSelector((state) => {
    return state.carousel;
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getNewItemsCarousel());
    dispatch(getItemsByCategoryCarousel("charger"));
    dispatch(getDiscountItemsCarousel());
  }, [dispatch]);

  return (
    <React.Fragment>
      <Header />
      <CategoriesNavigation />
      <BannersSlider />
      <Brands />
      <ItemCarousel
        title={"Новые товары"}
        Component={ItemsContainer}
        items={items.newItems}
        loading={isLoading.newItemsLoading}
      />
      <Banner />
      <ItemCarousel
        title={"Зарядные"}
        Component={ItemsContainer}
        items={items.itemsByCategory}
        loading={isLoading.itemsByCategoryLoading}
      />
      <CategoryCards />
      <ItemCarousel
        title={"Предложения"}
        Component={ItemsContainer}
        items={items.discountItems}
        loading={isLoading.discountItemsLoading}
      />
      <CallbackBlock />
      <Footer />
    </React.Fragment>
  );
};
