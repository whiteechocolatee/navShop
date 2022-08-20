import React from "react";

import styles from "./userNav.module.css";
import { Popup } from "../../Popup/Popup";
import { Button } from "../../Button/Button";
import { useNavigate } from "react-router-dom";
import { paths } from "../../../paths";

export const UserNavigation = ({
  active,
  setActive,
  logout,
}) => {
  const navigate = useNavigate();
  return (
    <Popup
      className={styles.popupBody}
      active={active}
      setActive={setActive}>
      <div>
        <Button
          containerClassName={styles.navBtn}
          children='Мої дані'
          onClick={() => navigate(paths.account)}
        />
      </div>
      <div>
        <Button
          containerClassName={styles.navBtn}
          children='Змінити пароль'
          onClick={() => navigate(paths.updatePassword)}
        />
      </div>
      <div>
        <Button
          containerClassName={styles.navBtn}
          children='Замовлення'
          onClick={() => navigate(paths.userOrders)}
        />
      </div>
      <div>
        <Button
          containerClassName={styles.navBtnLogout}
          children='вийти'
          onClick={logout}
        />
      </div>
    </Popup>
  );
};
