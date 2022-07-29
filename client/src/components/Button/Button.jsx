import React from "react";
import styles from "./button.module.css";

export const Button = ({
  containerClassName = "",
  className = "",
  children = "",
  onClick = () => null,
}) => {
  return (
    <div
      className={`${containerClassName} ${styles.buttonContainer}`}
      onClick={onClick}>
      <span className={`${styles.button} ${className}`}>
        {children}
      </span>
      {/* <input type='submit' className={`${styles.button} ${className}`} value={children} /> */}
    </div>
  );
};
