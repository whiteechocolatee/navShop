import React from "react";
import { Button } from "../Button/Button";
import styles from "./banner.module.css";

import oculusImg from "./img/oculus_banner.png";

export const Banner = () => {
  return (
    <div className={`container-fluid ${styles.banner}`}>
      <div className={styles.bannerContent}>
        <h1 className={styles.title}>Замовити товар</h1>
        <div className={styles.offer}>
          <img
            src={oculusImg}
            className={styles.bannerImg}
            alt='bannerImage'
          />
          <div className={styles.offerText}>
            <h6 className={styles.offerTitle}>
              Спеціальні пропозиції тільки на сайті
            </h6>
            <Button
              containerClassName={styles.button}
              children={`Зв'язатися`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
