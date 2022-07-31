import React, { useState } from "react";
import { Map } from "../MapContainer/Map";
import { NovaPoshta } from "../NovaPoshta/NovaPoshta";
import styles from "./deliveryMethod.module.css";

export const DeliveryMethod = () => {
  const [method, setMethod] = useState("localPickup");

  const handleChange = (event) => {
    console.log(event.target);
    setMethod(event.target.value);
  };

  return (
    <div className={styles.deliveryMethod}>
      <h4 className={styles.deliveryTitle}>Доставка</h4>
      <div className={styles.methods}>
        <div className={styles.label}>
          <input
            type='radio'
            value='localPickup'
            checked={method === "localPickup"}
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
            checked={method === "novaPoshta"}
          />
          <label htmlFor='nova'>
            Доставка Новою Поштою
          </label>
        </div>
      </div>
      <div className={styles.wayOfMethod}>
        {method === "localPickup" && (
          <div className={styles.mapContainer}>
            <p>
              <b>
                ТРК "Клас" (Проспект Тракторобудівників,
                128в) , другий поверх.
              </b>
            </p>
            <Map />
          </div>
        )}
        {method === "novaPoshta" && <NovaPoshta />}
      </div>
    </div>
  );
};
