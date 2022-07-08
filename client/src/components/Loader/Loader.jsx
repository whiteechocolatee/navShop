import React from "react";
import styles from "./loader.module.css";
import { ThreeDots } from "react-loader-spinner";

export const Loader = () => {
  return (
    <div className={styles.spinner}>
      <ThreeDots color='#B1CDF5' width='100' />
    </div>
  );
};
