import React from "react";
import styles from "./userOrders.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUserOrders } from "../../store/order/orderSlice";
import moment from "moment";
import "moment/locale/uk";
import { Loader } from "../Loader/Loader";
import { UserOrderCard } from "../UserOrdersCard/UserOrderCard";

export const Orders = () => {
  const dispatch = useDispatch();

  const { orders, isLoading } = useSelector(
    (state) => state.orderReducer,
  );

  useEffect(() => {
    dispatch(getUserOrders());
  }, [dispatch]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className={styles.orderContainer}>
      {orders.length > 0 ? (
        orders.map((order) => {
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
                  <span>
                    Сумма товарів: {order.totalPrice} ₴
                  </span>
                  <span>
                    Доставка:{" "}
                    {order.shippingAddress
                      .shippingMethod === "localPickup"
                      ? "Безкоштовно"
                      : "за тарифами пошти"}
                  </span>
                  <span>
                    До оплати:{" "}
                    {`${order.totalPrice} ₴ + доставка`}
                  </span>
                  <span>
                    Спосіб оплати: {order.paymentMethod}
                  </span>
                  <span>Оплачено: - </span>
                </div>
                <div className={styles.delivery}>
                  <p className={styles.deliveryTitle}>
                    <b>Доставка</b>
                  </p>
                  <span>
                    Спосіб доставки:{" "}
                    {order.shippingAddress.shippingMethod}
                  </span>
                  <span>
                    Адресса: {order.shippingAddress.region}{" "}
                    область ,{order.shippingAddress.city},{" "}
                    {order.shippingAddress.department},{" "}
                    {order.shippingAddress?.index}
                  </span>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <h1 className={styles.noOrdersTitle}>
          У вас немає замовлень :(
        </h1>
      )}
    </div>
  );
};
