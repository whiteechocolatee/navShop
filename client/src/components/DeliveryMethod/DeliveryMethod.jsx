import React, { useEffect } from "react";
import { Courier } from "../CourierDelivery/Courier";
import { Map } from "../MapContainer/Map";
import { NovaPoshta } from "../NovaPoshta/NovaPoshta";
import styles from "./deliveryMethod.module.css";

export const DeliveryMethod = ({
  values,
  handleChange,
}) => {
  return (
    <div className={styles.deliveryMethod}>
      <h4 className={styles.deliveryTitle}>Доставка</h4>
      <div className={styles.methods}>
        <div className={styles.label}>
          <input
            name='shippingMethod'
            type='radio'
            value='localPickup'
            checked={
              values.shippingMethod === "localPickup"
            }
            onChange={handleChange}
            id='localPickup'
          />
          <label htmlFor='localPickup'>Самовивіз</label>
        </div>
        <div className={styles.label}>
          <input
            name='shippingMethod'
            id='nova'
            type='radio'
            value='novaPoshta'
            onChange={handleChange}
            checked={values.shippingMethod === "novaPoshta"}
          />
          <label htmlFor='nova'>
            Доставка Новою Поштою
          </label>
        </div>
        <div className={styles.label}>
          <input
            name='shippingMethod'
            id='poshta'
            type='radio'
            value='poshta'
            onChange={handleChange}
            checked={values.shippingMethod === "poshta"}
          />
          <label htmlFor='poshta'>Доставка поштою</label>
        </div>
        <div className={styles.label}>
          <input
            name='shippingMethod'
            id='courier'
            type='radio'
            value='courier'
            onChange={handleChange}
            checked={values.shippingMethod === "courier"}
          />
          <label htmlFor='courier'>Доставка кур'єром</label>
        </div>
      </div>
      <div className={styles.wayOfMethod}>
        {values.shippingMethod === "localPickup" && (
          <div className={styles.mapContainer}>
            <p>
              <b>
                ТРК "Клас" (Проспект Тракторобудівників,
                128в) , другий поверх.
              </b>
            </p>
            {/* <Map /> */}
          </div>
        )}
        {values.shippingMethod === "novaPoshta" && (
          <NovaPoshta handleChange={handleChange} />
        )}
        {(values.shippingMethod === "courier" ||
          values.shippingMethod === "poshta") && (
          <Courier
            values={values}
            handleChange={handleChange}
          />
        )}
      </div>
    </div>
  );
};
