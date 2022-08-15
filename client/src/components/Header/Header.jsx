import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { GrApps } from "react-icons/gr";
import { NavLink } from "react-router-dom";

import {
  FaRegUser,
  FaRegHeart,
  FaPhoneAlt,
} from "react-icons/fa";

import styles from "./header.module.css";
import { ContentWrapper } from "../contentWrapper/ContentWrapper";
import { Search } from "../SearchBar/Search";
import { paths } from "../../paths";
import { Cart } from "../Cart/Cart";

import {
  logout,
  checkIsAuth,
} from "../../store/users/userAuthSlice";
import { ImageComponent } from "../Image/Image";

export const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuth = useSelector(checkIsAuth);
  const [small, setSmall] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    window.localStorage.removeItem("token");
    navigate(paths.main);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", () =>
        setSmall(window.scrollY > 100),
      );
    }
  }, []);

  return (
    <header
      className={`navbar navbar-expand-md  
      ${small ? styles.header : styles.headerTop}
      `}>
      <ContentWrapper>
        <NavLink
          className={styles.mainLink}
          to={paths.main}>
          <div className={styles.logoImg}>
            <ImageComponent
              publicId={`https://res.cloudinary.com/dmhqzwtnd/image/upload/v1660555989/items/d8fjw6v-516f0d4b-7a4b-4ffb-9376-4213a53021a9-removebg-preview_gvtsqg.png`}
              alt='logo'
            />
          </div>
        </NavLink>
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
                      <NavLink to={paths.account}>
                        <li>
                          <button
                            className={styles.dropdownBtn}>
                            Аккаунт
                          </button>
                        </li>
                      </NavLink>
                      <li>
                        <button
                          onClick={handleLogout}
                          className={styles.dropdownBtn}>
                          Выйти
                        </button>
                      </li>
                    </div>
                  ) : (
                    <NavLink to={paths.login}>
                      <li>
                        <button
                          className={styles.dropdownBtn}>
                          Логин
                        </button>
                      </li>
                    </NavLink>
                  )}
                </ul>
              </div>
              <NavLink
                aria-current='page'
                className={`nav-link`}
                to={paths.favorite}>
                <FaRegHeart />
              </NavLink>
              <Cart />
            </li>
          </ul>
        </div>
      </ContentWrapper>
    </header>
  );
};
