import React from "react";
import styles from "./wrapper.module.css";

export const ContentWrapper = ({ className, children }) => {
  return (
    <div
      className={`container-lg ${className} ${styles.fonts}`}>
      {children}
    </div>
  );
};
