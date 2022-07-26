import React from "react";
import styles from "./filter.module.css";
import { BsPlusLg } from "react-icons/bs";

export const Filter = () => {
  const handleClick = (e) => {
    const filter = e.target.children[2];
    const svg = e.target.children[1];

    svg.classList.toggle(styles.rotateForward);
    filter.classList.toggle(styles.show);
  };

  return (
    <div className={styles.filter}>
      <div className={styles.filterTitle}>
        <h3>Фільтр</h3>
      </div>
      <div className={styles.filterBtns}>
        <div
          onClick={handleClick}
          className={`${styles.filterBtn} 
        `}>
          <p>Колір</p>
          <BsPlusLg className={styles.rotateBack} />
          <div className={styles.hide}>
            <h1>hello</h1>
          </div>
        </div>
        <div
          onClick={handleClick}
          className={`${styles.filterBtn} 
        `}>
          <p>Пам'ять</p>
          <BsPlusLg className={styles.rotateBack} />
          <div className={styles.hide}>
            <h1>hello</h1>
          </div>
        </div>
        <div
          onClick={handleClick}
          className={`${styles.filterBtn} 
        `}>
          <p>Модель</p>
          <BsPlusLg className={styles.rotateBack} />
          <div className={styles.hide}>
            <h1>hello</h1>
          </div>
        </div>
      </div>
    </div>
  );
};
