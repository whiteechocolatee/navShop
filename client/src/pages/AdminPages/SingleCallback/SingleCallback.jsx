import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import "moment/locale/uk";

import styles from "./singleCallback.module.css";
import { Navbar } from "../../../components/AdminNav/Navbar";
import { ContentWrapper } from "../../../components/contentWrapper/ContentWrapper";
import { Footer } from "../../../components/Footer/Footer";
import {
  getSingleCallback,
  updateCallbackData,
} from "../../../store/forms/formsSlice";
import { Loader } from "../../../components/Loader/Loader";
import { Button } from "../../../components/Button/Button";

export const SingleCallback = () => {
  const { id } = useParams();
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSingleCallback(id));
  }, [dispatch, id]);

  const { callbacks, isLoading } = useSelector(
    (state) => state.formReducer,
  );

  const addComment = () => {
    const callbackComment = {
      id: callbacks._id,
      commentary: {
        comment: comment,
        date: Date.now(),
      },
    };

    dispatch(updateCallbackData(callbackComment));
  };

  return (
    <>
      <Navbar />
      <ContentWrapper className={styles.wrapper}>
        {isLoading ? (
          <Loader containerClassName={styles.loader} />
        ) : (
          <>
            <h1>Дзвінки</h1>
            <div className={styles.callbackContainer}>
              <div className={styles.customerInfo}>
                <p>Імʼя : {callbacks?.name}</p>
                <p>
                  Телефон :
                  <a href={`tel:+${callbacks?.phone}`}>
                    {callbacks?.phone}
                  </a>
                </p>
              </div>
              <div className={styles.status}>
                <p>
                  Заявка створена :{" "}
                  <b>
                    {moment(callbacks?.createdAt).format(
                      "llll",
                    )}
                  </b>
                </p>
                <p>
                  Статус :{" "}
                  {callbacks && callbacks?.isCalled ? (
                    <span className={styles.called}>
                      Дзвонили
                    </span>
                  ) : (
                    <span className={styles.notCalled}>
                      не дзвонили
                    </span>
                  )}
                </p>
              </div>
            </div>
            <div className={styles.adminData}>
              <h4>Коментарі</h4>
              <textarea
                className={styles.commentaryInput}
                name='commentary'
                onChange={(e) => setComment(e.target.value)}
                rows='3'
              />
              <Button
                onClick={addComment}
                containerClassName={styles.btn}
                children='Зберегти'
              />
              {callbacks &&
              callbacks?.adminCommentary &&
              callbacks?.adminCommentary.length > 0 ? (
                <div className={styles.commentaryList}>
                  {callbacks?.adminCommentary.map(
                    (adminComment) => (
                      <div
                        className={styles.comment}
                        key={adminComment.id}>
                        <p>{adminComment.comment}</p>
                        <span>
                          {moment(adminComment.date).format(
                            "llll",
                          )}
                        </span>
                      </div>
                    ),
                  )}
                </div>
              ) : (
                <h3>Тут немає коментарів...</h3>
              )}
            </div>
          </>
        )}
      </ContentWrapper>
      <Footer />
    </>
  );
};
