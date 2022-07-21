import React from "react";
import styles from "./user.module.css";
import moment from "moment";

import { FaRegUserCircle } from "react-icons/fa";

export const UserInformation = ({ name, createdAt }) => {
  return (
    <div className={styles.userName}>
      <h3>
        <FaRegUserCircle />
        {"  "}
        {name}
      </h3>
      <b>Присоединился {moment(createdAt).format("LL")}</b>
    </div>
  );
};
