import React from "react";
import styles from "./block.module.css";

export const StatisticBlock = ({
  svg,
  data,
  title,
  cName,
}) => {
  return (
    <div className={`${styles.statisticBlock} ${cName}`}>
      <div className={styles.statisticIcon}>{svg}</div>
      <div className={styles.description}>
        <p>
          <b>{title}</b>
        </p>
        <span>{data}</span>
      </div>
    </div>
  );
};
