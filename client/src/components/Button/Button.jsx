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
      className={`${styles.buttonContainer} ${containerClassName}`}>
      <span
        className={`${styles.button} ${className}`}
        onClick={onClick}>
        {children}
      </span>
    </div>
  );
};
