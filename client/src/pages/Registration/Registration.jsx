import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

  const [message, setMessage] = useState(false);
  const [values, setValues] = useState({
    name: "",
    email: "",
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
      errorMessage: "Имя не должно содержать пробелов.",
      pattern: "^[A-Za-z0-9А-Яа-я]{3,10}$",
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

  return (
    <React.Fragment>
      <Header />
      <ContentWrapper>
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
                <Button containerClassName={styles.btn}>
                  <input
                    className={styles.signUp}
                    type='submit'
                    value={"Зарегестрироваться"}
                  />
                </Button>
              </form>
            )}
          </div>
          <div className={styles.redirect}>
            <NavLink to={paths.login}>
              <h4>Уже есть аккаунт?</h4>
            </NavLink>
          </div>
        </div>
      </ContentWrapper>
      <Footer />
    </React.Fragment>
  );
};
