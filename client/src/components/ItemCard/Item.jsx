import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import styles from "./item.module.css";
import { Button } from "../Button/Button";
import { paths } from "../../paths";
import { ImageComponent } from "../Image/Image";
import { AddToFavorite } from "../AddToFavorite/AddToFavorite";

import { setItemInCart } from "../../store/cart/cartSlice";

export const Item = ({ item }) => {
  const dispatch = useDispatch();

  const { _id, title, price, itemImage, discount } = item;

  const cart = useSelector(
    (state) => state.cartReducer.itemsInCart,
  );

  const isItemInCart = cart?.some(
    (itemInCart) => itemInCart._id === item._id,
  );

  const addToCart = (e) => {
    e.stopPropagation();

    if (isItemInCart) {
      return false;
    } else {
      dispatch(setItemInCart(item));
    }
  };

  return (
    <div className={styles.cardBody}>
      <div className={styles.cardImageBlock}>
        <div className={styles.addToFavorite}>
          <div
            className={`${
              discount > 0 ? styles.sale : styles.saleNone
            }`}>
            {discount} %
          </div>
          <AddToFavorite item={item} />
        </div>
        <Link
          className={styles.itemLink}
          to={`${paths.itemPage}/${_id}`}>
          <div className={styles.cardImg}>
            <ImageComponent
              publicId={itemImage}
              alt={title}
            />
          </div>
        </Link>
      </div>
      <Link
        className={styles.itemLink}
        to={`${paths.itemPage}/${_id}`}>
        <div className={styles.description}>{title}</div>
      </Link>
      <div className={styles.addToCart}>
        <Button
          onClick={addToCart}
          className={styles.btnText}
          containerClassName={styles.btnContainer}
          children={
            isItemInCart ? `В кошику` : `Додати в кошик`
          }
        />
        <span className={styles.price}>
          {discount > 0
            ? Math.ceil(price - (price / 100) * discount)
            : price}{" "}
          ₴
        </span>
      </div>
    </div>
  );
};
