import React from "react";
import styles from "./callback.module.css";
import { ContentWrapper } from "../contentWrapper/ContentWrapper";
import { Input } from "../Input/Input";
import { Button } from "../Button/Button";

export const CallbackBlock = () => {
  return (
    <div className={`container-fluid ${styles.callback}`}>
      <ContentWrapper className={styles.wrapper}>
        <div className={styles.bannerBlock}>
          <h1 className={styles.advice}>Нужен совет?</h1>
          <p className={styles.description}>
            {`Оставьте свои контакты и\n мы вам перезвоним `}
          </p>
        </div>
        <div>
          <form className={styles.callbackForm}>
            <Input
              name={`name`}
              type={`text`}
              onChange={() => null}
              placeholder={`Имя`}
            />
            <Input
              name={`name`}
              type={`text`}
              onChange={() => null}
              placeholder={`Телефон`}
            />
            <Button
              containerClassName={styles.callbackBtn}
              children={`Попросить звонок`}
            />
          </form>
        </div>
      </ContentWrapper>
    </div>
  );
};
