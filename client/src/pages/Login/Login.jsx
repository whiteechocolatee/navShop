import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import Message from "react-message-block";

import styles from "./login.module.css";
import { ContentWrapper } from "../../components/contentWrapper/ContentWrapper";
import { Footer } from "../../components/Footer/Footer";
import { Header } from "../../components/Header/Header";
import { Button } from "../../components/Button/Button";
import { Input } from "../../components/Input/Input";
import { paths } from "../../paths";
import { userLogin } from "../../store/users/userLoginSlice";
import { Loader } from "../../components/Loader/Loader";

export const Login = () => {
  const [message, setMessage] = useState(false);
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const { errors, isLoading } = useSelector(
    (state) => state.userLogReducer,
  );

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(userLogin(values)).then((res) => {
      if (!res.error) {
        window.location.replace(paths.account);
      } else {
        setMessage(true);
      }
    });
  };

  const inputs = [
    {
      id: 1,
      name: "email",
      type: "email",
      placeholder: "Укажите почту",
      errorMessage: "Укажите корректно почту!",
      required: true,
      error: errors && errors.email && errors.email.message,
    },
    {
      id: 2,
      name: "password",
      type: "password",
      placeholder: "Укажите пароль",
      errorMessage: "Укажите пароль корректно!",
      pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
      required: true,
      error:
        errors &&
        errors.password &&
        errors.password.message,
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
        <div className={styles.loginPage}>
          <div className={styles.redirect}>
            <NavLink to={paths.signup}>
              <h4>Всё еще нет аккаунта?</h4>
            </NavLink>
          </div>
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
                  <h4>Рады вас видеть!</h4>
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
                    className={styles.submit}
                    type='submit'
                    value='Войти'
                  />
                </Button>
              </form>
            )}
          </div>
        </div>
      </ContentWrapper>
      <Footer />
    </React.Fragment>
  );
};
