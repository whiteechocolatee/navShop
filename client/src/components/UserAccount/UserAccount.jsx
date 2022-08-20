import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { logout } from "../../store/users/userAuthSlice";
import styles from "./account.module.css";
import { paths } from "../../paths";
import { LogoutButton } from "../LogoutButton/LogoutButton";
import { Button } from "../Button/Button";
import { UserNavigation } from "../Popups/UserNavigation/UserNavigation";

export const UserAccount = () => {
  const [active, setActive] = useState();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    window.localStorage.removeItem("token");
    navigate(paths.main);
  };

  return (
    <div className={styles.profile}>
      <div className={styles.mainNav}>
        <div className={styles.navigation}>
          <Link className={styles.link} to={paths.main}>
            Головна
          </Link>
          <hr className={styles.border} />
          <Link className={styles.link} to={paths.order}>
            Профіль
          </Link>
        </div>
        <h1 className={styles.title}>Мій профіль</h1>
        <div className={styles.userNavigation}>
          <nav className={styles.navigationBtns}>
            <NavLink
              className={styles.links}
              style={({ isActive }) => ({
                color: isActive ? "#ABAFE9" : "#000",
              })}
              to={paths.account}>
              Мої дані
            </NavLink>
            <NavLink
              className={styles.links}
              style={({ isActive }) => ({
                color: isActive ? "#ABAFE9" : "#000",
              })}
              to={paths.updatePassword}>
              Змінити пароль
            </NavLink>
            <NavLink
              className={styles.links}
              style={({ isActive }) => ({
                color: isActive ? "#ABAFE9" : "#000",
              })}
              to={paths.userOrders}>
              Мої замовлення
            </NavLink>
            <LogoutButton
              containerClassName={styles.logout}
            />
          </nav>
        </div>
      </div>
      <div className={styles.mobileNav}>
        <Button
          onClick={() => setActive(true)}
          containerClassName={styles.navBtn}
          children='Навігація'
        />
        <UserNavigation
          logout={handleLogout}
          setActive={setActive}
          active={active}
        />
      </div>
    </div>
  );
};
