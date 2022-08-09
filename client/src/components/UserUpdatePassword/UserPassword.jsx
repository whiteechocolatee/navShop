import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

import "react-toastify/dist/ReactToastify.css";
import styles from "./userPassword.module.css";
import { Input } from "../Input/Input";
import { updateProfile } from "../../store/users/userAuthSlice";
import { Button } from "../Button/Button";
import { paths } from "../../paths";

export const UserPassword = () => {
  const dispatch = useDispatch();

  const { isError, isChanged, errors } = useSelector(
    (state) => state.userAuthReducer,
  );

  const [values, setValues] = useState({
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
      id: 2,
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
        className={styles.updatePassword}>
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
