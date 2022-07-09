import React from "react";
import styles from "./item.module.css";

import { FaRegHeart } from "react-icons/fa";
import { Button } from "../Button/Button";

export const Item = ({
  title = "",
  price = "",
  itemImg = "",
}) => {

  
  const sale = false;

  return (
    <div className={styles.cardBody}>
      <div className={styles.cardImageBlock}>
        <div className={styles.addToFavorite}>
          <div
            className={`${
              sale ? styles.sale : styles.saleNone
            }`}>
            % sale
          </div>
          <FaRegHeart />
        </div>
        <div className={styles.cardImg}>
          <img src={itemImg} alt='image' />
        </div>
      </div>
      <div className={styles.description}>{title}</div>
      <div className={styles.addToCart}>
        <Button
          className={styles.btnText}
          containerClassName={styles.btnContainer}
          children={`В корзину`}
        />
        <span className={styles.price}>{price} ₴</span>
      </div>
    </div>
  );
};
