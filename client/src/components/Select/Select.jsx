import React from "react";
import styles from "./select.module.css";

export const Select = ({
  name,
  options,
  onChange,
  value,
}) => {
  return (
    <select
      className={styles.select}
      onChange={onChange}
      name={name}>
      <option defaultValue={value} disabled selected>
        {value}
      </option>
      {options}
    </select>
  );
};
