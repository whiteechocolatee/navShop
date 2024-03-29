import React from "react";
import styles from "./inProgress.module.css";
import { UserOrderCard } from "../UserOrdersCard/UserOrderCard";

import moment from "moment";
import "moment/locale/uk";

export const OrdersInProgress = ({ order }) => {
  return (
    <div key={order._id} className={styles.orders}>
      <div className={styles.orderInfo}>
        <div className={styles.orderDetails}>
          <span>
            {order._id} від{" "}
            {moment(order.createdAt).format("L")}
          </span>
          <span className={styles.isDelivery}>
            {order.isDelivered}
          </span>
        </div>
        <div className={styles.orderItems}>
          {order.orderItems.map((item) => (
            <UserOrderCard
              key={item._id}
              id={item._id}
              title={item.name}
              itemImage={item.image}
              price={item.price}
              count={item.count}
              totalPrice={item.totalPrice}
            />
          ))}
        </div>
      </div>
      <div className={styles.deliveryDetails}>
        <div className={styles.payment}>
          <p className={styles.paymentTitle}>
            <b>Оплата</b>
          </p>
          <span>Сумма товарів: {order.totalPrice} ₴</span>
          <span>
            Доставка:{" "}
            {order.shippingAddress.shippingMethod ===
            "localPickup"
              ? "Безкоштовно"
              : "згідно з тарифами пошти"}
          </span>
          <span>
            До cплати: {order.totalPrice} ₴
            {order.shippingAddress.shippingMethod ===
            "localPickup"
              ? ""
              : "+ доставка за тарифами пошти"}
          </span>
          <span>
            Спосіб оплати:{" "}
            {order.paymentMethod === "cardPayment"
              ? "Карткою"
              : "Готівкою"}
          </span>
          <span>Cплачено: - </span>
        </div>
        <div className={styles.delivery}>
          <p className={styles.deliveryTitle}>
            <b>Доставка</b>
          </p>
          <span>
            Спосіб доставки:{" "}
            {order.shippingAddress.shippingMethod ===
            "localPickup"
              ? "Самовивіз"
              : "Доставка поштою"}
          </span>
          <span>
            Адресса: {order.shippingAddress.region} область
            ,{order.shippingAddress.city},{" "}
            {order.shippingAddress.department},{" "}
            {order.shippingAddress?.index}
          </span>
        </div>
      </div>
    </div>
  );
};
