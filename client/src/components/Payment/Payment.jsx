import React, { useState } from "react";
import styles from "./payment.module.css";
import { FaCcPaypal } from "react-icons/fa";
import { TbCashBanknote } from "react-icons/tb";
import { BsCreditCard } from "react-icons/bs";

export const Payment = () => {
  const [method, setMethod] = useState("cardPayment");

  const handleChange = (event) => {
    setMethod(event.target.value);
  };

  return (
    <div className={styles.paymentBlock}>
      <h4>Способи оплати</h4>
      <div className={styles.payment}>
        <div className={styles.label}>
          <input
            id='card'
            type='radio'
            value='cardPayment'
            onChange={handleChange}
            checked={method === "cardPayment"}
          />
          <label htmlFor='card'>
            <BsCreditCard />
            Оплата карткою
          </label>
        </div>
        <div className={styles.label}>
          <input
            id='cash'
            type='radio'
            value='cash'
            onChange={handleChange}
            checked={method === "cash"}
          />
          <label htmlFor='cash'>
            {" "}
            <TbCashBanknote /> Оплата готівкою
          </label>
        </div>
        <div className={styles.label}>
          <input
            id='paypal'
            type='radio'
            value='paypal'
            onChange={handleChange}
            checked={method === "paypal"}
          />
          <label htmlFor='paypal'>
            <FaCcPaypal /> PayPal
          </label>
        </div>
      </div>
    </div>
  );
};
