import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import "moment/locale/uk";
import { BsEye } from "react-icons/bs";

import styles from "./orders.module.css";
import { Navbar } from "../../../components/AdminNav/Navbar";
import { ContentWrapper } from "../../../components/contentWrapper/ContentWrapper";
import { Footer } from "../../../components/Footer/Footer";

import { getOrders } from "../../../store/order/orderSlice";
import { Link } from "react-router-dom";
import { paths } from "../../../paths";
import { Loader } from "../../../components/Loader/Loader";
import { Input } from "../../../components/Input/Input";
import { Button } from "../../../components/Button/Button";

export const AdminOrders = () => {
  window.scroll(0, 0);
  const dispatch = useDispatch();

  const [date, setDate] = useState({
    fDay: "",
    fMonth: "",
    fYear: "",
    toDay: "",
    toMonth: "",
    toYear: "",
  });

  const { orders, isLoading } = useSelector((state) => {
    return state.orderReducer;
  });

  console.log(orders);

  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  // const today = Date.now();

  return (
    <>
      <Navbar />
      <ContentWrapper className={styles.wrapper}>
        {isLoading ? (
          <Loader containerClassName={styles.loader} />
        ) : (
          <>
            <h1>Замовлення</h1>
            <div className={styles.filter}>
              {/* Сьогодні : {moment(today).format("L")} */}
              <div className={styles.searchSince}>
                <span>Знайти від :</span>
                <div className={styles.searchSinceInput}>
                  <Input
                    value={date.fDay}
                    placeholder='ДД'
                  />
                </div>
                <div className={styles.searchSinceInput}>
                  <Input placeholder='ММ' />
                </div>
                <div className={styles.searchSinceInput}>
                  <Input placeholder='РРРР' />
                </div>
              </div>
              <div className={styles.searchTo}>
                <span>Знайти до :</span>
                <div className={styles.searchSinceInput}>
                  <Input placeholder='ДД' />
                </div>
                <div className={styles.searchSinceInput}>
                  <Input placeholder='ММ' />
                </div>
                <div className={styles.searchSinceInput}>
                  <Input placeholder='РРРР' />
                </div>
              </div>
              <Button
                containerClassName={styles.btn}
                children='Пошук'
              />
            </div>
            <table
              className={`table table-hover ${styles.table}`}>
              <thead>
                <tr>
                  <th scope='col'>Ім'я</th>
                  <th scope='col'>Пошта</th>
                  <th scope='col'>Сума</th>
                  <th scope='col'>Дата</th>
                  <th scope='col'>Статус</th>
                  <th scope='col'>Дія</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(orders) &&
                  orders?.map((order) => (
                    <tr>
                      <td>{order?.customerData?.name}</td>
                      <td>{order?.customerData?.email}</td>
                      <td>{order?.totalPrice} ₴</td>
                      <td>
                        {moment(order.createdAt).format(
                          "LLLL",
                        )}
                      </td>
                      <td>
                        {order?.isDelivered
                          ? "Відправлено"
                          : "Не відправлено"}{" "}
                      </td>
                      <td>
                        <Link
                          to={`${paths.admin}/order/${order._id}`}>
                          <BsEye />
                        </Link>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </>
        )}
      </ContentWrapper>
      <Footer />
    </>
  );
};
