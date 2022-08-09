import React from "react";
import { ImageComponent } from "../Image/Image";
import styles from "./favoriteCard.module.css";
import { Button } from "../Button/Button";
import { FaHeart } from "react-icons/fa";

export const FavoriteCard = ({
  item,
  removeItem,
  cart,
  addToCart,
}) => {
  const isItemInCart = cart?.some(
    (itemInCart) => itemInCart._id === item._id,
  );

  return (
    <div className={styles.cardBody}>
      <div className={styles.cardImg}>
        <ImageComponent
          publicId={item.itemImage}
          alt={item.title}
        />
      </div>
      <div className={styles.cardContent}>
        <p className={styles.title}>{item.title}</p>
        <p className={styles.price}>{item.price} ₴</p>
        <div
          onClick={() => removeItem({ product: item._id })}
          className={styles.svgContainer}>
          <FaHeart />
          <p className={styles.remove}>
            видалити з обраних
          </p>
        </div>
      </div>
      <div className={styles.cardBtn}>
        <Button
          onClick={() => !isItemInCart && addToCart(item)}
          children={isItemInCart ? "У кошику" : "В кошик"}
          containerClassName={styles.btn}
        />
      </div>
    </div>
  );
};
