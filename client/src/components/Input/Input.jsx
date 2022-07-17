import React from "react";
import styles from "./input.module.css";

export const Input = ({
  className = "",
  onChange = () => null,
  type = "",
  placeholder = "",
  name = "",
  error = "",
}) => {
  return (
    <div className={styles.inputClassName}>
      <div className={className}>
        <input
          type={type}
          placeholder={placeholder}
          name={name}
          onChange={onChange}
          className={`${styles.input}`}
        />
      </div>
      {error && (
        <span className={styles.error}>{error}</span>
      )}
    </div>
  );
};
