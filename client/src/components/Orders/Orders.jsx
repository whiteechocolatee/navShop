import React from "react";
import styles from "./userOrders.module.css";
import { useDispatch, useSelector } from "react-redux";
import { ContentWrapper } from "../contentWrapper/ContentWrapper";
import { useEffect } from "react";
import { getUserOrders } from "../../store/order/orderSlice";
import { AiOutlineEye } from "react-icons/ai";
import moment from "moment";
import { Loader } from "../Loader/Loader";

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
    <ContentWrapper>
      <h1>Ваші замовлення</h1>
      <div className={styles.orders}>
        {orders.length > 0
          ? orders.map((item) => (
              <div key={item._id} className={styles.order}>
                <span>{item._id}</span>
                <span>
                  {moment(item.createdAt).format("LL")}
                </span>
                <span>{item.totalPrice}</span>
                <span>
                  <AiOutlineEye />
                </span>
              </div>
            ))
          : <h4>У вас немає замовлень.</h4>}
      </div>
    </ContentWrapper>
  );
};
