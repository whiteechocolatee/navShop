import React from "react";
import styles from "./orderCart.module.css";
import { useSelector } from "react-redux";
import { OrderCard } from "../OrderCard/OrderCard";
import { Link } from "react-router-dom";
import { paths } from "../../paths";
import { OrderCheck } from "../OrderCheck/OrderCheck";

export const OrderCart = () => {
  const cart = useSelector((state) => {
    return state.cartReducer.itemsInCart;
  });

  const total = cart.reduce((acc, item) => {
    return acc + item.price;
  }, 0);

  return (
    <div className={styles.order}>
      <div className={styles.navigation}>
        <Link className={styles.link} to={paths.main}>
          Головна
        </Link>
        <hr className={styles.border} />
        <Link className={styles.link} to={paths.order}>
          Кошик
        </Link>
      </div>
      <div>
        <h1 className={styles.cartTitle}>Кошик</h1>
      </div>
      {cart.length > 0 ? (
        <div className={styles.orderInfo}>
          <div className={styles.orderCards}>
            <h3 className={styles.orderTitle}>
              Ваше замовлення
            </h3>
            <hr className={styles.orderBorder} />
            {cart.map((item) => (
              <OrderCard
                key={item._id}
                id={item._id}
                title={item.title}
                itemImage={item.itemImage}
                price={item.price}
              />
            ))}
          </div>
          <OrderCheck total={total} />
        </div>
      ) : (
        <h1 className={styles.emptyCart}>
          Ваш кошик пустий, додайте щось :)
        </h1>
      )}
    </div>
  );
};
