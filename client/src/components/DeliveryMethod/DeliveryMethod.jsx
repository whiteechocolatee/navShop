import React, { useState } from "react";
import styles from "./deliveryMethod.module.css";

export const DeliveryMethod = () => {
  const [gender, setGender] = useState("localPickup");

  const handleChange = (event) => {
    console.log(event.target);
    setGender(event.target.value);
  };

  return (
    <div className={styles.deliveryMethod}>
      <h4 className={styles.deliveryTitle}>Доставка</h4>
      <div className={styles.methods}>
        <div className={styles.label}>
          <input
            type='radio'
            value='localPickup'
            checked={gender === "localPickup"}
            onChange={handleChange}
            id='localPickup'
          />
          <label htmlFor='localPickup'>Самовивіз</label>
        </div>
        <div className={styles.label}>
          <input
            id='nova'
            type='radio'
            value='novaPoshta'
            onChange={handleChange}
            checked={gender === "novaPoshta"}
          />
          <label htmlFor='nova'>
            Доставка новою поштою
          </label>
        </div>
      </div>
    </div>
  );
};
