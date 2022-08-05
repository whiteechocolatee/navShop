import React, { useState } from "react";
import { Link } from "react-router-dom";

import styles from "./address.module.css";
import { NovaPoshta } from "../NovaPoshta/NovaPoshta";
import { Input } from "../Input/Input";
import { Button } from "../../components/Button/Button";

import { paths } from "../../paths";
import { useDispatch } from "react-redux";
import { saveAddress } from "../../store/users/userAuthSlice";

export const UserAddAddress = () => {
  const dispatch = useDispatch();

  const [values, setValues] = useState({
    area: "",
    city: "",
    index: "",
    street: "",
    department: "",
    main: "",
  });

  const handleAddress = () => {
    dispatch(saveAddress(values));
  };

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  console.log(values);

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
          <NovaPoshta handleChange={handleChange} />
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
            <div className={styles.label}>
              <input
                name='main'
                id='true'
                type='radio'
                value='true'
                onChange={handleChange}
                checked={values.main === "true"}
              />
              <label htmlFor='true'>Так</label>
            </div>
            <div className={styles.label}>
              <input
                name='main'
                id='false'
                type='radio'
                value='false'
                onChange={handleChange}
                checked={values.main === "false"}
              />
              <label htmlFor='false'>Ні</label>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.navigation}>
        <Link className={styles.link} to={paths.account}>
          Назад
        </Link>
        <Button
          onClick={handleAddress}
          containerClassName={styles.btn}
          children='Зберегти'
        />
      </div>
    </div>
  );
};
