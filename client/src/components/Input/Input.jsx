import React from "react";
import styles from "./input.module.css";

export const Input = ({
  className = "",
  onChange = () => null,
  type = "",
  placeholder = "",
  name = "",
}) => {
  return (
    <div className={`${className} ${styles.container}`}>
      <input
        type={type}
        placeholder={placeholder}
        name={name}
        onChange={onChange}
        className={styles.input}
      />
    </div>
  );
};
