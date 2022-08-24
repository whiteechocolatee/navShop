import React, { useEffect, useState } from "react";
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
import { Loader } from "../../components/Loader/Loader";
import { paths } from "../../paths";
import { AuthCustomerForm } from "../../components/AuthCustomerForm/AuthCustomerForm";

import {
  checkIsAuth,
  userProfile,
} from "../../store/users/userAuthSlice";
import { createOrder } from "../../store/order/orderSlice";

export const Delivery = () => {
  const dispatch = useDispatch();

  const isAuth = useSelector(checkIsAuth);

  const { user, isLoading } = useSelector(
    (state) => state.userAuthReducer,
  );

  let obj;

  user?.addresses?.filter((address) => {
    if (address.main === "yes") {
      obj = address;
    }
  });

  const unregisteredUser = JSON.parse(
    sessionStorage.getItem("buyPerClick"),
  );

  const [values, setValues] = useState({
    name: user?.name || unregisteredUser?.name || "",
    surname:
      user?.surname || unregisteredUser?.surname || "",
    phone:
      user?.phoneNumber || unregisteredUser?.phone || "",
    email: user?.email || unregisteredUser?.email || "",
    shippingMethod: "localPickup",
    area: obj?.area || "Виберіть область",
    city: obj?.city || "Виберіть місто",
    index: obj?.index || "",
    department: obj?.department || "Виберіть відділення",
    street: obj?.street || "",
    paymentMethod: "cardPayment",
    commentary: "",
  });

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    dispatch(userProfile());
  }, [dispatch]);

  const cart = useSelector((state) => {
    return state.cartReducer.itemsInCart;
  });

  const total = cart.reduce((acc, item) => {
    return acc + item.totalPrice;
  }, 0);

  const orderCart = [];

  cart.map((item) => {
    return orderCart.push({
      name: item.title,
      image: item.itemImage,
      price: item.price,
      count: item.count,
      totalPrice: item.totalPrice,
      product: item._id,
      discount: item.discount,
    });
  });

  const order = {
    orderItems: orderCart,
    shippingAddress: {
      shippingMethod: values.shippingMethod,
      region:
        values.shippingMethod === "localPickup"
          ? "Харківська"
          : values.area,
      city:
        values.shippingMethod === "localPickup"
          ? "Харків"
          : values.city,
      department:
        values.shippingMethod === "localPickup"
          ? "ТРК 'Клас' (Проспект Тракторобудівників, 128в) , другий поверх."
          : values.department,
      index:
        values.shippingMethod === "localPickup"
          ? "61000"
          : values.index,
    },
    customerData: {
      name: values.name,
      email: values.email,
      surname: values.surname,
      phone: values.phone,
    },
    totalPrice: total,
    paymentMethod: values.paymentMethod,
    commentary: values.commentary,
  };

  const handleOrder = () => {
    dispatch(createOrder(order));
  };

  return (
    <React.Fragment>
      <Header />
      <CategoriesNavigation />
      {isLoading ? (
        <Loader containerClassName={styles.loader} />
      ) : (
        <ContentWrapper className={styles.wrapper}>
          <div className={styles.deliveryPayment}>
            <div className={styles.navigation}>
              <Link className={styles.link} to={paths.main}>
                Головна
              </Link>
              <hr className={styles.border} />
              <Link
                className={styles.link}
                to={paths.order}>
                Кошик
              </Link>
              <hr className={styles.border} />
              <Link
                className={styles.link}
                to={paths.order}>
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
                {isAuth ? (
                  <AuthCustomerForm values={values} />
                ) : (
                  <CustomerForm
                    values={values}
                    handleChange={handleChange}
                  />
                )}
                <DeliveryMethod
                  values={values}
                  handleChange={handleChange}
                />
                <Payment
                  values={values}
                  handleChange={handleChange}
                />
                <div className={styles.comment}>
                  <h5 className={styles.commentTitle}>
                    Можливо вам є що додати до вашого
                    замовлення
                  </h5>
                  <Input
                    name='commentary'
                    onChange={handleChange}
                    className={styles.input}
                  />
                </div>
                <div className={styles.btnContainer}>
                  <Button
                    onClick={handleOrder}
                    children={"Замовити!"}
                    containerClassName={styles.btn}
                  />
                </div>
              </div>
              <div className={styles.deliveryCart}>
                <OrderCheckDelivery
                  total={total}
                  cart={cart}
                />
              </div>
            </div>
          </div>
        </ContentWrapper>
      )}

      <Footer />
    </React.Fragment>
  );
};
