import React from "react";
import styles from "./account.module.css";
import { ContentWrapper } from "../contentWrapper/ContentWrapper";
import { Message } from "react-message-block";
import { useSelector } from "react-redux";
import { paths } from "../../paths";
import { Link, NavLink } from "react-router-dom";

export const UserAccount = () => {
  const { errors } = useSelector(
    (state) => state.userAuthReducer,
  );

  const handleLogout = () => {};

  return (
    <div className={styles.profile}>
      {errors ? (
        <Message text={errors} type='error' />
      ) : (
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
              <div
                onClick={handleLogout}
                className={styles.logout}>
                вийти
                <div className={styles.arrow}>
                  <div className={styles.arrowBody}></div>
                  <div className={styles.arrowEnd}></div>
                </div>
              </div>
            </nav>
          </div>
        </div>
      )}
    </div>
  );
};
