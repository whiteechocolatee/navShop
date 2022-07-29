import React, { useState } from "react";
import styles from "./orderCard.module.css";

import { useDispatch } from "react-redux";

import { ImageComponent } from "../Image/Image";
import { BiTrash, BiPlus, BiMinus } from "react-icons/bi";
import { removeItemFromCart } from "../../store/cart/cartSlice";

export const OrderCard = ({
  itemImage,
  title,
  price,
  id,
}) => {
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();

  const handleDelete = (e) => {
    e.stopPropagation();
    dispatch(removeItemFromCart(id));
  };

  const addOne = (e) => {
    e.stopPropagation();
    setQty(qty + 1);
  };
  const removeOne = (e) => {
    e.stopPropagation();
    setQty(qty - 1);
    if (qty < 2) {
      dispatch(removeItemFromCart(id));
    }
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
        <div className={styles.qtyBtns} onClick={removeOne}>
          <BiMinus />
        </div>
        <div>{qty}</div>
        <div className={styles.qtyBtns} onClick={addOne}>
          <BiPlus />
        </div>
      </div>
      <div className={styles.pricePerItem}>
        <h6 className={styles.titles}>{price}</h6>
      </div>
      <div className={styles.price}>
        <h6 className={styles.titles}>
          <b>{price * qty}</b>
        </h6>
      </div>
      <div onClick={handleDelete} className={styles.remove}>
        <BiTrash />
      </div>
    </div>
  );
};
