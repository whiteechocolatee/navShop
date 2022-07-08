import React from "react";
import { Header } from "../../components/Header/Header";
import { CallbackBlock } from "../../components/CallbackForm/CallbackBlock";
import { Footer } from "../../components/Footer/Footer";
import { CategoriesNavigation } from "../../components/CategoriesNav/CategoriesNavigation";
import { CategoryCards } from "../../components/CategoryCard/CategoryCards";
import { Brands } from "../../components/BrandsLine/Brands";
import { Loader } from "../../components/Loader/Loader";
import { Item } from "../../components/ItemCard/Item";
import { ItemCarousel } from "../../components/ItemsByType/ItemCarousel";
import { Application } from "../../components/testFOLDER/App";

export const Main = () => {
  const loading = false;

  if (loading) {
    return <Loader />;
  }

  return (
    <React.Fragment>
      {/* <Header />
      <CategoriesNavigation />
      <Brands />
      <ItemCarousel />
      <CategoryCards />
      <CallbackBlock />
      <Footer /> */}
      <Application />
    </React.Fragment>
  );
};
