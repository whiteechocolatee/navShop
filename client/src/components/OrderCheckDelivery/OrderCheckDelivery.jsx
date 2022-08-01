import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../Button/Button";
import styles from "./order.module.css";
import { paths } from "../../paths";
import { CheckCard } from "../CheckCard/CheckCard";

export const OrderCheckDelivery = ({ total, cart }) => {
  return (
    <div>
      <h3 className={styles.checkTitle}>Ваше замовлення</h3>
      <div className={styles.checkBody}>
        {cart.map((product) => (
          <CheckCard
            alt={product.title}
            publicId={product.itemImage}
            price={product.price}
            count={product.count}
            title={product.title}
          />
        ))}
        <div className={styles.checkTotal}>
          <div>
            <p className={styles.total}>
              Приблизна вартість
              <span>
                <b>{total} ₴</b>
              </span>
            </p>
            <p className={styles.total}>
              Самовивіз (Харків)
              <span>
                <b>0 ₴</b>
              </span>
            </p>
            <p className={styles.total}>
              Підсумок
              <span>
                <b>{total} ₴</b>
              </span>
            </p>
          </div>
          <Button
            className={styles.btnBg}
            containerClassName={styles.btn}
            children={
              <Link
                to={paths.order}
                className={styles.link}>
                Редагувати
              </Link>
            }
          />
        </div>
      </div>
    </div>
  );
};
