import React from "react";
import { Header } from "../../components/Header/Header";
import { CallbackBlock } from "../../components/CallbackForm/CallbackBlock";
import { Footer } from "../../components/Footer/Footer";

export const Main = () => {
  return (
    <React.Fragment>
      <Header />
      <div className='fixed-bottom'>
        <CallbackBlock />
        <Footer />
      </div>
    </React.Fragment>
  );
};
