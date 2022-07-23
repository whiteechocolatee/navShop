import React from "react";

import { useDispatch, useSelector } from "react-redux";

import styles from "./item.module.css";
import { FaRegHeart } from "react-icons/fa";
import { Button } from "../Button/Button";

import { Link } from "react-router-dom";
import { paths } from "../../paths";
import { ImageComponent } from "../Image/Image";
import {
  removeItemFromCart,
  setItemInCart,
} from "../../store/cart/cartSlice";

export const Item = ({ item }) => {
  const dispatch = useDispatch();

  const { _id, title, price, itemImage, discount } = item;

  const cart = useSelector(
    (state) => state.cartReducer.itemsInCart,
  );

  const isItemInCart = cart.some(
    (itemInCart) => itemInCart._id === item._id,
  );

  const addToCart = (e) => {
    e.stopPropagation();

    if (isItemInCart) {
      dispatch(removeItemFromCart(item._id));
    } else {
      dispatch(setItemInCart(item));
    }
  };

  return (
    <div className={styles.cardBody}>
      <Link
        className={styles.itemLink}
        to={`${paths.itemPage}/${_id}`}>
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
            <ImageComponent
              publicId={itemImage}
              alt={title}
            />
          </div>
        </div>
        <div className={styles.description}>{title}</div>
      </Link>
      <div className={styles.addToCart}>
        <Button
          onClick={addToCart}
          className={styles.btnText}
          containerClassName={styles.btnContainer}
          children={
            isItemInCart ? `Убрать из корзины` : `В корзину`
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
