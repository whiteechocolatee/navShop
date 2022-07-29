import React from "react";
import styles from "./orderCard.module.css";

import { useDispatch } from "react-redux";

import { ImageComponent } from "../Image/Image";
import { BiTrash, BiPlus, BiMinus } from "react-icons/bi";
import {
  removeItemFromCart,
  increaseItem,
  decreaseItem,
} from "../../store/cart/cartSlice";

export const OrderCard = ({
  itemImage,
  title,
  price,
  id,
  count,
  totalPrice,
}) => {
  const dispatch = useDispatch();

  const handleDelete = (e) => {
    e.stopPropagation();
    dispatch(removeItemFromCart(id));
  };

  return (
    <div className={styles.orderCard}>
      <div className={styles.imageBlock}>
        <ImageComponent publicId={itemImage} alt={title} />
      </div>
      <div className={styles.title}>
        <h6 className={styles.titles}>{title}</h6>
      </div>
      <div className={styles.qty}>
        <div
          className={styles.qtyBtns}
          onClick={() => dispatch(decreaseItem(id))}>
          <BiMinus />
        </div>
        <div>{count}</div>
        <div
          className={styles.qtyBtns}
          onClick={() => dispatch(increaseItem(id))}>
          <BiPlus />
        </div>
      </div>
      <div className={styles.pricePerItem}>
        <h6 className={styles.titles}>{price}</h6>
      </div>
      <div className={styles.price}>
        <h6 className={styles.titles}>
          <b>{totalPrice}</b>
        </h6>
      </div>
      <div onClick={handleDelete} className={styles.remove}>
        <BiTrash />
      </div>
    </div>
  );
};
