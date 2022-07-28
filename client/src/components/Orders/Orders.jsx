import React from "react";
import styles from "./userOrders.module.css";
import { useDispatch, useSelector } from "react-redux";
import { ContentWrapper } from "../contentWrapper/ContentWrapper";
import { useEffect } from "react";
import { getUserOrders } from "../../store/order/orderSlice";
import { AiOutlineEye } from "react-icons/ai";
import moment from "moment";

export const Orders = () => {
  const dispatch = useDispatch();

  const order = useSelector(
    (state) => state.orderReducer.order,
  );

  console.log(order);

  useEffect(() => {
    dispatch(getUserOrders());
  }, [dispatch]);

  return (
    <ContentWrapper>
      <h1>Ваші замовлення</h1>
      <div className={styles.orders}>
        {order.map((item) => (
          <div className={styles.order}>
            <span>{item._id}</span>
            <span>
              {moment(item.createdAt).format("LL")}
            </span>
            <span>{item.totalPrice}</span>
            <span>
              <AiOutlineEye />
            </span>
          </div>
        ))}
      </div>
    </ContentWrapper>
  );
};
