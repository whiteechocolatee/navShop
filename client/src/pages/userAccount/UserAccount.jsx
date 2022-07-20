import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import Message from "react-message-block";

import styles from "./user.module.css";
import { paths } from "../../paths";
import { Header } from "../../components/Header/Header";
import {
  logout,
  userProfile,
} from "../../store/users/userAuthSlice";
import { ContentWrapper } from "../../components/contentWrapper/ContentWrapper";
import { Button } from "../../components/Button/Button";
import { Footer } from "../../components/Footer/Footer";
import { Input } from "../../components/Input/Input";

export const UserAccount = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, errors } = useSelector(
    (state) => state.userAuthReducer,
  );

  const [values, setValues] = useState({
    name: user.name,
    email: user.email,
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    dispatch(userProfile());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logout());
    window.localStorage.removeItem("token");
    navigate(paths.main);
  };

  const inputs = [
    {
      id: 1,
      name: "name",
      type: "text",
      placeholder: "Изменить имя",
      errorMessage: "Имя не должно содержать пробелов.",
      pattern: "^[A-Za-z0-9]{3,10}$",
      required: true,
      error: errors && errors.name && errors.name.message,
    },
    {
      id: 2,
      name: "email",
      type: "email",
      placeholder: "Изменить почту",
      errorMessage: "Укажите корректно почту!",
      required: true,
      error: errors && errors.email && errors.email.message,
    },
    {
      id: 3,
      name: "password",
      type: "password",
      placeholder: "Изменить пароль",
      errorMessage:
        "Пароль должен быть 8-20 символов и содержать как минимум - 1 букву, цифру и символ(!@#$%^&*)",
      pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
      required: true,
      error:
        errors &&
        errors.password &&
        errors.password.message,
    },
    {
      id: 4,
      name: "confirmPassword",
      type: "password",
      placeholder: "Подтвердите пароль",
      errorMessage: "Пароли не совпадают",
      pattern: values.password,
      required: true,
    },
  ];

  const onChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  console.log(user);

  return (
    <div>
      <Header />
      <ContentWrapper>
        <div className={styles.profile}>
          {errors ? (
            <Message text={errors} type='error' />
          ) : (
            ""
          )}

          <div className={styles.userInformation}>
            <div className={styles.userName}>
              <h3>{user.name}</h3>
              <b>
                Присоединился{" "}
                {moment(user.createdAt).format("LL")}{" "}
              </b>
              <Button
                onClick={handleLogout}
                containerClassName={styles.btn}
                children={"Выйти"}
              />
            </div>
            <div className={styles.userData}>
              {inputs.map((input) => (
                <Input
                  key={input.id}
                  {...input}
                  value={values[input.name]}
                  onChange={onChange}
                />
              ))}
              <Button
                containerClassName={styles.btn}
                children={"Изменить данные"}
              />
            </div>
          </div>
        </div>
      </ContentWrapper>
      <Footer />
    </div>
  );
};
