import React, { useState } from "react";
import styles from "./courier.module.css";
import { useSelector, useDispatch } from "react-redux";

import { Input } from "../Input/Input";
import { getCitiesByArea } from "../../store/deliveryAddresses/deliverySlice";

import { Loader } from "../Loader/Loader";

export const Courier = ({ values, handleChange }) => {
  const dispatch = useDispatch();

  const { reducerLoading, areas, cities } = useSelector(
    (state) => state.deliveryReducer,
  );

  const handleCities = (e) => {
    dispatch(getCitiesByArea(e.target.value));
  };

  if (reducerLoading) {
    return <Loader />;
  }

  const customerInfo = [
    {
      id: 1,
      name: "index",
      type: "text",
      placeholder: "Вкажіть індекс",
      errorMessage:
        "Не повинно мати літери або символи, максимальна довжина 5 символів.",
      pattern: "^[0-9]{5}$",
      required: true,
    },
    {
      id: 2,
      name: "department",
      type: "text",
      placeholder: "Вкажіть вулицю",
      errorMessage:
        "Не повинно мати цифри або символи, максимальна довжина 25 символів.",
      pattern: "^[ A-Za-zА-ЩЬЮЯҐЄІЇа-щьюяґєії0-9]{3,30}$",
      required: true,
    },
  ];

  return (
    <div className={styles.courierBlock}>
      <div className={styles.dataBlock}>
        <select
          name='area'
          onChange={(e) => {
            handleChange(e);
            handleCities(e);
          }}>
          <option value='#' disabled selected>
            Виберіть область
          </option>
          {areas.map((area, index) => (
            <option key={index} value={area.Description}>
              {area.Description}
            </option>
          ))}
        </select>
      </div>
      <div className={styles.dataBlock}>
        <select name='city' onChange={handleChange}>
          <option value='#' disabled selected>
            Виберіть населенний пункт
          </option>
          {cities.map((city, index) => (
            <option key={index} value={city}>
              {`${city}`}
            </option>
          ))}
        </select>
      </div>
      {customerInfo.map((input) => (
        <div className={styles.dataBlock}>
          <Input
            key={input.id}
            {...input}
            className={styles.input}
            value={values[input.name]}
            onChange={handleChange}
          />
        </div>
      ))}
    </div>
  );
};
