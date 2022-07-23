import React from "react";
import styles from "./orderCard.module.css";
import { ImageComponent } from "../Image/Image";

export const OrderCard = ({ itemImage, title, price }) => {
  return (
    <div className={styles.orderCard}>
      <div className={styles.imageBlock}>
        <ImageComponent publicId={itemImage} alt={title} />
      </div>
      <div className={styles.title}>
        <h3>{title}</h3>
      </div>
      <div className={styles.price}>
        <h2>{price}</h2>
      </div>
    </div>
  );
};
