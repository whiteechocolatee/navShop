import React from "react";
import styles from "./login.module.css";

import { ContentWrapper } from "../../components/contentWrapper/ContentWrapper";
import { Footer } from "../../components/Footer/Footer";
import { Header } from "../../components/Header/Header";
import { Button } from "../../components/Button/Button";
import { Input } from "../../components/Input/Input";
import { NavLink } from "react-router-dom";
import { paths } from "../../paths";

export const Login = () => {
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
            <form className={styles.form}>
              <h4>Рады вас видеть</h4>
              <Input
                name='email'
                className={styles.input}
                type='text'
                placeholder='Введите email'
              />
              <Input
                name='password'
                className={styles.input}
                type='password'
                placeholder='Введите пароль'
              />
              <Button containerClassName={styles.btn}>
                Войти
              </Button>
            </form>
          </div>
        </div>
      </ContentWrapper>
      <Footer />
    </React.Fragment>
  );
};
