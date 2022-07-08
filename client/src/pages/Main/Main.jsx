import React from "react";
import { Header } from "../../components/Header/Header";
import { CallbackBlock } from "../../components/CallbackForm/CallbackBlock";
import { Footer } from "../../components/Footer/Footer";
import { CategoriesNavigation } from "../../components/CategoriesNav/CategoriesNavigation";
import { CategoryCards } from "../../components/CategoryCard/CategoryCards";
import { Brands } from "../../components/BrandsLine/Brands";

export const Main = () => {
  return (
    <React.Fragment>
      <Header />
      <CategoriesNavigation />
      <Brands />
      <CategoryCards />
      <CallbackBlock />
      <Footer />
    </React.Fragment>
  );
};
