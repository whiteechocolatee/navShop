import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import styles from "./registration.module.css";
import { ContentWrapper } from "../../components/contentWrapper/ContentWrapper";
import { Footer } from "../../components/Footer/Footer";
import { Header } from "../../components/Header/Header";
import { Button } from "../../components/Button/Button";
import { Input } from "../../components/Input/Input";
import { NavLink } from "react-router-dom";
import { paths } from "../../paths";
import { Loader } from "../../components/Loader/Loader";

import { userRegister } from "../../store/users/userRegisterSlice";

export const Registration = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { errors, isLoading } = useSelector(
    (state) => state.userSignReducer,
  );

  const dispatch = useDispatch();

  const handleSubmit = () => {
    const data = {
      name: name,
      email: email,
      password: password,
    };

    dispatch(userRegister(data)).then((res) => {
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
        <div className={styles.registrationPage}>
          <div className={styles.formBlock}>
            {isLoading ? (
              <Loader />
            ) : (
              <form className={styles.form}>
                {errors && errors.message ? (
                  <div className={styles.errorBlock}>
                    {errors.message}
                  </div>
                ) : (
                  ""
                )}
                <h4>Впервые на сайте?</h4>
                <Input
                  name='name'
                  className={styles.input}
                  type='text'
                  placeholder='Введите имя'
                  onChange={(e) => setName(e.target.value)}
                />
                {errors && errors.name ? (
                  <span className={styles.errorMessage}>
                    {errors.name.message}
                  </span>
                ) : (
                  ""
                )}
                <Input
                  name='email'
                  className={styles.input}
                  type='text'
                  placeholder='Введите email'
                  onChange={(e) => setEmail(e.target.value)}
                />
                {errors && errors.email ? (
                  <span className={styles.errorMessage}>
                    {errors.email.message}
                  </span>
                ) : (
                  ""
                )}
                <Input
                  name='password'
                  className={styles.input}
                  type='password'
                  placeholder='Введите пароль'
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                />
                {errors && errors.password ? (
                  <span className={styles.errorMessage}>
                    {errors.password.message}
                  </span>
                ) : (
                  ""
                )}
                <Button
                  onClick={handleSubmit}
                  containerClassName={styles.btn}>
                  Зарегестрироваться
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
