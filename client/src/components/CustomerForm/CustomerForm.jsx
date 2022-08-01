import React, { useState } from "react";
import styles from "./customer.module.css";
import { Input } from "../Input/Input";

export const CustomerForm = ({ values, handleChange }) => {
  const [checked, setChecked] = useState(false);

  const handleCheckbox = () => {
    setChecked(!checked);
  };

  const customerInfo = [
    {
      id: 1,
      name: "name",
      type: "text",
      placeholder: "Вкажіть ім'я",
      errorMessage:
        "Не повинно мати цифри або символи, максимальна довжина 20 символів.",
      pattern: "^[ A-Za-zА-ЩЬЮЯҐЄІЇа-щьюяґєії]{3,20}$",
      required: true,
    },
    {
      id: 2,
      name: "surname",
      type: "text",
      placeholder: "Вкажіть призвище",
      errorMessage:
        "Не повинно мати цифри або символи, максимальна довжина 20 символів.",
      pattern: "^[ A-Za-zА-ЩЬЮЯҐЄІЇа-щьюяґєії]{3,20}$",
      required: true,
    },
    {
      id: 3,
      name: "phone",
      placeholder: "Вкажіть номер телефону",
      errorMessage: "Номер повинен складатись з 8-12 цифр.",
      pattern: "^[0-9]{10,12}$",
      required: true,
    },
    {
      id: 4,
      name: "email",
      placeholder: "Вкажіть email",
      errorMessage: "Вкажіть email!",
      required: true,
    },
  ];

  return (
    <div className={styles.formBlock}>
      <div className={styles.formTitle}>
        <h4 className={styles.title}>
          Персональна інформація
        </h4>
        <div className={styles.label}>
          <input
            onChange={handleCheckbox}
            defaultChecked={checked}
            type='checkbox'
            id='signup'
          />
          <label for='signup'>
            Хочете зареєструватися?
          </label>
        </div>
      </div>
      <form className={styles.customerForm}>
        {customerInfo.map((input) => (
          <div className={styles.input}>
            <Input
              key={input.id}
              {...input}
              value={values[input.name]}
              onChange={handleChange}
            />
          </div>
        ))}
      </form>
    </div>
  );
};
