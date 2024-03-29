import React, { useState } from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import styles from "./addToFavorite.module.css";
import { Popup } from "../Popup/Popup";
import { Button } from "../Button/Button";
import { paths } from "../../paths";

import {
  checkIsAuth,
  addToFavorite,
  removeFromFavorites,
} from "../../store/users/userAuthSlice";

export const AddToFavorite = ({
  item,
  alreadyFavorite,
  toBeFavorite,
}) => {
  const [active, setActive] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isAuth = useSelector(checkIsAuth);

  const favorites = useSelector(
    (state) => state.userAuthReducer.favorites,
  );

  const isItemFavorite = favorites.some((favoriteItem) => {
    return favoriteItem._id === item._id;
  });

  const addToFavoriteFunc = () => {
    if (isAuth) {
      if (isItemFavorite) {
        dispatch(
          removeFromFavorites({ product: item._id }),
        );
      } else {
        dispatch(addToFavorite({ product: item._id }));
      }
    } else {
      setActive(true);
    }
  };

  return (
    <>
      <Popup
        className={styles.popupClass}
        setActive={setActive}
        active={active}>
        <div className={styles.popupContent}>
          <h1 className={styles.popupTitle}>
            Додати у обране
          </h1>
          <p className={styles.popupText}>
            Для того щоб додати товар у обране, вам потрібно
            увійти в акаунт або створити його. Тоді усі
            товари будуть збережені в акаунті
          </p>
          <Button
            onClick={() => navigate(paths.signup)}
            containerClassName={styles.popupBtn}>
            Створити
          </Button>
        </div>
      </Popup>
      {isItemFavorite ? (
        <div
          onClick={addToFavoriteFunc}
          className={styles.svgBg}>
          <FaHeart />
          {alreadyFavorite}
        </div>
      ) : (
        <div
          onClick={addToFavoriteFunc}
          className={styles.svg}>
          <FaRegHeart />
          {toBeFavorite}
        </div>
      )}
    </>
  );
};
