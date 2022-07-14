import React from "react";
import styles from "./item.module.css";

import { FaRegHeart } from "react-icons/fa";
import { Button } from "../Button/Button";

import { Image } from "cloudinary-react";
import { Link } from "react-router-dom";
import { paths } from "../../paths";

export const Item = ({
  title = "",
  price = "",
  itemImg = "",
  discount = "",
  id = "",
}) => {
  return (
    <div className={styles.cardBody}>
      <Link className={styles.itemLink} to={`${paths.itemPage}/${id}`}>
        <div className={styles.cardImageBlock}>
          <div className={styles.addToFavorite}>
            <div
              className={`${
                discount > 0 ? styles.sale : styles.saleNone
              }`}>
              {discount} %
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
            {discount > 0
              ? Math.ceil(price - (price / 100) * discount)
              : price}{" "}
            ₴
          </span>
        </div>
      </Link>
    </div>
  );
};
