import React, { useState } from "react";
import styles from "./filter.module.css";
import { BsPlusLg } from "react-icons/bs";
import { HiMinus } from "react-icons/hi";

export const Filter = ({ characteristic }) => {
  const [selected, setSelected] = useState(null);

  const toggle = (i) => {
    if (selected === i) {
      return setSelected(null);
    }
    setSelected(i);
  };

  return (
    <div className={styles.accordion}>
      {characteristic?.map((item) => (
        <div className={styles.item}>
          <div
            className={styles.title}
            onClick={() => toggle(item._id)}>
            <span>{item.name}</span>
            <span>
              {selected === item._id ? (
                <HiMinus />
              ) : (
                <BsPlusLg />
              )}
            </span>
          </div>
          <div
            className={
              selected === item._id
                ? `${styles.content} ${styles.show}`
                : styles.content
            }>
            {item?.description?.map((text) => (
              <p>{text}</p>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
