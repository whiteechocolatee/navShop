import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

import styles from "./cart.module.css";
import { IoCartOutline } from "react-icons/io5";
import { paths } from "../../paths";

export const Cart = () => {
  const cart = useSelector((state) => {
    return state.cartReducer.itemsInCart;
  });

  return (
    <NavLink
      aria-current='page'
      className={`nav-link`}
      to={paths.order}>
      <div className={styles.cartBody}>
        <IoCartOutline />
        <div
          className={
            cart.length > 0
              ? styles.itemQuantity
              : styles.hide
          }>
          {cart.length}
        </div>
      </div>
    </NavLink>
  );
};
