import React from "react";
import styles from "./checkbox.module.css";

export const Checkbox = ({
  onChange,
  checkedValue,
  value,
  name,
  children,
  containerClassName,
}) => {
  return (
    <div
      className={`${styles.label} ${containerClassName}`}>
      <input
        name={name}
        id={value}
        type='radio'
        value={value}
        onChange={onChange}
        checked={checkedValue}
      />
      <label htmlFor={value}>{children}</label>
    </div>
  );
};
