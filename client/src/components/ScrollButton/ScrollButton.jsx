import React, { useState } from "react";
import { FaArrowCircleUp } from "react-icons/fa";

import styles from "./scroll.module.css";

export const ScrollButton = () => {
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 500) {
      setVisible(true);
    } else if (scrolled <= 550) {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
    });
  };

  window.addEventListener("scroll", toggleVisible);

  return (
    <div
      className={
        visible
          ? `${styles.scrollToTop} ${styles.active}`
          : styles.scrollToTop
      }>
      <div
        className={styles.scrollBtn}
        onClick={scrollToTop}>
        <FaArrowCircleUp className={styles.svg} />
      </div>
    </div>
  );
};
