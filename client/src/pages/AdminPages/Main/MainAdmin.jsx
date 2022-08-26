import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  MdPointOfSale,
  MdProductionQuantityLimits,
} from "react-icons/md";
import { BsFillBasket3Fill, BsEye } from "react-icons/bs";
import moment from "moment";
import "moment/locale/uk";

import styles from "./mainAdmin.module.css";
import { Navbar } from "../../../components/AdminNav/Navbar";
import { ContentWrapper } from "../../../components/contentWrapper/ContentWrapper";
import { Footer } from "../../../components/Footer/Footer";
import { AnnualReport } from "../../../components/Charts/AnnualReport/AnnualReport";
import { Loader } from "../../../components/Loader/Loader";
import { StatisticBlock } from "./StatisticBlocks/StatisticBlock";
import { MonthlyReport } from "../../../components/Charts/MonthlyReport/MonthlyReport";

import { getOrders } from "../../../store/order/orderSlice";
import { getItems } from "../../../store/items/itemsSlice";
import { getCallbacks } from "../../../store/forms/formsSlice";
import { Link } from "react-router-dom";

export const MainAdmin = () => {
  window.scroll(0, 0);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrders());
    dispatch(getItems());
    dispatch(getCallbacks());
  }, [dispatch]);

  const { orders, isLoading } = useSelector((state) => {
    return state.orderReducer;
  });

  const { callbacks } = useSelector((state) => {
    return state.formReducer;
  });

  let needToCall = callbacks?.filter(
    (callback) => callback.isCalled === false,
  );

  let needToDeliver = Array.isArray(orders)
    ? orders?.filter((order) => order.isDelivered === false)
    : [];

  let recentCallbacks = needToCall.slice(0, 5);

  let recentOrders = needToDeliver.slice(0, 5);

  const { items } = useSelector((state) => {
    return state.itemsReducer;
  });

  const totalOrders = orders?.length;
  const totalItems = items?.length;
  const totalSales = Array.isArray(orders)
    ? orders
        ?.filter((order) => order.isDelivered === true)
        .reduce((prev, item) => {
          return prev + item.totalPrice;
        }, 0)
    : [];

  const statisticBlocks = [
    {
      id: 1,
      title: "Загальні продажі ₴",
      cName: styles.totalSales,
      svg: <MdPointOfSale />,
      data: totalSales,
    },
    {
      id: 2,
      title: "Загальна кількість замовлень",
      cName: styles.totalOrders,
      svg: <BsFillBasket3Fill />,
      data: totalOrders,
    },
    {
      id: 3,
      title: "Загальні кількість товарів",
      cName: styles.totalItems,
      svg: <MdProductionQuantityLimits />,
      data: totalItems,
    },
  ];

  return (
    <>
      <Navbar />
      <ContentWrapper className={styles.contentWrapper}>
        {isLoading && orders ? (
          <Loader containerClassName={styles.loader} />
        ) : (
          <>
            <h1>Головна</h1>
            <div className={styles.statisticNav}>
              {statisticBlocks.map((item, index) => {
                return (
                  <StatisticBlock
                    key={index}
                    svg={item.svg}
                    title={item.title}
                    cName={item.cName}
                    data={item.data}
                  />
                );
              })}
            </div>
            <div className={styles.chartNav}>
              <div className={styles.ordersChart}>
                <AnnualReport />
              </div>
              <div className={styles.ordersChart}>
                <MonthlyReport />
              </div>
            </div>
            <div className={styles.requests}>
              <div className={styles.orders}>
                <h3>Чекають на відправлення</h3>
                {needToDeliver?.length > 0 ? (
                  <table
                    className={`table table-striped ${styles.table}`}>
                    <thead>
                      <tr>
                        <th scope='col'>Ім'я</th>
                        <th scope='col'>
                          Сумма замовлення
                        </th>
                        <th scope='col'>Дата створення</th>
                        <th scope='col'>Переглянути</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentOrders.map((order) => (
                        <tr>
                          <td>{order.customerData.name}</td>
                          <td>{order.totalPrice} ₴</td>
                          <td>
                            {moment(order.createdAt).format(
                              "L",
                            )}
                          </td>
                          <td>
                            <Link to={`order/${order._id}`}>
                              <BsEye />
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <h4 className={styles.empty}>
                    Наразі таких замовлень нема :(
                  </h4>
                )}
                <p className={styles.more}>
                  <Link to={`recent-orders`}>
                    Дивитись усі
                  </Link>
                </p>
              </div>
              <div className={styles.callbacks}>
                <h3>Чекають на дзвінок</h3>
                <table
                  className={`table table-striped ${styles.table}`}>
                  <thead>
                    <tr>
                      <th scope='col'>Ім'я</th>
                      <th scope='col'>Телефон</th>
                      <th scope='col'>Дата звернення</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentCallbacks?.map((callback) => {
                      return (
                        <tr>
                          <td>{callback.name}</td>
                          <td>
                            {" "}
                            <a
                              href={`tel:+${callback.phone}`}>
                              {callback.phone}
                            </a>{" "}
                          </td>
                          <td>
                            {moment(
                              callback.createdAt,
                            ).format("L")}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                {needToCall.length > 5 ? (
                  <p className={styles.more}>
                    <Link to='#'>Дивитись усі</Link>
                  </p>
                ) : null}
              </div>
            </div>
          </>
        )}
      </ContentWrapper>
      <Footer />
    </>
  );
};
