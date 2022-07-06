import React from "react";
import {
  FaSearch,
  FaRegUser,
  FaRegHeart,
  FaPhoneAlt,
  FaEllo,
} from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

import styles from "./header.module.css";
import { ContentWrapper } from "../contentWrapper/ContentWrapper";

export const Header = () => {
  return (
    <ContentWrapper>
      <header className={styles.navbar}>
        <div className={styles.header}>
          <h2 className={styles.logo}>
            <FaEllo />
            LOGO
          </h2>
          <div className={styles.search}>
            <input
              name='search'
              type='text'
              className={styles.searchInput}
              placeholder='Поиск'
              onChange={() => null}
            />
            <FaSearch />
          </div>
          <div className={styles.callback}>
            <FaPhoneAlt />
            <span className={styles.callbackTitle}>
              Позвонить
            </span>
          </div>
          <div className={styles.userActivity}>
            <Link className={styles.link} to={`#`}>
              <FaRegUser />
            </Link>
            <Link className={styles.link} to={`#`}>
              <FaRegHeart />
            </Link>
            <Link className={styles.link} to={`#`}>
              <IoCartOutline />
            </Link>
          </div>
        </div>
      </header>
    </ContentWrapper>
  );
};
