import React from "react";
import styles from "./userOrders.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUserOrders } from "../../store/order/orderSlice";
import { Loader } from "../Loader/Loader";
import { OrdersInProgress } from "../OrdersInProgress/OrdersInProgress";
import { CompletedOrder } from "../CompletedOrders/CompletedOrder";

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

  const ordersInProgress = orders?.filter((order) => {
    return order.isDelivered !== "Виконано";
  });

  const completedOrders = orders?.filter((order) => {
    return order.isDelivered === "Виконано";
  });

  console.log("in progress >>>", ordersInProgress);
  console.log("completed >>>", completedOrders);

  return (
    <div className={styles.orderContainer}>
      {orders.length > 0 ? (
        <div>
          <div className={styles.inProgress}>
            {ordersInProgress.map((order) => {
              return <OrdersInProgress order={order} />;
            })}
          </div>
          <div className={styles.completed}>
            {completedOrders.map((order) => {
              return <CompletedOrder order={order} />;
            })}
          </div>
        </div>
      ) : (
        <h1 className={styles.noOrdersTitle}>
          У вас немає замовлень :(
        </h1>
      )}
    </div>
  );
};
