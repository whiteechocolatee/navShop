import React, { useState } from "react";
import { useDispatch } from "react-redux";

import styles from "./update.module.css";
import { Button } from "../../components/Button/Button";
import { Input } from "../../components/Input/Input";

import { updateProfile } from "../../store/users/userAuthSlice";

export const UpdateUserInfo = ({ user, errors }) => {
  const dispatch = useDispatch();

  const [values, setValues] = useState({
    name: user.name,
    email: user.email,
    password: "",
    confirmPassword: "",
  });

  const inputs = [
    {
      id: 1,
      name: "name",
      type: "text",
      placeholder: "Змінити ім'я",
      errorMessage:
        "Ім'я не повинно мати цифри або символи, максимальна довжина 20 символів",
      pattern: "^[ A-Za-zА-Яа-я]{3,20}$",
      required: true,
      error: errors && errors.name && errors.name.message,
    },
    {
      id: 2,
      name: "email",
      type: "email",
      placeholder: "Змінити почту",
      errorMessage: "Вкажіть почту правильно!",
      required: true,
      error: errors && errors.email && errors.email.message,
    },
    {
      id: 3,
      name: "password",
      type: "password",
      placeholder: "Змінити пароль",
      errorMessage:
        "Пароль повинен складатися з 8-20 символів, та повинен мати наприклад (G1$......)",
      pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
      error:
        errors &&
        errors.password &&
        errors.password.message,
    },
    {
      id: 4,
      name: "confirmPassword",
      type: "password",
      placeholder: "Підвердити пароль",
      errorMessage: "Паролі не співпадають",
      pattern: values.password,
      required: values.password.length > 8 ? true : false,
    },
  ];

  const handleUpdate = (e) => {
    e.preventDefault();
    dispatch(updateProfile(values));
  };

  const onChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form
      onSubmit={handleUpdate}
      className={styles.formUpdate}>
      {inputs.map((input) => (
        <Input
          key={input.id}
          {...input}
          value={values[input.name]}
          onChange={onChange}
          className={styles.input}
        />
      ))}
      <Button
        containerClassName={styles.btn}
        children={"Підвердити"}
      />
    </form>
  );
};
