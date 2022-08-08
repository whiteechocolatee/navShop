import React from "react";
import { Link } from "react-router-dom";

import styles from "./userAddressForm.module.css";
import { NovaPoshta } from "../NovaPoshta/NovaPoshta";
import { Button } from "../Button/Button";
import { paths } from "../../paths";
import { Checkbox } from "../Checkbox/Checkbox";
import { Input } from "../Input/Input";

export const UserAddressForm = ({
  handleChange,
  values,
  handleAddress,
}) => {
  const inputs = [
    {
      id: 1,
      name: "index",
      type: "text",
      placeholder: "Вкажіть індекс",
      errorMessage:
        "Не повинно мати літери або символи, максимальна довжина 5 символів.",
      pattern: "^[0-9]{5}$",
      required: true,
    },
    {
      id: 2,
      name: "street",
      type: "text",
      placeholder: "Вкажіть вулицю",
      errorMessage:
        "Не повинно мати цифри або символи, максимальна довжина 25 символів.",
      pattern: "^[ A-Za-zА-ЩЬЮЯҐЄІЇа-щьюяґєії0-9]{3,30}$",
      required: true,
    },
  ];

  return (
    <div className={styles.addressBlock}>
      <div className={styles.addressForm}>
        <div className={styles.columns}>
          <NovaPoshta
            values={values}
            handleChange={handleChange}
          />
        </div>
        <div
          className={`${styles.columns} ${styles.inputs} `}>
          {inputs.map((input) => (
            <div className={styles.dataBlock}>
              <Input
                key={input.id}
                {...input}
                className={styles.input}
                value={values[input.name]}
                onChange={handleChange}
              />
            </div>
          ))}
          <div className={styles.isMain}>
            <p className={styles.isMainTitle}>
              Зробити основним?
            </p>
            <Checkbox
              name={"main"}
              onChange={handleChange}
              value={"yes"}
              checkedValue={values.main === "yes"}
              children={"Так"}
            />
            <Checkbox
              name={"main"}
              onChange={handleChange}
              value={"no"}
              checkedValue={values.main === "no"}
              children={"Ні"}
            />
          </div>
        </div>
      </div>
      <div className={styles.navigation}>
        <Link className={styles.link} to={paths.account}>
          Назад
        </Link>
        <Button
          onClick={() => handleAddress(values)}
          containerClassName={styles.btn}
          children='Зберегти'
        />
      </div>
    </div>
  );
};
