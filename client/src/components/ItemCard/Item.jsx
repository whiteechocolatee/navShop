import React, { useState } from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import styles from "./item.module.css";
import { Button } from "../Button/Button";
import { paths } from "../../paths";
import { ImageComponent } from "../Image/Image";
import { Popup } from "../Popup/Popup";
import { setItemInCart } from "../../store/cart/cartSlice";
import {
  checkIsAuth,
  addToFavorite,
  removeFromFavorites,
} from "../../store/users/userAuthSlice";

export const Item = ({ item }) => {
  const dispatch = useDispatch();
  const [buttonPopup, setButtonPopup] = useState(false);

  const { _id, title, price, itemImage, discount } = item;

  const cart = useSelector(
    (state) => state.cartReducer.itemsInCart,
  );

  const favorites = useSelector(
    (state) => state.userAuthReducer.favorites,
  );

  const isAuth = useSelector(checkIsAuth);

  const isItemInCart = cart?.some(
    (itemInCart) => itemInCart._id === item._id,
  );

  const isItemFavorite = favorites.some((favoriteItem) => {
    return favoriteItem._id === item._id;
  });

  const addToCart = (e) => {
    e.stopPropagation();

    if (isItemInCart) {
      return false;
    } else {
      dispatch(setItemInCart(item));
    }
  };

  const addToFavoriteFunc = () => {
    if (isAuth) {
      if (isItemFavorite) {
        dispatch(removeFromFavorites({ product: _id }));
      } else {
        dispatch(addToFavorite({ product: _id }));
      }
    } else {
      setButtonPopup(true);
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
          {isItemFavorite ? (
            <div
              onClick={addToFavoriteFunc}
              className={styles.svgBg}>
              <FaHeart />
            </div>
          ) : (
            <div
              onClick={addToFavoriteFunc}
              className={styles.svg}>
              <FaRegHeart />
            </div>
          )}
          <Popup
            setTrigger={setButtonPopup}
            trigger={buttonPopup}>
            <div className={styles.popupContent}>
              <h1 className={styles.popupTitle}>
                Додати у обране
              </h1>
              <p className={styles.popupText}>
                Для того щоб додати товар у обране, вам
                потрібно увійти в акаунт або створити його.
                Тоді усі товари будуть збережені в акаунті
              </p>
              <Button
                onClick={() => setButtonPopup(false)}
                containerClassName={styles.popupBtn}>
                Зрозуміло
              </Button>
            </div>
          </Popup>
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
