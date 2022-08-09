import React from "react";
import styles from "./userFavorites.module.css";
import { paths } from "../../paths";
import { Link } from "react-router-dom";
import { FavoriteCard } from "../FavoriteCard/FavoriteCard";

export const UserFavorites = ({
  removeItem,
  favorites,
  cart,
  addToCart,
}) => {
  return favorites && favorites.length > 0 ? (
    <div>
      <div className={styles.navigation}>
        <Link className={styles.link} to={paths.main}>
          Головна
        </Link>
        <hr className={styles.border} />
        <Link className={styles.link} to={paths.order}>
          Обране
        </Link>
      </div>
      <div className={styles.titleContainer}>
        <h1 className={styles.title}>Обране</h1>
      </div>
      <div className={styles.favoritesContainer}>
        {favorites?.map((favorite) => (
          <FavoriteCard
            key={favorite._id}
            item={favorite}
            removeItem={removeItem}
            cart={cart}
            addToCart={addToCart}
          />
        ))}
      </div>
    </div>
  ) : (
    <div className={styles.empty}>
      <h1>Ви ще нічого не обрали :)</h1>
    </div>
  );
};
