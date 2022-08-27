import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import styles from "./singleCallback.module.css";
import { Navbar } from "../../../components/AdminNav/Navbar";
import { ContentWrapper } from "../../../components/contentWrapper/ContentWrapper";
import { Footer } from "../../../components/Footer/Footer";
import { getSingleCallback } from "../../../store/forms/formsSlice";

export const SingleCallback = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSingleCallback(id));
  }, [dispatch, id]);

  const { callbacks, isLoading } = useSelector(
    (state) => state.formReducer,
  );

  return (
    <>
      <Navbar />
      <ContentWrapper className={styles.wrapper}>
        <>
          <h1>Дзвінки</h1>
        </>
      </ContentWrapper>
      <Footer />
    </>
  );
};
