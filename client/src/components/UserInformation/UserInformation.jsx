import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import styles from "./user.module.css";
import moment from "moment";

import { FaRegUserCircle } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { paths } from "../../paths";
import { userProfile } from "../../store/users/userAuthSlice";

export const UserInformation = () => {
  const dispatch = useDispatch();

  const { user } = useSelector(
    (state) => state.userAuthReducer,
  );

  const { name, createdAt } = user;

  useEffect(() => {
    dispatch(userProfile());
  }, [dispatch]);

  return (
    <div className={styles.userProfile}>
      <div className={styles.userName}>
        <h3>
          <FaRegUserCircle />
          {"  "}
          {name}
        </h3>
        <b>Приєднався {moment(createdAt).format("LL")}</b>
      </div>

      <div className={styles.userNavigation}>
        <ul className={styles.navigationBtns}>
          <li className={styles.navigationBtn}>
            <NavLink
              style={({ isActive }) => ({
                color: isActive ? "#ABAFE9" : "#000",
              })}
              to={paths.account}>
              Мої дані
            </NavLink>
          </li>
          <li className={styles.navigationBtn}>
            <NavLink
              style={({ isActive }) => ({
                color: isActive ? "#ABAFE9" : "#000",
              })}
              to={`${paths.userOrders}`}>
              Мої замовлення
            </NavLink>
          </li>
          <li className={styles.navigationBtn}>
            <NavLink
              style={({ isActive }) => ({
                color: isActive ? "#ABAFE9" : "#000",
              })}
              to={`${paths.liked}`}>
              Мені сподобалось
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};
