import React from "react";
import styles from "./item.module.css";

import { FaRegHeart } from "react-icons/fa";
import { Button } from "../Button/Button";

import { Image } from "cloudinary-react";

export const Item = ({
  title = "",
  price = "",
  itemImg = "",
  sale = "",
}) => {
  // const sale = false;

  return (
    <div className={styles.cardBody}>
      <div className={styles.cardImageBlock}>
        <div className={styles.addToFavorite}>
          <div
            className={`${
              sale !== "" ? styles.sale : styles.saleNone
            }`}>
            {sale} %
          </div>
          <FaRegHeart />
        </div>
        <div className={styles.cardImg}>
          <Image
            cloudName='dmhqzwtnd'
            publicId={itemImg}
            alt={title}
          />
        </div>
      </div>
      <div className={styles.description}>{title}</div>
      <div className={styles.addToCart}>
        <Button
          className={styles.btnText}
          containerClassName={styles.btnContainer}
          children={`В корзину`}
        />
        <span className={styles.price}>
          {sale != ""
            ? Math.ceil(price - (price / 100) * sale)
            : price}{" "}
          ₴
        </span>
      </div>
    </div>
  );
};
