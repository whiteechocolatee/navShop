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
      className={`container-fluid overflow-auto fixed-bottom ${styles.footer}`}>
      <ContentWrapper className={styles.wrapper}>
        <div
          className={`d-flex justify-content-lg-between ${styles.aboutUs}`}>
          <div
            className={`d-flex justify-content-between flex-column ${styles.networks}`}>
            HERE WILL BE LOGO
            <div
              className={`d-flex justify-content-around ${styles.socials}`}>
              <FaInstagram />
              <FaTelegramPlane />
              <FaFacebook />
            </div>
          </div>
          <div className={styles.contact}>
            <p className={styles.contactTitle}>
              Наши контакты
            </p>
            <p className={styles.links}>
              <a href='tel:+380500300777'>380500300777</a>
            </p>
          </div>
          <div className={styles.menu}>
            <p className={styles.menuTitle}>Меню</p>
            <p className={styles.links}>
              <a href='#'>Каталог</a>
            </p>
            <p className={styles.links}>
              <a href='#'>О нас</a>
            </p>
            <p className={styles.links}>
              <a href='#'>Доставка и оплата</a>
            </p>
            <p className={styles.links}>
              <a href='#'>Обмен и возврат</a>
            </p>
            <p className={styles.links}>
              <a href='#'>Политика конфидециальности</a>
            </p>
          </div>
          <div
            className={`d-flex align-items-lg-end ${styles.description}`}>
            <p className={styles.descriptionTitle}>
              © electronics store 2022
            </p>
          </div>
        </div>
      </ContentWrapper>
    </div>
  );
};
