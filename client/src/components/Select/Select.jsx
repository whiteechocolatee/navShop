import React from "react";
import styles from "./select.module.css";

export const Select = ({
  name,
  optionValue,
  options,
  onChange,
}) => {
  return (
    <select
      className={styles.select}
      onChange={onChange}
      name={name}>
      <option defaultValue='#' disabled selected>
        {optionValue}
      </option>
      {options}
    </select>
  );
};
