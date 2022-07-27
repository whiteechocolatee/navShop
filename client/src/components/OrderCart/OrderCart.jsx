import React from "react";
import styles from "./orderCart.module.css";
import { useSelector } from "react-redux";
import { OrderCard } from "../OrderCard/OrderCard";
import { Link } from "react-router-dom";
import { paths } from "../../paths";

export const OrderCart = () => {
  const cart = useSelector((state) => {
    return state.cartReducer.itemsInCart;
  });

  const total = cart.reduce((acc, item) => {
    return acc + item.price;
  }, 0);

  return (
    <div className={styles.order}>
      {cart.length > 0 ? (
        <div>
          <h1>Сумма заказа : {total} uah</h1>
          {cart.map((item, index) => (
            <OrderCard
              key={index}
              title={item.title}
              itemImage={item.itemImage}
              price={item.price}
            />
          ))}
          <Link to={`${paths.order}/${paths.delivery}`}>
            Перейти к оформлению заказа
          </Link>
        </div>
      ) : (
        <h1>Упс.... Корзина пустая</h1>
      )}
    </div>
  );
};
