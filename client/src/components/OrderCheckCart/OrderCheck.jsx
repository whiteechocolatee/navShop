import React from "react";
import { Link, useNavigate } from "react-router-dom";

import styles from "./check.module.css";
import { Button } from "../Button/Button";
import { paths } from "../../paths";

export const OrderCheck = ({ total }) => {
  const navigate = useNavigate();

  return (
    <div className={styles.checkBody}>
      <h3 className={styles.checkTitle}>Інформація</h3>
      <div className={styles.checkInfo}>
        <hr className={styles.checkBorder} />
        <div>
          <p className={styles.total}>
            Приблизна вартість
            <span>
              <b>{total} ₴</b>
            </span>
          </p>
          <p className={styles.total}>
            Самовивіз (Харків)
            <span>
              <b>0 ₴</b>
            </span>
          </p>
          <p className={styles.total}>
            Підсумок
            <span>
              <b>{total} ₴</b>
            </span>
          </p>
        </div>
        <hr className={styles.checkBorder} />
      </div>
      <Button
        onClick={() => navigate(paths.delivery)}
        containerClassName={styles.btn}
        children={"Наступна"}
      />
    </div>
  );
};
