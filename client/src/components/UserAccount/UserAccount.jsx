import React from "react";
import { Link, NavLink } from "react-router-dom";

import styles from "./account.module.css";
import { paths } from "../../paths";
import { LogoutButton } from "../LogoutButton/LogoutButton";

export const UserAccount = () => {
  return (
    <div className={styles.profile}>
      <div>
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
              to={paths.userOrders}>
              Мої замовлення
            </NavLink>
            <NavLink
              className={styles.links}
              style={({ isActive }) => ({
                color: isActive ? "#ABAFE9" : "#000",
              })}
              to={`${paths.liked}`}>
              Мені сподобалось
            </NavLink>
            <LogoutButton containerClassName={styles.logout} />
          </nav>
        </div>
      </div>
    </div>
  );
};
