import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import styles from "./addressBlock.module.css";
import { Button } from "../Button/Button";
import { Checkbox } from "../Checkbox/Checkbox";
import { updateChosenAddress } from "../../store/users/userAuthSlice";
import { paths } from "../../paths";

export const UserAddressBlock = ({
  address,
  handleDelete,
  changeMain,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = () => {
    dispatch(updateChosenAddress(address));
    navigate(`${paths.account}/${paths.updateAddress}`);
  };

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
          onClick={handleChange}
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
