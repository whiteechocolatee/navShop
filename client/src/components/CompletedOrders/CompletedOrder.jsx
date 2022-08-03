import React from "react";
import styles from "./completed.module.css";
import moment from "moment";
import "moment/locale/uk";

export const CompletedOrder = ({ order }) => {
  return (
    <div className={styles.completedOrder}>
      <div className={styles.orderDetails}>
        <span>
          {order._id} від{" "}
          {moment(order.createdAt).format("L")}
        </span>
        <span className={styles.isDelivery}>
          {order.isDelivered}
        </span>
      </div>
      <div className={styles.orderPrice}>
        <span>Загальна вартість</span>
        <span className={styles.isDelivery}>
          {order.totalPrice} ₴
        </span>
      </div>
      <div className={styles.repeatOrder}>
        <div className={styles.repeat}>
          Повторити замовлення
        </div>
      </div>
    </div>
  );
};
