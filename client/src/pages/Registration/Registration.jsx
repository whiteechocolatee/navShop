import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Message from "react-message-block";

import styles from "./registration.module.css";
import { ContentWrapper } from "../../components/contentWrapper/ContentWrapper";
import { Footer } from "../../components/Footer/Footer";
import { Header } from "../../components/Header/Header";
import { Button } from "../../components/Button/Button";
import { Input } from "../../components/Input/Input";
import { paths } from "../../paths";
import { Loader } from "../../components/Loader/Loader";

import {
  checkIsAuth,
  userRegister,
} from "../../store/users/userAuthSlice";

export const Registration = () => {
  window.scroll(0, 0);
  const navigate = useNavigate();

  const [message, setMessage] = useState(false);
  const [values, setValues] = useState({
    name: "",
    email: "",
    surname: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });

  const dispatch = useDispatch();

  const isAuth = useSelector(checkIsAuth);
  const { errors, isLoading } = useSelector(
    (state) => state.userAuthReducer,
  );

  useEffect(() => {
    if (isAuth) {
      navigate(paths.account);
    }
  }, [isAuth, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(userRegister(values)).then((res) => {
      if (res.error) {
        setMessage(true);
      }
    });
  };

  const inputs = [
    {
      id: 1,
      name: "name",
      type: "text",
      placeholder: "Укажите имя",
      errorMessage:
        "Имя не должно содержать цифры и символы.",
      pattern: "^[ A-Za-zА-Яа-я]{3,25}$",
      required: true,
      error: errors && errors.name && errors.name.message,
    },
    {
      id: 2,
      name: "email",
      type: "email",
      placeholder: "Укажите почту",
      errorMessage: "Укажите корректно почту!",
      required: true,
      error: errors && errors.email && errors.email.message,
    },
    {
      id: 3,
      name: "surname",
      placeholder: "Вкажіть призвище",
      errorMessage: "Укажите корректно почту!",
      required: true,
      error: errors && errors.email && errors.email.message,
    },
    {
      id: 4,
      name: "phoneNumber",
      placeholder: "Вкажіть номер телефону",
      errorMessage: "Укажите корректно почту!",
      required: true,
      error: errors && errors.email && errors.email.message,
    },
    {
      id: 5,
      name: "password",
      type: "password",
      placeholder: "Укажите пароль",
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
      id: 6,
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

  return (
    <React.Fragment>
      <Header />
      <ContentWrapper className={styles.wrapper}>
        <div className={styles.registrationPage}>
          <div className={styles.formBlock}>
            {isLoading ? (
              <Loader />
            ) : (
              <form
                onSubmit={handleSubmit}
                className={styles.form}>
                {message ? (
                  <Message
                    text={errors.message}
                    type='error'
                    onClose={() => {
                      setMessage(false);
                    }}
                  />
                ) : (
                  <h4>Впервые на сайте?</h4>
                )}
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
                  children={
                    <input
                      type='submit'
                      className={styles.signUp}
                      value='Зареєструватися'
                    />
                  }
                />
              </form>
            )}
            <div className={styles.mobile}>
              <Link to={paths.login}>
                <p>Уже есть аккаунт? Войти в аккаунт</p>
              </Link>
            </div>
          </div>
          <div className={styles.redirect}>
            <Link to={paths.login}>
              <h4>Уже есть аккаунт?</h4>
              <p>Войти в аккаунт</p>
            </Link>
          </div>
        </div>
      </ContentWrapper>
      <Footer />
    </React.Fragment>
  );
};
