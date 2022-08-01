import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCitiesByArea,
  getDepartmentsByCity,
} from "../../store/deliveryAddresses/deliverySlice";
import styles from "./poshta.module.css";
import { Loader } from "../Loader/Loader";

export const NovaPoshta = () => {
  const dispatch = useDispatch();

  const { reducerLoading, areas, cities, departmentByCity } =
    useSelector((state) => state.deliveryReducer);

  const handleCities = (e) => {
    dispatch(getCitiesByArea(e.target.value));
  };

  const handleDepartments = (e) => {
    dispatch(getDepartmentsByCity(e.target.value));
  };

  if (reducerLoading) {
    return <Loader />;
  }

  return (
    <div className={styles.selects}>
      <div>
        <select
          className={styles.select}
          onChange={handleCities}>
          <option value='' disabled selected>
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
          className={styles.select}
          onChange={handleDepartments}>
          <option value='' disabled selected>
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
        <select className={styles.select}>
          <option value='' disabled selected>
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
