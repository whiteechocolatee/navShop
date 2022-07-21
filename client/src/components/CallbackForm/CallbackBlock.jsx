import React, { useState } from "react";
import styles from "./callback.module.css";
import { ContentWrapper } from "../contentWrapper/ContentWrapper";
import { Input } from "../Input/Input";
import { Button } from "../Button/Button";
import { useDispatch, useSelector } from "react-redux";
import { createCallbackRequest } from "../../store/forms/formsSlice";

export const CallbackBlock = () => {
  const [lineClass, setLineClass] = useState(styles.hide);
  const [formClass, setFormClass] = useState("");
  const [values, setValues] = useState({
    name: "",
    phone: "",
  });

  const dispatch = useDispatch();

  const { errors } = useSelector((state) => {
    return state.formReducer;
  });

  const handleSubmitCallback = (e) => {
    e.preventDefault();

    dispatch(createCallbackRequest(values)).then((res) => {
      if (!res.error) {
        setFormClass(styles.hide);
        setLineClass("");
      }
    });
  };

  const inputs = [
    {
      id: 1,
      name: "name",
      placeholder: "Укажите имя",
      errorMessage:
        "Имя не должно содержать цифр и символов.",
      pattern: "^[ A-Za-zА-Яа-я]{3,16}$",
      required: true,
      error: errors && errors.name.message,
    },
    {
      id: 2,
      name: "phone",
      placeholder: "Укажите номер телефона",
      errorMessage: "Номер должен состоять из 10-12 цифр.",
      pattern: "^[0-9]{10,12}$",
      required: true,
      error: errors && errors.phone.message,
    },
  ];

  const onChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
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
          <form
            onSubmit={handleSubmitCallback}
            className={`${styles.callbackForm} ${formClass}`}>
            {inputs.map((input) => (
              <Input
                key={input.id}
                {...input}
                className={styles.input}
                value={values[input.name]}
                onChange={onChange}
              />
            ))}
            <Button
              containerClassName={styles.callbackBtn}
              className={styles.submit}
              children='Заказать звонок!'
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
