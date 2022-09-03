import React from "react";
import { Button } from "../Button/Button";

import styles from "./banner.module.css";

import iphoneImg from "./img/iphoneBanner.png";
import { useNavigate } from "react-router-dom";
import { paths } from "../../paths";

export const BannerIphone = () => {
  const navigate = useNavigate();

  return (
    <div className={`container-fluid ${styles.bannerBody}`}>
      <div className={styles.newIphones}>
        <h1 className={styles.bannerTitle}>Нові iPhone</h1>
        <Button
          onClick={() =>
            navigate(`${paths.category}/smartphones`)
          }
          containerClassName={styles.btn}>
          Більше
        </Button>
      </div>
      <div className={styles.image}>
        <img src={iphoneImg} alt='iPhone' />
      </div>
    </div>
  );
};
