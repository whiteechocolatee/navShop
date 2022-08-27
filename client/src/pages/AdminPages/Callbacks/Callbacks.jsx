import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import "moment/locale/uk";
import { Link } from "react-router-dom";
import { BsEye } from "react-icons/bs";

import styles from "./callbacks.module.css";
import { Navbar } from "../../../components/AdminNav/Navbar";
import { ContentWrapper } from "../../../components/contentWrapper/ContentWrapper";
import { Footer } from "../../../components/Footer/Footer";
import { Loader } from "../../../components/Loader/Loader";

import { getCallbacks } from "../../../store/forms/formsSlice";

export const Callbacks = () => {
  window.scroll(0, 0);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCallbacks());
  }, [dispatch]);

  const { callbacks, isLoading } = useSelector(
    (state) => state.formReducer,
  );

  return (
    <>
      <Navbar />
      <ContentWrapper className={styles.wrapper}>
        {isLoading ? (
          <Loader containerClassName={styles.loader} />
        ) : (
          <>
            <h1>Дзвінки</h1>
            <table
              className={`table table-hover ${styles.table}`}>
              <thead>
                <tr>
                  <th scope='col'>Ім'я</th>
                  <th scope='col'>Номер</th>
                  <th scope='col'>Дата</th>
                  <th scope='col'>Статус</th>
                  <th scope='col'>Коментар</th>
                  <th scope='col'>Дія</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(callbacks) &&
                  callbacks?.map((callback) => (
                    <tr>
                      <td>{callback?.name}</td>
                      <td>{callback?.phone}</td>
                      <td>
                        {moment(callback?.createdAt).format(
                          "L",
                        )}
                      </td>
                      <td>
                        {callback?.isCalled ? (
                          <span
                            className={
                              styles.alreadyDelivered
                            }>
                            Продзвонено
                          </span>
                        ) : (
                          <span
                            className={styles.notDelivered}>
                            Hе продзвонено
                          </span>
                        )}
                      </td>
                      <td>
                        {callback &&
                        callback?.adminCommentary ? (
                          <span
                            className={
                              styles.alreadyDelivered
                            }>
                            Є коментар
                          </span>
                        ) : (
                          <span
                            className={styles.notDelivered}>
                            Hемае коментарів
                          </span>
                        )}
                      </td>
                      <td>
                        <Link to={`${callback?._id}`}>
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
