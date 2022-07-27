import React from "react";
import styles from "./order.module.css";
import { ContentWrapper } from "../../components/contentWrapper/ContentWrapper";
import { Header } from "../../components/Header/Header";
import { Footer } from "../../components/Footer/Footer";
import { OrderCart } from "../../components/OrderCart/OrderCart";

export const Order = () => {
  window.scroll(0, 0);

  return (
    <React.Fragment>
      <Header />
      <ContentWrapper className={styles.orderPage}>
        <OrderCart />
      </ContentWrapper>
      <Footer />
    </React.Fragment>
  );
};
