import React from "react";
import styles from "./personal.module.css";
import { useSelector } from "react-redux";
import { Button } from "../Button/Button";
import { Link } from "react-router-dom";
import { paths } from "../../paths";

export const PersonalData = () => {
  const { user } = useSelector(
    (state) => state.userAuthReducer,
  );

  const handleChange = () => {
    console.log(1);
  };

  return (
    <div className={styles.personalBlock}>
      <div className={styles.personalData}>
        <span>{user.name} {user.surname}</span>
        <span>{user.email}</span>
        <span>{user.phoneNumber}</span>
        <Button
          onClick={handleChange}
          containerClassName={styles.btn}
          children={
            <Link
              className={styles.link}
              to={`${paths.account}${paths.changeUserData}`}>
              Змінити
            </Link>
          }
        />
      </div>
      {/* map user addresses   */}
    </div>
  );
};
