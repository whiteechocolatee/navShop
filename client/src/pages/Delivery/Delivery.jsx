import React, { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

import styles from "./delivery.module.css";
import { Header } from "../../components/Header/Header";
import { Footer } from "../../components/Footer/Footer";
import { ContentWrapper } from "../../components/contentWrapper/ContentWrapper";
import { CategoriesNavigation } from "../../components/CategoriesNav/CategoriesNavigation";
import { getRegions } from "../../store/deliveryAddresses/deliverySlice";
import { useDispatch, useSelector } from "react-redux";

import { paths } from "../../paths";
import { OrderCheckDelivery } from "../../components/OrderCheckDelivery/OrderCheckDelivery";
import { CustomerForm } from "../../components/CustomerForm/CustomerForm";
import { DeliveryMethod } from "../../components/DeliveryMethod/DeliveryMethod";

export const Delivery = () => {
  const dispatch = useDispatch();

  const cart = useSelector((state) => {
    return state.cartReducer.itemsInCart;
  });

  const total = cart.reduce((acc, item) => {
    return acc + item.totalPrice;
  }, 0);

  // useEffect(() => {
  //   dispatch(getRegions());
  // }, [dispatch]);

  return (
    <React.Fragment>
      <Header />
      <CategoriesNavigation />
      <ContentWrapper className={styles.wrapper}>
        <div className={styles.deliveryPayment}>
          <div className={styles.navigation}>
            <Link className={styles.link} to={paths.main}>
              Головна
            </Link>
            <hr className={styles.border} />
            <Link className={styles.link} to={paths.order}>
              Кошик
            </Link>
            <hr className={styles.border} />
            <Link className={styles.link} to={paths.order}>
              Доставка та оплата
            </Link>
          </div>
          <div>
            <h1 className={styles.cartTitle}>
              Доставка та оплата
            </h1>
          </div>
          <div className={styles.orderPayment}>
            <div className={styles.forms}>
              <CustomerForm />
              <DeliveryMethod />
            </div>
            <OrderCheckDelivery total={total} cart={cart} />
          </div>
        </div>
      </ContentWrapper>
      <Footer />
    </React.Fragment>
  );
};
