import React from "react";

import { ContentWrapper } from "../contentWrapper/ContentWrapper";

import styles from "./brands.module.css";

import nikon from "./img/nikon.svg";

import {
  FaApple,
  FaPlaystation,
  FaXbox,
} from "react-icons/fa";
import {
  SiIntel,
  SiSamsung,
  SiXiaomi,
} from "react-icons/si";

export const Brands = () => {
  return (
    <ContentWrapper>
      <div className={`${styles.logos} mt-5 mb-5`}>
        <div className={styles.logo}>
          <FaApple />
        </div>
        <div className={`${styles.logo} ${styles.samsung}`}>
          <SiSamsung />
        </div>
        <div className={styles.logo}>
          <SiXiaomi />
        </div>
        <div className={styles.logo}>
          <FaPlaystation />
        </div>
        <div className={styles.logo}>
          <FaXbox />
        </div>
        <div className={`${styles.logo} ${styles.nikon}`}>
          <img src={nikon} alt='nikon' />
        </div>
        <div className={styles.logo}>
          <SiIntel />
        </div>
      </div>
    </ContentWrapper>
  );
};
