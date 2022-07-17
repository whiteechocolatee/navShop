import React from "react";
import styles from "./registration.module.css";
import { ContentWrapper } from "../../components/contentWrapper/ContentWrapper";
import { Footer } from "../../components/Footer/Footer";
import { Header } from "../../components/Header/Header";
import { Button } from "../../components/Button/Button";
import { Input } from "../../components/Input/Input";
import { NavLink } from "react-router-dom";
import { paths } from "../../paths";

export const Registration = () => {
  const handleSubmit = () => {
    console.log(1);
  };

  return (
    <React.Fragment>
      <Header />
      <ContentWrapper>
        <div className={styles.registrationPage}>
          <div className={styles.formBlock}>
            <form className={styles.form}>
              <h4>Впервые на сайте?</h4>
              <Input
                name='name'
                className={styles.input}
                type='text'
                placeholder='Введите имя'
              />
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
              <Button
                onClick={handleSubmit}
                containerClassName={styles.btn}>
                Зарегестрироваться
              </Button>
            </form>
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
