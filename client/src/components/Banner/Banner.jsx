import React, { useState } from "react";
import { Button } from "../Button/Button";
import { ContactUs } from "../Popups/ContactUs/ContactUs";
import styles from "./banner.module.css";

import oculusImg from "./img/oculus_banner.png";

export const Banner = () => {
  const [active, setActive] = useState(false);
  return (
    <div className={`container-fluid ${styles.banner}`}>
      <ContactUs active={active} setActive={setActive} />
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
              onClick={() => setActive(true)}
              containerClassName={styles.button}
              children={`Зв'язатися`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
