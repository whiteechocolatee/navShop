import React from "react";
import styles from "./input.module.css";

export const Input = ({
  className = "",
  onChange = () => null,
  type = "",
  placeholder = "",
  name = "",
  inputClassName = "",
}) => {
  return (
    <div className={`${className}`}>
      <input
        type={type}
        placeholder={placeholder}
        name={name}
        onChange={onChange}
        className={`${styles.input}`}
      />
    </div>
  );
};
