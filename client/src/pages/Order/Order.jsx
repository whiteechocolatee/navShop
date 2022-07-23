import React from "react";
import styles from "./order.module.css";
import { ContentWrapper } from "../../components/contentWrapper/ContentWrapper";
import { Header } from "../../components/Header/Header";
import { Footer } from "../../components/Footer/Footer";
import { OrderInfo } from "../../components/OrderInfo/OrderInfo";
import { Link } from "react-router-dom";
import { paths } from "../../paths";

export const Order = () => {
  window.scroll(0, 0);

  return (
    <React.Fragment>
      <Header />
      <ContentWrapper className={styles.orderPage}>
        <OrderInfo />
        <Link
          to={`${paths.order}/${paths.delivery}`}>Перейти к оформлению заказа</Link>
      </ContentWrapper>
      <Footer />
    </React.Fragment>
  );
};
