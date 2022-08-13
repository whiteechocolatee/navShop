import React from "react";
import { GrFormClose } from "react-icons/gr";
import styles from "./popup.module.css";

export const Popup = ({
  children,
  active,
  setActive,
  className,
}) => {
  return (
    <div
      onClick={() => setActive(false)}
      className={
        active
          ? `${styles.popup} ${styles.active}`
          : styles.popup
      }>
      <div
        onClick={(e) => e.stopPropagation()}
        className={
          active
            ? `${styles.popupInner} ${styles.activeInner} ${className}`
            : `${styles.popupInner} ${className}`
        }>
        <button
          onClick={() => setActive(false)}
          className={styles.closeBtn}>
          <GrFormClose />
        </button>
        {children}
      </div>
    </div>
  );
};
