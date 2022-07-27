import React from "react";

import styles from "./delivery.module.css";
import { Header } from "../../components/Header/Header";
import { Footer } from "../../components/Footer/Footer";
import { ContentWrapper } from "../../components/contentWrapper/ContentWrapper";
import { OrderInfo } from "../../components/OrderInfo/OrderInfo";

export const Delivery = () => {
  return (
    <React.Fragment>
      <Header />
      <ContentWrapper className={styles.wrapper}>
        <OrderInfo />
      </ContentWrapper>
      <Footer />
    </React.Fragment>
  );
};
