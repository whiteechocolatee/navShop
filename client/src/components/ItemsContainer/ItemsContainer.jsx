import React from "react";
import { Item } from "../ItemCard/Item";
import styles from "./ItemsContainer.module.css";

export const ItemsContainer = ({ currentItems = [] }) => {
  return (
    <div className={styles.container}>
      {currentItems.map((item, index) => (
        <Item
          key={index}
          title={item.title}
          price={item.price}
          itemImg={item.itemImage}
          discount={item.discount}
        />
      ))}
    </div>
  );
};
