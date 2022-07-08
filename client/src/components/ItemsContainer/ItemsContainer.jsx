import React, { useState, useEffect } from "react";
import { Item } from "../ItemCard/Item";
import styles from "./ItemsContainer.module.css";

export const ItemsContainer = ({ currentItems = [] }) => {
  console.log(currentItems);

  return (
    <div className={styles.container}>
      {currentItems.map((item, index) => (
        <Item
          key={index}
          title={item.title}
          price={item.price}
          itemImg={item.itemImage}
        />
      ))}
    </div>
  );
};
