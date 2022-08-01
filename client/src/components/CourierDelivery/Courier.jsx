import React, { useState } from "react";
import styles from "./courier.module.css";
import { useSelector, useDispatch } from "react-redux";

import { Input } from "../Input/Input";
import {
  getCitiesByArea,
  getDepartmentsByCity,
} from "../../store/deliveryAddresses/deliverySlice";

import { Loader } from "../Loader/Loader";

export const Courier = () => {
  const dispatch = useDispatch();

  const {
    reducerLoading,
    areas,
    cities,
    departmentByCity,
  } = useSelector((state) => state.deliveryReducer);

  const handleCities = (e) => {
    dispatch(getCitiesByArea(e.target.value));
  };

  const handleDepartments = (e) => {
    dispatch(getDepartmentsByCity(e.target.value));
  };

  const [values, setValues] = useState({
    area: "",
    city: "",
    index: "",
    street: "",
  });

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
        "Не повинно мати літери або символи, максимальна довжина 6 символів.",
      pattern: "^[0-9]{6}$",
      required: true,
    },
    {
      id: 2,
      name: "street",
      type: "text",
      placeholder: "Вкажіть вулицю",
      errorMessage:
        "Не повинно мати цифри або символи, максимальна довжина 25 символів.",
      pattern: "^[ A-Za-zА-ЩЬЮЯҐЄІЇа-щьюяґєії0-9]{3,20}$",
      required: true,
    },
  ];

  const onChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className={styles.courierBlock}>
      <div className={styles.dataBlock}>
        <select
          name='area'
          onChange={(e) => {
            onChange(e);
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
        <select name='city' onChange={onChange}>
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
            onChange={onChange}
          />
        </div>
      ))}
    </div>
  );
};
