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

import { getNewItemsCarousel } from "../../store/carouselMainPage/carouselMainSlice";

export const Main = () => {
  const { items, isLoading } = useSelector((state) => {
    return state.carousel;
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getNewItemsCarousel());
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

  return (
    <React.Fragment>
      <Header data={items} />
      <CategoriesNavigation />
      <BannersSlider />
      <Brands />
      <ItemCarousel title={"Новые товары"} items={items} />
      <Banner />
      <ItemCarousel title={"Зарядные"} items={category} />
      <CategoryCards />
      <ItemCarousel
        title={"Предложения"}
        items={discount}
      />
      <CallbackBlock />
      <Footer />
    </React.Fragment>
  );
};
