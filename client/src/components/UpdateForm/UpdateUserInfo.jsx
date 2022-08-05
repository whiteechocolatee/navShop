import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import styles from "./update.module.css";
import { Button } from "../../components/Button/Button";
import { Input } from "../../components/Input/Input";

import { updateProfile } from "../../store/users/userAuthSlice";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { paths } from "../../paths";

export const UpdateUserInfo = () => {
  const dispatch = useDispatch();

  const { isError, isChanged, user, errors } = useSelector(
    (state) => state.userAuthReducer,
  );

  const [values, setValues] = useState({
    name: user.name,
    surname: user.surname,
    email: user.email,
    phoneNumber: user.phoneNumber,
    password: "",
    confirmPassword: "",
  });

  if (isChanged) {
    toast.success("Данные успешно изменены!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  } else if (isError) {
    toast.error(errors, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }

  const inputs = [
    {
      id: 1,
      name: "name",
      type: "text",
      placeholder: "Змінити ім'я",
      errorMessage:
        "Ім'я не повинно мати цифри або символи, довжина від 3 до 20 символів",
      pattern: "^[ A-Za-zА-ЩЬЮЯҐЄІЇа-щьюяґєії]{2,20}$",
      required: true,
      error: errors && errors.name && errors.name.message,
    },
    {
      id: 2,
      name: "surname",
      type: "text",
      placeholder: "Змінити призвище",
      errorMessage:
        "Не повинно мати цифри або символи, довжина від 3 до 20 символів",
      pattern: "^[ A-Za-zА-ЩЬЮЯҐЄІЇа-щьюяґєії]{3,20}$",
      required: true,
    },
    {
      id: 3,
      name: "email",
      type: "email",
      placeholder: "Змінити почту",
      errorMessage: "Вкажіть почту правильно!",
      required: true,
      error: errors && errors.email && errors.email.message,
    },
    {
      id: 4,
      name: "phoneNumber",
      placeholder: "Змінити номер телефону",
      errorMessage: "Номер повинен складатись з 8-12 цифр.",
      pattern: "^[0-9]{10,12}$",
      required: true,
    },
    {
      id: 5,
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
      id: 6,
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
    <div className={styles.formBlock}>
      <form
        onSubmit={handleUpdate}
        className={styles.formUpdate}>
        {inputs.map((input) => (
          <div className={styles.inputContainer}>
            <Input
              key={input.id}
              {...input}
              value={values[input.name]}
              onChange={onChange}
              className={styles.input}
            />
          </div>
        ))}
        <div className={styles.navigation}>
          <Link className={styles.link} to={paths.account}>
            Назад
          </Link>
          <Button
            containerClassName={styles.btn}
            children={
              <input
                className={styles.inputSubmit}
                type='submit'
                value='Змінити'
              />
            }
          />
        </div>
      </form>
    </div>
  );
};
