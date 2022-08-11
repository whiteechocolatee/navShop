import React, { useState } from "react";
import styles from "./filter.module.css";
import { BsPlusLg } from "react-icons/bs";
import { HiMinus } from "react-icons/hi";

export const Filter = ({ data }) => {
  const [selected, setSelected] = useState(null);

  const toggle = (i) => {
    if (selected === i) {
      return setSelected(null);
    }

    setSelected(i);
  };

  return (
    <div className={styles.accordion}>
      {data.map((item, index) => (
        <div className={styles.item}>
          <div
            className={styles.title}
            onClick={() => toggle(index)}>
            <span>{item.question}</span>
            <span>
              {selected === index ? (
                <HiMinus />
              ) : (
                <BsPlusLg />
              )}
            </span>
          </div>
          <div
            className={
              selected === index
                ? `${styles.content} ${styles.show}`
                : styles.content
            }>
            {item.answer}
          </div>
        </div>
      ))}
    </div>
  );
};
