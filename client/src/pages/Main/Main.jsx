import React, { useEffect } from "react";
import { Header } from "../../components/Header/Header";
import { CallbackBlock } from "../../components/CallbackForm/CallbackBlock";
import { Footer } from "../../components/Footer/Footer";
import { CategoriesNavigation } from "../../components/CategoriesNav/CategoriesNavigation";
import { CategoryCards } from "../../components/CategoryCard/CategoryCards";
import { Brands } from "../../components/BrandsLine/Brands";
import { ItemCarousel } from "../../components/ItemsByType/ItemCarousel";
import { ItemsContainer } from "../../components/ItemsContainer/ItemsContainer";

import { useSelector } from "react-redux";

import {
  getNewItemsCarousel,
  getItemsByCategoryCarousel,
  getDiscountItemsCarousel,
} from "../../store/carouselMainPage/carouselMainSlice";

import { useDispatch } from "react-redux";

export const Main = () => {
  const itemsData = useSelector((state) => {
    return state.carousel;
  });

  console.log(itemsData);

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
      <Brands />
      <ItemCarousel
        title={"Новые товары"}
        Component={ItemsContainer}
        items={itemsData.items}
      />
      <ItemCarousel
        title={"Зарядные"}
        Component={ItemsContainer}
        items={itemsData.itemsByCategory}
      />
      <CategoryCards />
      <ItemCarousel
        title={"Предложения"}
        Component={ItemsContainer}
        items={itemsData.discountItems}
      />
      <CallbackBlock />
      <Footer />
    </React.Fragment>
  );
};
