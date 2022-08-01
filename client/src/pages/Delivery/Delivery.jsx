import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import styles from "./delivery.module.css";
import { Header } from "../../components/Header/Header";
import { Footer } from "../../components/Footer/Footer";
import { ContentWrapper } from "../../components/contentWrapper/ContentWrapper";
import { CategoriesNavigation } from "../../components/CategoriesNav/CategoriesNavigation";
import { OrderCheckDelivery } from "../../components/OrderCheckDelivery/OrderCheckDelivery";
import { CustomerForm } from "../../components/CustomerForm/CustomerForm";
import { DeliveryMethod } from "../../components/DeliveryMethod/DeliveryMethod";
import { Payment } from "../../components/Payment/Payment";
import { Button } from "../../components/Button/Button";
import { Input } from "../../components/Input/Input";
import { paths } from "../../paths";
import { Loader } from "../../components/Loader/Loader";

import {
  getAreas,
  getAllDepartments,
} from "../../store/deliveryAddresses/deliverySlice";

export const Delivery = () => {
  const dispatch = useDispatch();

  const cart = useSelector((state) => {
    return state.cartReducer.itemsInCart;
  });

  const { isLoading } = useSelector((state) => {
    return state.deliveryReducer;
  });

  const total = cart.reduce((acc, item) => {
    return acc + item.totalPrice;
  }, 0);

  useEffect(() => {
    dispatch(getAreas());
    dispatch(getAllDepartments());
  }, [dispatch]);

  if (isLoading) {
    return <Loader />;
  }

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
              <Payment />
              <div className={styles.comment}>
                <h5 className={styles.commentTitle}>
                  Можливо вам є що додати до вашого
                  замовлення
                </h5>
                <Input className={styles.input} />
              </div>
            </div>
            <OrderCheckDelivery total={total} cart={cart} />
          </div>
        </div>
        <Button
          children={
            <Link
              className={styles.btnLink}
              to={paths.order}>
              Перейти до оплати
            </Link>
          }
          containerClassName={styles.btn}
        />
      </ContentWrapper>
      <Footer />
    </React.Fragment>
  );
};
