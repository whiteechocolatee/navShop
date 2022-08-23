import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  MdPointOfSale,
  MdProductionQuantityLimits,
} from "react-icons/md";
import { BsFillBasket3Fill } from "react-icons/bs";

import styles from "./mainAdmin.module.css";
import { Navbar } from "../../../components/AdminNav/Navbar";
import { ContentWrapper } from "../../../components/contentWrapper/ContentWrapper";
import { Footer } from "../../../components/Footer/Footer";
import { AnnualReport } from "../../../components/Charts/AnnualReport/AnnualReport";
import { Loader } from "../../../components/Loader/Loader";
import { StatisticBlock } from "./StatisticBlocks/StatisticBlock";
import { MonthlyReport } from "../../../components/Charts/MonthlyReport/MonthlyReport";
import moment from "moment";
import "moment/locale/uk";

import { getOrders } from "../../../store/order/orderSlice";
import { getItems } from "../../../store/items/itemsSlice";
import { getCallbacks } from "../../../store/forms/formsSlice";
import { Link } from "react-router-dom";

export const MainAdmin = () => {
  window.scroll(0, 0);
  const dispatch = useDispatch();

  const { orders, isLoading } = useSelector((state) => {
    return state.orderReducer;
  });

  const { callbacks } = useSelector((state) => {
    return state.formReducer;
  });

  let needToCall = callbacks?.filter(
    (callback) => callback.isCalled === false,
  );

  let cuttedArr = needToCall.slice(0, 5);

  const { items } = useSelector((state) => {
    return state.itemsReducer;
  });

  const totalOrders = orders?.length;
  const totalItems = items?.length;
  const totalSales = orders.reduce((prev, item) => {
    return prev + item.totalPrice;
  }, 0);

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

  useEffect(() => {
    dispatch(getOrders());
    dispatch(getItems());
    dispatch(getCallbacks());
  }, [dispatch]);

  return (
    <>
      <Navbar />
      <ContentWrapper className={styles.contentWrapper}>
        {isLoading ? (
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
              </div>
              <div className={styles.callbacks}>
                <h3>Чекають на дзвінок</h3>
                {cuttedArr?.map((callback) => {
                  return (
                    <div className={styles.callback}>
                      <span>
                        <b>{callback.name}</b>
                      </span>
                      <span>
                        <b>
                          <a
                            href={`tel:+${callback.phone}`}>
                            {callback.phone}
                          </a>
                        </b>
                      </span>
                      <span>
                        {moment(callback.createdAt).format(
                          "L",
                        )}
                      </span>
                    </div>
                  );
                })}
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
