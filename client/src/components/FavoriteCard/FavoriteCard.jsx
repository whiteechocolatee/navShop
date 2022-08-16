import React from "react";
import { ImageComponent } from "../Image/Image";
import styles from "./favoriteCard.module.css";
import { Button } from "../Button/Button";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { paths } from "../../paths";

export const FavoriteCard = ({
  item,
  removeItem,
  cart,
  addToCart,
}) => {
  const isItemInCart = cart?.some(
    (itemInCart) => itemInCart._id === item._id,
  );

  let discountPrice = Math.ceil(
    item.price - (item.price / 100) * item.discount,
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
        <p className={styles.title}>
          <Link to={`${paths.itemPage}/${item._id}`}>
            {item.title}
          </Link>
        </p>
        {item.discount > 0 ? (
          <p className={styles.price}>
            <span className={styles.priceLine}>
              {item.price} ₴
            </span>
            <span className={styles.discountPrice}>
              {discountPrice} ₴
            </span>
          </p>
        ) : (
          <span>{item.price} ₴</span>
        )}

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
