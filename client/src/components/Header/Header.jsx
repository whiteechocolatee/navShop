import React from "react";
import { Link } from "react-router-dom";
import {
  FaRegUser,
  FaRegHeart,
  FaPhoneAlt,
} from "react-icons/fa";

import { GrApps } from "react-icons/gr";

import { IoCartOutline } from "react-icons/io5";
import { NavLink } from "react-router-dom";

import styles from "./header.module.css";
import { ContentWrapper } from "../contentWrapper/ContentWrapper";
import { Search } from "../SearchBar/Search";
import { paths } from "../../paths";

export const Header = ({ isAuth, handleLogout }) => {
  return (
    <ContentWrapper>
      <header
        className={`navbar navbar-expand-md ${styles.navigation}`}>
        <Link className={styles.mainLink} to={paths.main}>
          <b>LOGO</b>
        </Link>
        <button
          className={`${styles.toggler}`}
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarNav'
          aria-controls='navbarNav'
          aria-expanded='false'
          aria-label='Toggle navigation'>
          <span className={`navbar-toggler-icon`}>
            <GrApps />
          </span>
        </button>
        <div
          className={`collapse navbar-collapse ${styles.navContainer}`}
          id='navbarNav'>
          <div
            className={`dropdown ${styles.dropdownMenu}`}>
            <button
              className={`dropdown-toggle ${styles.dropdownBtn}`}
              type='button'
              id='dropdownMenuButton1'
              data-bs-toggle='dropdown'
              aria-expanded='false'>
              Категории
            </button>
            <ul
              className={`dropdown-menu`}
              aria-labelledby='dropdownMenuButton1'>
              <li>
                <NavLink
                  className={`dropdown-item ${styles.dropdownLink}`}
                  to={"/as"}>
                  Зарядные
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={`dropdown-item`}
                  to={"/asd"}>
                  Защитные акссесуары
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={`dropdown-item`}
                  to={"/asdf"}>
                  Гаджеты
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={`dropdown-item`}
                  to={"/asdfg"}>
                  Аудио
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={`dropdown-item`}
                  to={"/asdasd"}>
                  Для компьютеров
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={`dropdown-item`}
                  to={"/ыфвфывфыв"}>
                  Для авто
                </NavLink>
              </li>
            </ul>
          </div>
          <ul className={styles.navBtns}>
            <Search
              navStyles={styles.navBtn}
              searchStyles={styles.searchBlock}
              inputStyles={styles.inputSearch}
            />
            <li
              className={`nav-item ${styles.navBtn} ${styles.callBlock}`}>
              <FaPhoneAlt />
              <NavLink
                aria-current='page'
                className={`nav-link`}
                to='#contact'>
                Позвонить
              </NavLink>
            </li>
            <li className={`nav-item ${styles.navBtn}`}>
              <div className='btn-group'>
                <button
                  type='button'
                  className={`dropdown-toggle ${styles.dropdownBtn}`}
                  data-bs-toggle='dropdown'
                  aria-expanded='false'>
                  <FaRegUser />
                </button>
                <ul
                  className={`dropdown-menu ${styles.dropdown}`}>
                  {isAuth ? (
                    <div>
                      <li>
                        <NavLink to={paths.account}>
                          <button
                            className={styles.dropdownBtn}>
                            Аккаунт
                          </button>
                        </NavLink>
                      </li>
                      <li>
                        <button
                          onClick={handleLogout}
                          className={styles.dropdownBtn}>
                          Выйти
                        </button>
                      </li>
                    </div>
                  ) : (
                    <li>
                      <NavLink to={paths.login}>
                        Логин
                      </NavLink>
                    </li>
                  )}
                </ul>
              </div>
              <NavLink
                aria-current='page'
                className={`nav-link`}
                to='/'>
                <FaRegHeart />
              </NavLink>
              <NavLink
                aria-current='page'
                className={`nav-link`}
                to='/'>
                <IoCartOutline />
              </NavLink>
            </li>
          </ul>
        </div>
      </header>
    </ContentWrapper>
  );
};
