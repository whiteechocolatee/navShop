import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import "moment/locale/uk";

import styles from "./singleOrder.module.css";
import { Navbar } from "../../../components/AdminNav/Navbar";
import { ContentWrapper } from "../../../components/contentWrapper/ContentWrapper";
import { Loader } from "../../../components/Loader/Loader";
import { Footer } from "../../../components/Footer/Footer";

import {
  getSingleOrder,
  markAsDelivered,
} from "../../../store/order/orderSlice";
import { CheckCard } from "../../../components/CheckCard/CheckCard";
import { Button } from "../../../components/Button/Button";

export const SingleOrder = () => {
  window.scroll(0, 0);
  const { id } = useParams();
  const dispatch = useDispatch();

  const { orders, isLoading } = useSelector(
    (state) => state.orderReducer,
  );

  const { customerData, orderItems, shippingAddress } =
    orders;

  useEffect(() => {
    dispatch(getSingleOrder(id));
  }, [dispatch, id]);

  const handleUpdate = () => {
    dispatch(markAsDelivered(orders?._id));
  };

  return (
    <>
      <Navbar />
      <ContentWrapper className={styles.contentWrapper}>
        {isLoading ? (
          <Loader containerClassName={styles.loader} />
        ) : (
          <>
            <h1>Замовлення</h1>
            <div className={styles.orderContainer}>
              <div className={styles.orderHeader}>
                <div className={styles.customerInfo}>
                  <p>{customerData?.name}</p>
                  <p>{customerData?.surname}</p>
                  <p>
                    <a href={`tel:+${customerData?.phone}`}>
                      {customerData?.phone}
                    </a>
                  </p>
                  <p>
                    <a
                      href={`mailto:${customerData?.email}`}>
                      {customerData?.email}
                    </a>
                  </p>
                </div>
                <div className={styles.orderMainInfo}>
                  <p>
                    Створений:{" "}
                    <b>
                      {moment(orders?.createdAt).format(
                        "LLLL",
                      )}
                    </b>
                  </p>
                  {orders?.createdAt ===
                  orders?.updatedAt ? (
                    <p>Не оброблений</p>
                  ) : (
                    <p>
                      Оброблений :
                      <b>
                        {moment(orders?.updatedAt).format(
                          "LLLL",
                        )}
                      </b>
                    </p>
                  )}
                  <p>
                    Загальна вартість:{" "}
                    <b> {orders?.totalPrice}</b>
                  </p>
                </div>
                <div className={styles.deliveryInfo}>
                  <p>
                    {shippingAddress?.shippingMethod ===
                    "localPickup"
                      ? "Самовивіз"
                      : "Доставка поштою"}
                  </p>
                  <p>Місто: {shippingAddress?.city}</p>
                  <p>Область: {shippingAddress?.region}</p>
                  <p>
                    Відділення:{" "}
                    {shippingAddress?.department}
                  </p>
                  <p>{shippingAddress?.index}</p>
                </div>
              </div>
              <div className={styles.orderBody}>
                <div className={styles.orderItems}>
                  {orderItems?.map((orderItem) => (
                    <CheckCard
                      key={orderItem._id}
                      alt={orderItem.name}
                      publicId={orderItem.image}
                      count={orderItem.count}
                      price={orderItem.price}
                      title={orderItem.name}
                      discount={orderItem.discount}
                    />
                  ))}
                </div>
                <div className={styles.orderStatus}>
                  <div className={styles.commentary}>
                    <b> Коментарій до замовлення :</b>
                    <p>
                      {orders?.commentary?.length > 1
                        ? orders?.commentary
                        : "Немає"}
                    </p>
                  </div>
                  <div>
                    {orders?.isDelivered === false ? (
                      <Button
                        onClick={handleUpdate}
                        containerClassName={styles.btn}>
                        <span>Відмітити як оброблений</span>
                      </Button>
                    ) : (
                      <Button
                        containerClassName={`${styles.btn} ${styles.disabled}`}>
                        <span>Вже оброблено</span>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </ContentWrapper>
      <Footer />
    </>
  );
};
