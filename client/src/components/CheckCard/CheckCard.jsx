import React from "react";
import { ImageComponent } from "../Image/Image";
import styles from "./card.module.css";

export const CheckCard = ({
  alt,
  publicId,
  price,
  count,
  title,
  imageClass,
  bodyClass,
}) => {
  return (
    <div className={styles.cardBody}>
      <div className={`${styles.cardImage} ${imageClass}`}>
        <ImageComponent publicId={publicId} alt={alt} />
      </div>
      <div className={`${styles.cardInfo} ${bodyClass}`}>
        <div className={styles.cardTitle}>{title}</div>
        <div className={styles.cardDesc}>
          <p>{price} ₴</p>
          <p>К-ть: {count}</p>
        </div>
      </div>
    </div>
  );
};
