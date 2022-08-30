import React from "react";
import styles from "./orderSuccess.module.css";

import { Popup } from "../../Popup/Popup";

export const OrderSuccess = ({ active, setActive }) => {
  return (
    <Popup active={active} setActive={setActive}>
      <div className={styles.popupBody}>
        <h1>Дякуємо</h1>
        <h3>Ваше замовлення прийнято у роботу!</h3>
        <h4>Вам зателефоную менеджер</h4>
        <h4>Гарного дня!</h4>
      </div>
    </Popup>
  );
};
