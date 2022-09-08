import React from "react";
import styles from "./userOrders.module.css";
import { useSelector } from "react-redux";
import { Loader } from "../Loader/Loader";
import { OrdersInProgress } from "../OrdersInProgress/OrdersInProgress";
import { CompletedOrder } from "../CompletedOrders/CompletedOrder";

export const Orders = () => {
  const { orders, isLoading } = useSelector(
    (state) => state.orderReducer,
  );

  return (
    <div className={styles.orderContainer}>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          {orders?.length !== 0 ? (
            <div>
              <div className={styles.inProgress}>
                {orders
                  ?.filter((order) => {
                    return order.isDelivered === false;
                  })
                  .map((order) => {
                    return (
                      <OrdersInProgress
                        key={order._id}
                        order={order}
                      />
                    );
                  })}
              </div>
              <div className={styles.completed}>
                {orders
                  ?.filter((order) => {
                    return order.isDelivered === true;
                  })
                  .map((order) => {
                    return (
                      <CompletedOrder
                        key={order._id}
                        order={order}
                      />
                    );
                  })}
              </div>
            </div>
          ) : (
            <h1 className={styles.noOrdersTitle}>
              У вас немає замовлень :(
            </h1>
          )}
        </div>
      )}
    </div>
  );
};
