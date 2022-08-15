import React from "react";
import { Popup } from "../../Popup/Popup";

import styles from "./account.module.css";
import { Button } from "../../Button/Button";

export const AccountCreated = ({
  buttonPopup,
  setButtonPopup,
  navigate,
  paths,
}) => {
  return (
    <Popup
      className={styles.popupClass}
      setActive={setButtonPopup}
      active={buttonPopup}>
      <div className={styles.popupContent}>
        <h1 className={styles.popupTitle}>
          Ваш аккаунт було створено!
        </h1>
        <Button
          onClick={() => {
            setButtonPopup(false);
            navigate(paths.main);
          }}
          containerClassName={styles.popupBtn}>
          Повернутись до магазину
        </Button>
      </div>
    </Popup>
  );
};
