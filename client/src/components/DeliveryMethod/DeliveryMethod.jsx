import React, { useEffect } from "react";
import { Checkbox } from "../Checkbox/Checkbox";
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
        <Checkbox
          onChange={handleChange}
          name='shippingMethod'
          checkedValue={
            values.shippingMethod === "localPickup"
          }
          value='localPickup'
          children='Самовивіз'
          containerClassName={styles.checkbox}
        />
        <Checkbox
          onChange={handleChange}
          name='shippingMethod'
          checkedValue={
            values.shippingMethod === "novaPoshta"
          }
          value='novaPoshta'
          children='Доставка Новою Поштою'
          containerClassName={styles.checkbox}
        />
        <Checkbox
          onChange={handleChange}
          name='shippingMethod'
          checkedValue={values.shippingMethod === "poshta"}
          value='poshta'
          children='Доставка поштою'
          containerClassName={styles.checkbox}
        />
        <Checkbox
          onChange={handleChange}
          name='shippingMethod'
          checkedValue={values.shippingMethod === "courier"}
          value='courier'
          children="Доставка кур'єром"
          containerClassName={styles.checkbox}
        />
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
