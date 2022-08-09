import React from "react";
import { GrFormClose } from "react-icons/gr";
import styles from "./popup.module.css";

export const Popup = ({
  children,
  trigger,
  setTrigger,
}) => {
  return trigger ? (
    <div
      onClick={() => setTrigger(false)}
      className={styles.popup}>
      <div
        onClick={(e) => e.stopPropagation()}
        className={styles.popupInner}>
        <button
          onClick={() => setTrigger(false)}
          className={styles.closeBtn}>
          <GrFormClose />
        </button>
        {children}
      </div>
    </div>
  ) : (
    ""
  );
};
