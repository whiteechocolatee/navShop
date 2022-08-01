import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCitiesByArea,
  getDepartmentsByCity,
} from "../../store/deliveryAddresses/deliverySlice";
import styles from "./poshta.module.css";
import { Loader } from "../Loader/Loader";

export const NovaPoshta = ({ values, handleChange }) => {
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

  if (reducerLoading) {
    return <Loader />;
  }

  console.log(departmentByCity);

  return (
    <div className={styles.selects}>
      <div>
        <select
          name='area'
          className={styles.select}
          onChange={(e) => {
            handleCities(e);
            handleChange(e);
          }}>
          <option defaultValue='#' disabled selected>
            Виберіть область
          </option>
          {areas.map((area, index) => (
            <option key={index} value={area.Description}>
              {area.Description}
            </option>
          ))}
        </select>
      </div>
      <div>
        <select
          name='city'
          className={styles.select}
          onChange={(e) => {
            handleDepartments(e);
            handleChange(e);
          }}>
          <option defaultValue='#' disabled selected>
            Виберіть населенний пункт
          </option>
          {cities.map((city, index) => (
            <option key={index} value={city}>
              {`${city}`}
            </option>
          ))}
        </select>
      </div>
      <div>
        <select
          onChange={handleChange}
          name='department'
          className={styles.select}>
          <option defaultValue='#' disabled selected>
            Виберіть відділення
          </option>
          {departmentByCity.map((department, index) => (
            <option
              key={index}
              value={department.Description}>
              {`${department.Description}`}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
