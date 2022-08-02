import React from "react";
import styles from "./card.module.css";
import { ImageComponent } from "../Image/Image";

export const UserOrderCard = ({
  itemImage,
  title,
  price,
  id,
  count,
  totalPrice,
}) => {
  return (
    <div className={styles.orderCard}>
      <div className={styles.imageBlock}>
        <ImageComponent publicId={itemImage} alt={title} />
      </div>
      <div className={styles.title}>
        <h6 className={styles.titles}>{title}</h6>
      </div>
      <div className={styles.pricePerItem}>
        <h6 className={styles.titles}>{price} ₴</h6>
      </div>
      <div className={styles.qty}>
        <div>К-ть: {count}</div>
      </div>
      <div className={styles.price}>
        <h6 className={styles.titles}>
          <b>{totalPrice} ₴</b>
        </h6>
      </div>
    </div>
  );
};
