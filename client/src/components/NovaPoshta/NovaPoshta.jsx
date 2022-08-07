import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAreas,
  getAllDepartments,
  getCitiesByArea,
  getDepartmentsByCity,
} from "../../store/deliveryAddresses/deliverySlice";
import styles from "./poshta.module.css";
import { Loader } from "../Loader/Loader";
import { Select } from "../Select/Select";

export const NovaPoshta = ({ values, handleChange }) => {
  const dispatch = useDispatch();

  const { isLoading, areas, cities, departmentByCity } =
    useSelector((state) => state.deliveryReducer);

  useEffect(() => {
    dispatch(getAreas());
    dispatch(getAllDepartments());
  }, [dispatch]);

  const handleCities = (e) => {
    dispatch(getCitiesByArea(e.target.value));
  };

  const handleDepartments = (e) => {
    dispatch(getDepartmentsByCity(e.target.value));
  };

  return (
    <React.Fragment>
      {isLoading ? (
        <Loader containerClassName={styles.loader} />
      ) : (
        <div className={styles.selects}>
          <div>
            <Select
              name='area'
              optionValue='Виберіть область'
              onChange={(e) => {
                handleCities(e);
                handleChange(e);
              }}
              value={values.area}
              options={areas.map((area, index) => (
                <option
                  key={index}
                  value={area.Description}>
                  {area.Description}
                </option>
              ))}
            />
          </div>
          <div>
            <Select
              name='city'
              optionValue='Виберіть населенний пункт'
              onChange={(e) => {
                handleDepartments(e);
                handleChange(e);
              }}
              value={values.city}
              options={cities.map((city, index) => (
                <option key={index} value={city}>
                  {`${city}`}
                </option>
              ))}
            />
          </div>
          <div>
            <Select
              optionValue='Виберіть відділення'
              onChange={handleChange}
              name='department'
              value={values.department}
              options={departmentByCity.map(
                (department, index) => (
                  <option
                    key={index}
                    value={department.Description}>
                    {`${department.Description}`}
                  </option>
                ),
              )}
            />
          </div>
        </div>
      )}
    </React.Fragment>
  );
};
