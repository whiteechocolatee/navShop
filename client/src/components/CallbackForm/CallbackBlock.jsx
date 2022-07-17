import React, { useState } from "react";
import styles from "./callback.module.css";
import { ContentWrapper } from "../contentWrapper/ContentWrapper";
import { Input } from "../Input/Input";
import { Button } from "../Button/Button";
import { useDispatch, useSelector } from "react-redux";
import { createCallbackRequest } from "../../store/forms/formsSlice";

import { userSchema } from "../../Validation/callbackForm";

export const CallbackBlock = () => {
  const dispatch = useDispatch();

  const [name, setName] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [lineClass, setLineClass] = useState(styles.hide);
  const [formClass, setFormClass] = useState("");
  const [error, setError] = useState(styles.hide);

  const { errors } = useSelector((state) => {
    return state.formReducer;
  });

  const handleCallbackForm = async () => {
    const formData = {
      name: name,
      phone: +phoneNumber,
    };

    const isValid = await userSchema.isValid(formData);

    if (isValid) {
      dispatch(createCallbackRequest(formData));
      setError(styles.hide);
      setFormClass(styles.hide);
      setLineClass("");
    } else {
      setError("");
    }
  };

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
          <div className={`${error} ${styles.error}`}>
            Корректно укажите данные!
          </div>
          <form
            className={`${styles.callbackForm} ${formClass}`}>
            <Input
              name={`name`}
              type={`text`}
              className={styles.input}
              onChange={(e) => setName(e.target.value)}
              placeholder={`Имя`}
              error={
                errors && errors.name && errors.name.message
              }
            />
            <Input
              name={`name`}
              type={`text`}
              className={styles.input}
              onChange={(e) =>
                setPhoneNumber(e.target.value)
              }
              placeholder={`380991234567`}
              error={
                errors &&
                errors.phone &&
                errors.phone.message
              }
            />
            <Button
              onClick={handleCallbackForm}
              containerClassName={styles.callbackBtn}
              children={`Заказать звонок`}
            />
          </form>
          <div
            className={`${styles.changeForm} ${lineClass}`}>
            <h1 className={styles.advice}>Благодарим!</h1>
            <p className={styles.description}>
              {`Как только мы получим заявку -\n сразу же вам перезвоним!  `}
            </p>
          </div>
        </div>
      </ContentWrapper>
    </div>
  );
};
