import React from "react";
import { Item } from "../ItemCard/Item";
import styles from "./ItemsContainer.module.css";

export const ItemsContainer = ({
  containerClassName,
  currentItems = [],
}) => {
  return (
    <div
      className={`${styles.container} ${containerClassName}`}>
      {currentItems.map((item, index) => (
        <Item key={index} item={item} />
      ))}
    </div>
  );
};
