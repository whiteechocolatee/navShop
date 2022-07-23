import React from "react";
import styles from "./orderInfo.module.css";
import { useSelector } from "react-redux";
import { OrderCard } from "../OrderCard/OrderCard";

export const OrderInfo = () => {
  const cart = useSelector((state) => {
    return state.cartReducer.itemsInCart;
  });

  const total = cart.reduce((acc, item) => {
    return acc + item.price;
  }, 0);

  return (
    <div className={styles.order}>
      <h1>Сумма заказа : {total} uah</h1>
      {cart.length > 0 ? (
        cart.map((item, index) => (
          <OrderCard
            key={index}
            title={item.title}
            itemImage={item.itemImage}
            price={item.price}
          />
        ))
      ) : (
        <h1>Упс.... Корзина пустая</h1>
      )}
    </div>
  );
};
