import React, { useState } from "react";
import styles from "./input.module.css";

export const Input = (props) => {
  const {
    className,
    errorMessage,
    onChange,
    error,
    ...inputProps
  } = props;

  const [focused, setFocused] = useState(false);

  const handleFocus = (e) => {
    setFocused(true);
  };

  return (
    <div className={`${styles.inputClassName}`}>
      <input
        {...inputProps}
        onChange={onChange}
        className={`${styles.input} ${className}`}
        onBlur={handleFocus}
        focused={focused.toString()}
      />
      <span className={styles.validate}>
        {errorMessage}
      </span>
      {error && (
        <span className={styles.error}>{error}</span>
      )}
    </div>
  );
};
