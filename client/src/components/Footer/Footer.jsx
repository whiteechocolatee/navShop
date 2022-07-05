import React from "react";
import { ContentWrapper } from "../contentWrapper/ContentWrapper";
import styles from "./footer.module.css";
import {
  FaInstagram,
  FaTelegramPlane,
  FaFacebook,
} from "react-icons/fa";

export const Footer = () => {
  return (
    <div
      className={`container-fluid fixed-bottom ${styles.footer}`}>
      <ContentWrapper>
        <div className={styles.aboutUs}>
          <div className={styles.networks}>
            HERE WILL BE LOGO
            <div className={styles.socials}>
              <FaInstagram />
              <FaTelegramPlane />
              <FaFacebook />
            </div>
          </div>
          <div className={styles.contact}></div>
          <div className={styles.menu}></div>
        </div>
      </ContentWrapper>
    </div>
  );
};
