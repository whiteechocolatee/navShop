import React from "react";
import styles from "./payment.module.css";
import { FaCcPaypal } from "react-icons/fa";
import { TbCashBanknote } from "react-icons/tb";
import { BsCreditCard } from "react-icons/bs";

export const Payment = ({ values, handleChange }) => {
  return (
    <div className={styles.paymentBlock}>
      <h4>Способи оплати</h4>
      <div className={styles.payment}>
        <div className={styles.label}>
          <input
            id='card'
            name='paymentMethod'
            type='radio'
            value='cardPayment'
            onChange={handleChange}
            checked={values.paymentMethod === "cardPayment"}
          />
          <label htmlFor='card'>
            <BsCreditCard />
            Оплата карткою
          </label>
        </div>
        <div className={styles.label}>
          <input
            name='paymentMethod'
            id='cash'
            type='radio'
            value='cash'
            onChange={handleChange}
            checked={values.paymentMethod === "cash"}
          />
          <label htmlFor='cash'>
            {" "}
            <TbCashBanknote /> Оплата готівкою
          </label>
        </div>
        {/* <div className={styles.label}>
          <input
            name='paymentMethod'
            id='paypal'
            type='radio'
            value='paypal'
            onChange={handleChange}
            checked={values.paymentMethod === "paypal"}
          />
          <label htmlFor='paypal'>
            <FaCcPaypal /> PayPal
          </label>
        </div> */}
      </div>
    </div>
  );
};
