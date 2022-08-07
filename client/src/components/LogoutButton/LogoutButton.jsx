import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import styles from "./logout.module.css";
import { paths } from "../../paths";
import { logout } from "../../store/users/userAuthSlice";

export const LogoutButton = ({ containerClassName }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    window.localStorage.removeItem("token");
    navigate(paths.main);
  };

  return (
    <div
      onClick={handleLogout}
      className={`${styles.logout} ${containerClassName}`}>
      вийти
      <div className={styles.arrow}>
        <div className={styles.arrowBody}></div>
        <div className={styles.arrowEnd}></div>
      </div>
    </div>
  );
};
