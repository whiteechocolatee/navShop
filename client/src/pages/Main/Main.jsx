import React from "react";
import { Header } from "../../components/Header/Header";
import { CallbackBlock } from "../../components/CallbackForm/CallbackBlock";
import { Footer } from "../../components/Footer/Footer";
import { CategoriesNavigation } from "../../components/CategoriesNav/CategoriesNavigation";

export const Main = () => {
  return (
    <React.Fragment>
      <Header />
      <CategoriesNavigation />
      {/* <div className='fixed-bottom'> */}
      <CallbackBlock />
      <Footer />
      {/* </div> */}
    </React.Fragment>
  );
};
