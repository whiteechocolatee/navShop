import React, { useEffect } from "react";
import styles from "./courier.module.css";
import { useSelector, useDispatch } from "react-redux";

import { Input } from "../Input/Input";
import {
  getCitiesByArea,
  getAreas,
  getAllDepartments,
} from "../../store/deliveryAddresses/deliverySlice";

import { Loader } from "../Loader/Loader";
import { Select } from "../Select/Select";

export const Courier = ({ values, handleChange }) => {
  const dispatch = useDispatch();

  const { isLoading, reducerLoading, areas, cities } =
    useSelector((state) => state.deliveryReducer);

  const handleCities = (e) => {
    dispatch(getCitiesByArea(e.target.value));
  };

  useEffect(() => {
    dispatch(getAreas());
    dispatch(getAllDepartments());
  }, [dispatch]);

  if (reducerLoading || isLoading) {
    return <Loader containerClassName={styles.loader} />;
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
        <Select
          name='area'
          onChange={(e) => {
            handleChange(e);
            handleCities(e);
          }}
          value={values.area}
          optionValue='Виберіть область'
          options={areas.map((area, index) => (
            <option key={index} value={area.Description}>
              {area.Description}
            </option>
          ))}
        />
      </div>
      <div className={styles.dataBlock}>
        <Select
          name='city'
          onChange={handleChange}
          value={values.city}
          optionValue='Виберіть населенний пункт'
          options={cities.map((city, index) => (
            <option key={index} value={city}>
              {`${city}`}
            </option>
          ))}
        />
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
