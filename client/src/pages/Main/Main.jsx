import React from "react";
import { Header } from "../../components/Header/Header";
import { CallbackBlock } from "../../components/CallbackForm/CallbackBlock";
import { Footer } from "../../components/Footer/Footer";
import { CategoriesNavigation } from "../../components/CategoriesNav/CategoriesNavigation";
import { CategoryCards } from "../../components/CategoryCard/CategoryCards";
import { Brands } from "../../components/BrandsLine/Brands";
import { Loader } from "../../components/Loader/Loader";
import { Item } from '../../components/ItemCard/Item';

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
      <CategoryCards />
      <CallbackBlock />
      <Footer /> */}

      <Item/>
    </React.Fragment>
  );
};
