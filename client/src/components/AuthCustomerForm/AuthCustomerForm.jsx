import React from "react";
import styles from "./authForm.module.css";
import { LogoutButton } from "../LogoutButton/LogoutButton";
import { useNavigate } from "react-router-dom";
import { paths } from "../../paths";

export const AuthCustomerForm = ({ values }) => {
  const navigate = useNavigate();

  const handleChangeAddress = () => {
    navigate(`${paths.account}${paths.changeUserData}`);
  };

  return (
    <div className={styles.formBlock}>
      <div className={styles.formTitle}>
        <h4 className={styles.title}>
          Персональна інформація
        </h4>
        <LogoutButton />
      </div>
      <div className={styles.customerData}>
        <p>
          {values.name} {values.surname}
        </p>
        <p>{values.email}</p>
        <p>{values.phone}</p>
        <p
          className={styles.button}
          onClick={handleChangeAddress}>
          Змінити
        </p>
      </div>
    </div>
  );
};
