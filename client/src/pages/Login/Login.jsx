import React, { useState } from "react";
import { useSelector } from "react-redux";
import styles from "./login.module.css";

import { ContentWrapper } from "../../components/contentWrapper/ContentWrapper";
import { Footer } from "../../components/Footer/Footer";
import { Header } from "../../components/Header/Header";
import { Button } from "../../components/Button/Button";
import { Input } from "../../components/Input/Input";
import { NavLink } from "react-router-dom";
import { paths } from "../../paths";
import { useDispatch } from "react-redux";
import { userLogin } from "../../store/users/userLoginSlice";
import { Loader } from "../../components/Loader/Loader";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { errors, isLoading } = useSelector(
    (state) => state.userLogReducer,
  );

  const dispatch = useDispatch();

  const handleSubmit = () => {
    const data = {
      email: email,
      password: password,
    };

    dispatch(userLogin(data)).then((res) => {
      let response = res.type.split("/")[1] === "fulfilled";

      if (response) {
        window.location.replace(paths.account);
      }
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
                {errors && errors.message ? (
                  <div className={styles.errorBlock}>
                    {errors.message}
                  </div>
                ) : (
                  ""
                )}
                <h4>Рады вас видеть!</h4>
                <Input
                  onChange={(e) => setEmail(e.target.value)}
                  name='email'
                  className={styles.input}
                  type='email'
                  placeholder='Введите email'
                />
                {errors && errors.email ? (
                  <span className={styles.errorMessage}>
                    {errors.email.message}
                  </span>
                ) : (
                  ""
                )}
                <Input
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  name='password'
                  className={styles.input}
                  type='password'
                  placeholder='Введите пароль'
                />
                {errors && errors.password ? (
                  <span className={styles.errorMessage}>
                    {errors.password.message}
                  </span>
                ) : (
                  ""
                )}
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
