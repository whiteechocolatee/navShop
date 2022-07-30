import React from "react";

import styles from "./delivery.module.css";
import { Header } from "../../components/Header/Header";
import { Footer } from "../../components/Footer/Footer";
import { ContentWrapper } from "../../components/contentWrapper/ContentWrapper";
import { OrderInfo } from "../../components/OrderInfo/OrderInfo";
import { CategoriesNavigation } from "../../components/CategoriesNav/CategoriesNavigation";

export const Delivery = () => {
  return (
    <React.Fragment>
      <Header />
      <CategoriesNavigation />
      <ContentWrapper className={styles.wrapper}>
        <OrderInfo />
      </ContentWrapper>
      <Footer />
    </React.Fragment>
  );
};
