import React from "react";
import styles from "./check.module.css";
import { Button } from "../Button/Button";
import { Link } from "react-router-dom";
import { paths } from "../../paths";

export const OrderCheck = ({ total }) => {
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
        containerClassName={styles.btn}
        children={<Link className={styles.link} to={paths.delivery}>Наступна</Link>}
      />
    </div>
  );
};
