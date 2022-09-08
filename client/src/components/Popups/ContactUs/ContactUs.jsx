import React from "react";

import { Popup } from "../../Popup/Popup";
import styles from "./contactUs.module.css";

export const ContactUs = ({ active, setActive }) => {
  return (
    <Popup active={active} setActive={setActive}>
      <h1>Наші контакти</h1>
      <div className={styles.popupInner}>
        <h5>Номери</h5>
        <p>Номер для зв'язку - 0 97 575 35 58</p>
        <h5>Cоц. мережі</h5>
        <p>
          Телеграм -{" "}
          <a href='https://t.me/gribuastore'>
            @gribuastore
          </a>
        </p>
        <h5>
          Ви також маєте змогу залишити свою заявку, та ми
          вам передзвонимо!
        </h5>
      </div>
    </Popup>
  );
};
