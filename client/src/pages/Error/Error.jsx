import React from "react";
import styles from "./error.module.css";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../components/Button/Button";

export const Error = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.errorBlock}>
      <div class={styles.main}>
        <div class={styles.head}>
          <h1>404</h1>
          <h2>
            <Button
              className={styles.btnBack}
              onClick={() => navigate(-1)}>
              Вернуться назад
            </Button>
          </h2>
        </div>
      </div>
    </div>
  );
};
