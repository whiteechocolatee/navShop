import React, { useState } from "react";

import { Popup } from "../../Popup/Popup";
import styles from "./popup.module.css";
import { CheckCard } from "../../CheckCard/CheckCard";
import { Input } from "../../Input/Input";
import { Button } from "../../Button/Button";

export const BuyPerClick = ({
  active,
  setActive,
  discountPrice,
  title,
  itemImage,
  count,
  handleSubmit,
}) => {
  const [values, setValues] = useState({
    name: "",
    surname: "",
    phone: "",
    email: "",
  });

  const inputs = [
    {
      id: 1,
      name: "name",
      type: "text",
      placeholder: "Вкажіть ім'я",
      errorMessage:
        "Не повинно мати цифри або символи, максимальна довжина 20 символів.",
      pattern: "^[ A-Za-zА-ЩЬЮЯҐЄІЇа-щьюяґєії]{3,20}$",
      required: true,
    },
    {
      id: 2,
      name: "surname",
      type: "text",
      placeholder: "Вкажіть призвище",
      errorMessage:
        "Не повинно мати цифри або символи, максимальна довжина 20 символів.",
      pattern: "^[ A-Za-zА-ЩЬЮЯҐЄІЇа-щьюяґєії]{3,20}$",
      required: true,
    },
    {
      id: 3,
      name: "phone",
      placeholder: "Вкажіть номер телефону",
      errorMessage: "Номер повинен складатись з 8-12 цифр.",
      pattern: "^[0-9]{10,12}$",
      required: true,
    },
    {
      id: 4,
      name: "email",
      placeholder: "Вкажіть email",
      errorMessage: "Вкажіть email!",
      required: true,
    },
  ];

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Popup
      className={styles.popupBody}
      active={active}
      setActive={setActive}>
      <div className={styles.popupForm}>
        <h1>Купити в 1 клік</h1>
        <CheckCard
          imageClass={styles.popupImage}
          title={title}
          price={discountPrice}
          alt={title}
          publicId={itemImage}
          count={count}
        />
        <form onSubmit={handleSubmit}>
          {inputs.map((input) => (
            <div className={styles.input}>
              <Input
                key={input.id}
                {...input}
                value={values[input.name]}
                onChange={handleChange}
              />
            </div>
          ))}
          <Button containerClassName={styles.btn} >
            <input className={styles.submit} type="submit" value='Купити' />
          </Button>
        </form>
      </div>
    </Popup>
  );
};
