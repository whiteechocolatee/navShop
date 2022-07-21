import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Message from "react-message-block";

import styles from "./login.module.css";
import { ContentWrapper } from "../../components/contentWrapper/ContentWrapper";
import { Footer } from "../../components/Footer/Footer";
import { Header } from "../../components/Header/Header";
import { Button } from "../../components/Button/Button";
import { Input } from "../../components/Input/Input";
import { paths } from "../../paths";
import {
  checkIsAuth,
  userLogin,
} from "../../store/users/userAuthSlice";
import { Loader } from "../../components/Loader/Loader";

export const Login = () => {
  const navigate = useNavigate();

  const [message, setMessage] = useState(false);
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const isAuth = useSelector(checkIsAuth);
  const { errors, isLoading } = useSelector(
    (state) => state.userAuthReducer,
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (isAuth) {
      navigate(paths.account);
    }
  }, [isAuth, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(userLogin(values)).then((res) => {
      if (res.error) {
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
      <ContentWrapper className={styles.wrapper}>
        <div className={styles.loginPage}>
          <div className={styles.redirect}>
            <Link to={paths.signup}>
              <h4>Еще нет аккаунта?</h4>
              <p>Создать новый аккаунт</p>
            </Link>
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
                    text={errors?.message}
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
                <div className={styles.mobile}>
                  <Link to={paths.signup}>
                    <p>
                      Еще нет аккаунта? Создать новый
                      аккаунт.
                    </p>
                  </Link>
                </div>
              </form>
            )}
          </div>
        </div>
      </ContentWrapper>
      <Footer />
    </React.Fragment>
  );
};
