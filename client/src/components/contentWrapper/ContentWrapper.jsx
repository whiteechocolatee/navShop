import React from "react";
import styles from "./wrapper.module.css";

export const ContentWrapper = ({ className, children }) => {
  return (
    <div
      className={`container-xxl ${className} ${styles.content}`}>
      {children}
    </div>
  );
};
