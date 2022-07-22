import React from "react";
import { Item } from "../ItemCard/Item";
import styles from "./ItemsContainer.module.css";

export const ItemsContainer = ({ currentItems = [] }) => {
  return (
    <div className={styles.container}>
      {currentItems.map((item, index) => (
        <Item key={index} item={item} />
      ))}
    </div>
  );
};
