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
            Наші соц. мережі
            <div className={`${styles.socials}`}>
              {/* <FaInstagram /> */}
              <a
                className={styles.sendToTelegram}
                href='https://t.me/gribuastore'>
                <FaTelegramPlane />
              </a>
              {/* <FaFacebook /> */}
            </div>
          </div>
          <div className={styles.contact}>
            <p className={styles.contactTitle}>
              Наші контакти
            </p>
            <p id='contact' className={styles.links}>
              <a href='tel:+380975753558'>
                +380-97-575-35-58
              </a>
            </p>
          </div>
          <div className={styles.menu}>
            <p className={styles.menuTitle}>Меню</p>
            <p className={styles.links}>
              <Link className={styles.showCatalog} to='/'>
                Каталог
              </Link>
            </p>
            <p className={styles.links}>
              <Link to='/about-us'>О нас</Link>
            </p>
            <p className={styles.links}>
              <Link to='/payment'>Доставка та оплата</Link>
            </p>
            <p className={styles.links}>
              <Link to='/exchange'>
                Обмін та повернення
              </Link>
            </p>
            <p className={styles.links}>
              <Link to='/privacy-policy'>
                Політика конфіденційності
              </Link>
            </p>
          </div>
          <div
            className={`d-flex align-items-end ${styles.description}`}>
            <p className={styles.descriptionTitle}>
              © Всі права захищені 2022
            </p>
          </div>
        </div>
      </ContentWrapper>
    </footer>
  );
};
