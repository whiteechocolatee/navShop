import React from "react";
import { Button } from "../../components/Button/Button";
import styles from "./error.module.css";
import { Link } from "react-router-dom";

export const Error = () => {
  return (
    <div className={styles.errorBlock}>
      <div class={styles.main}>
        <div class={styles.head}>
          <h1>404</h1>
          <h2>Страница не найдена</h2>
          <Link className={styles.btnBack} to={"/"}>
            {`>>> Вернуться на главную <<<`}
          </Link>
        </div>
      </div>
    </div>
  );
};
