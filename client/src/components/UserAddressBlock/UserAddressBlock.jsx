import React from "react";
import styles from "./addressBlock.module.css";
import { Button } from "../Button/Button";
import { Checkbox } from "../Checkbox/Checkbox";

export const UserAddressBlock = ({
  address,
  handleDelete,
  changeMain,
}) => {
  return (
    <div className={styles.address}>
      <div>
        <Checkbox
          name='main'
          checkedValue={address.main === "yes"}
          value={address._id}
          children={"Зробити головним"}
          onChange={() => changeMain(address._id)}
        />
      </div>
      <div className={styles.addressInfo}>
        <span>{address.area} область</span>
        <span>{address.city}</span>
        <p>{address.department}</p>
        <span>{address.index}</span>
      </div>
      <div className={styles.addressNav}>
        <Button
          containerClassName={styles.btn}
          children='Змінити'
        />
        <div
          onClick={() => handleDelete(address._id)}
          className={styles.deleteAddress}>
          Видалити
        </div>
      </div>
    </div>
  );
};
