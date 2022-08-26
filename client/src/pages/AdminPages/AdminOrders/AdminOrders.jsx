import React, {
  useEffect,
  useState,
  useCallback,
} from "react";
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
    day: "",
    month: "",
    year: "",
  });

  const [filteredOrders, setFilteredOrders] = useState([]);

  const { orders, isLoading } = useSelector((state) => {
    return state.orderReducer;
  });

  const selectedOrders =
    filteredOrders.length === 0 ? orders : filteredOrders;

  const handleSearch = useCallback(() => {
    const findByDate = `${date.day}.${date.month}.${date.year}`;

    const filterByDate = orders.filter((order) => {
      return (
        moment(order.createdAt).format("L") === findByDate
      );
    });

    setFilteredOrders(filterByDate);
  }, [date.day, date.month, date.year, orders]);

  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

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
              <div className={styles.searchSince}>
                <span>Знайти замовлення від:</span>
                <div className={styles.searchSinceInput}>
                  <Input
                    onChange={(e) =>
                      setDate({
                        ...date,
                        day: e.target.value,
                      })
                    }
                    maxLength={2}
                    name='day'
                    value={date.day}
                    placeholder='ДД'
                  />
                </div>
                <div className={styles.searchSinceInput}>
                  <Input
                    onChange={(e) =>
                      setDate({
                        ...date,
                        month: e.target.value,
                      })
                    }
                    maxLength={2}
                    name='month'
                    value={date.month}
                    placeholder='ММ'
                  />
                </div>
                <div className={styles.searchSinceInput}>
                  <Input
                    onChange={(e) =>
                      setDate({
                        ...date,
                        year: e.target.value,
                      })
                    }
                    maxLength={4}
                    name='year'
                    value={date.year}
                    placeholder='РРРР'
                  />
                </div>
              </div>
              <div className={styles.btns}>
                <Button
                  containerClassName={styles.btn}
                  children='Пошук'
                  onClick={handleSearch}
                />
                <Button
                  containerClassName={styles.btn}
                  children='Скинути фільтри'
                  onClick={() => {
                    setFilteredOrders([]);
                    setDate({
                      day: "",
                      month: "",
                      year: "",
                    });
                  }}
                />
              </div>
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
                  selectedOrders?.map((order) => (
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
                        {order?.isDelivered ? (
                          <span
                            className={
                              styles.alreadyDelivered
                            }>
                            Відправлено
                          </span>
                        ) : (
                          <span
                            className={styles.notDelivered}>
                            Hе відправлено
                          </span>
                        )}
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
