import React from "react";
import { Link } from "react-router-dom";
import {
  FaInstagram,
  FaTelegramPlane,
  FaFacebook,
} from "react-icons/fa";

import { ContentWrapper } from "../contentWrapper/ContentWrapper";
import styles from "./footer.module.css";

export const Footer = () => {
  return (
    <footer
      className={`container-fluid overflow-auto ${styles.footer}`}>
      <ContentWrapper className={styles.wrapper}>
        <div className={`${styles.aboutUs}`}>
          <div className={`${styles.networks}`}>
            HERE WILL BE LOGO
            <div className={`${styles.socials}`}>
              <FaInstagram />
              <FaTelegramPlane />
              <FaFacebook />
            </div>
          </div>
          <div className={styles.contact}>
            <p className={styles.contactTitle}>
              Наши контакты
            </p>
            <p id='contact' className={styles.links}>
              <a href='tel:+380500300777'>380500300777</a>
            </p>
          </div>
          <div className={styles.menu}>
            <p className={styles.menuTitle}>Меню</p>
            <p className={styles.links}>
              <Link to='#'>Каталог</Link>
            </p>
            <p className={styles.links}>
              <Link to='#'>О нас</Link>
            </p>
            <p className={styles.links}>
              <Link to='#'>Доставка и оплата</Link>
            </p>
            <p className={styles.links}>
              <Link to='#'>Обмен и возврат</Link>
            </p>
            <p className={styles.links}>
              <Link to='#'>Политика конфидециальности</Link>
            </p>
          </div>
          <div
            className={`d-flex align-items-end ${styles.description}`}>
            <p className={styles.descriptionTitle}>
              © electronics store 2022
            </p>
          </div>
        </div>
      </ContentWrapper>
    </footer>
  );
};
