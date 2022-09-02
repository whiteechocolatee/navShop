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
      placeholder: "Вкажіть ім'я",
      errorMessage:
        "Ім'я не повинно мати цифри, або символи.",
      pattern: "^[ A-Za-zА-Яа-я]{3,16}$",
      required: true,
      error: errors && errors.name.message,
    },
    {
      id: 2,
      name: "phone",
      placeholder: "Вкажіть номер телефона",
      errorMessage:
        "Номер повинен складатися з 10-12 цифр.",
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
          <h1 className={styles.advice}>Є питання?</h1>
          <p className={styles.description}>
            {`Залиште свої контакти і\n та ми вам зателфонуємо `}
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
              children={
                <input
                  className={styles.submit}
                  type='submit'
                  value='Замовити дзвінок'
                />
              }
            />
          </form>
          <div
            className={`${styles.changeForm} ${lineClass}`}>
            <h1 className={styles.advice}>Дякуємо!</h1>
            <p className={styles.description}>
              {`Як тільки ми отримаємо заявку -\n одразу вам передзвонимо!  `}
            </p>
          </div>
        </div>
      </ContentWrapper>
    </div>
  );
};
