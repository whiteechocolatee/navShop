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
import { CategoriesNavigation } from "../../components/CategoriesNav/CategoriesNavigation";
import { Popup } from "../../components/Popup/Popup";

import {
  checkIsAuth,
  userRegister,
} from "../../store/users/userAuthSlice";

export const Registration = () => {
  window.scroll(0, 0);
  const navigate = useNavigate();

  const [buttonPopup, setButtonPopup] = useState(false);
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
      // navigate(paths.account);
    }
  }, [isAuth, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(userRegister(values)).then((res) => {
      if (res.error) {
        setMessage(true);
      } else {
        setButtonPopup(true);
      }
    });
  };

  const inputs = [
    {
      id: 1,
      name: "name",
      type: "text",
      placeholder: "Вкажіть ім'я",
      errorMessage:
        "Ім'я не повинно мати цифри або символи! Довжина до 25 символів",
      pattern: "^[ A-Za-zА-Яа-я]{3,25}$",
      required: true,
      error: errors && errors.name && errors.name.message,
    },
    {
      id: 2,
      name: "surname",
      placeholder: "Вкажіть призвище",
      errorMessage:
        "Призвище не повинно мати цифри або символи! Довжина до 25 символів ",
      pattern: "^[ A-Za-zА-Яа-я]{3,25}$",
      required: true,
      error:
        errors && errors.surname && errors.surname.message,
    },
    {
      id: 3,
      name: "email",
      type: "email",
      placeholder: "Вкажіть пошту",
      errorMessage: "Пошта вказана невірно!",
      required: true,
      error: errors && errors.email && errors.email.message,
    },
    {
      id: 4,
      name: "phoneNumber",
      placeholder: "Вкажіть номер телефону",
      errorMessage:
        "Номер повинен складатися з 10-12 символів!",
      pattern: "^[0-9]{10,12}$",
      required: true,
      error:
        errors &&
        errors.phoneNumber &&
        errors.phoneNumber.message,
    },
    {
      id: 5,
      name: "password",
      type: "password",
      placeholder: "Вкажіть пароль",
      errorMessage:
        "Пароль повинен бути 8-20 символов латиницею та мати - 1 велику літеру, цифру та символ(!@#$%^&*)",
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
      placeholder: "Підтвердіть пароль",
      errorMessage: "Пароли не співпадають!",
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
      <CategoriesNavigation />
      <ContentWrapper className={styles.wrapper}>
        {isLoading ? (
          <Loader />
        ) : (
          <div className={styles.registrationPage}>
            <Popup
              className={styles.popupClass}
              setActive={setButtonPopup}
              active={buttonPopup}>
              <div className={styles.popupContent}>
                <h1 className={styles.popupTitle}>
                  Ваш аккаунт було створено!
                </h1>
                <Button
                  onClick={() => {
                    setButtonPopup(false);
                    navigate(paths.main);
                  }}
                  containerClassName={styles.popupBtn}>
                  Повернутись до магазину
                </Button>
              </div>
            </Popup>
            <div className={styles.navigation}>
              <Link className={styles.link} to={paths.main}>
                Головна
              </Link>
              <hr className={styles.border} />
              <Link
                className={styles.link}
                to={paths.signup}>
                Реєстрація
              </Link>
            </div>
            <h1 className={styles.title}>Реєстрація</h1>
            {message ? (
              <Message
                text={errors.message}
                type='error'
                onClose={() => {
                  setMessage(false);
                }}
              />
            ) : (
              <p className={styles.subtitle}>
                Якщо ви вже зареєстровані, тоді вам потрібно{" "}
                <Link
                  className={styles.loginLink}
                  to={paths.login}>
                  <b> увійти</b>
                </Link>{" "}
                в акаунт
              </p>
            )}
            <form
              onSubmit={handleSubmit}
              className={styles.form}>
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
              <div className={styles.signupDetails}>
                <div className={styles.subscibe}></div>
                <Button
                  containerClassName={styles.btn}
                  children={
                    <input
                      type='submit'
                      className={styles.signUp}
                      value='Зберегти'
                    />
                  }
                />
              </div>
            </form>
          </div>
        )}
      </ContentWrapper>
      <Footer />
    </React.Fragment>
  );
};
