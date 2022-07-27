import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import styles from "./orderInfo.module.css";
import { Input } from "../Input/Input";
import { Button } from "../Button/Button";
import { Loader } from "../Loader/Loader";

import {
  getRegions,
  filteringByRegions,
  filteringByCity,
  filteringDepartments,
} from "../../store/deliveryAddresses/deliverySlice";

export const OrderInfo = () => {
  const dispatch = useDispatch();

  const [values, setValues] = useState({
    name: "",
    surname: "",
    phone: "",

    region: "",
    city: "",
    department: "",
    deliveryDepartment: "",
  });

  useEffect(() => {
    dispatch(getRegions());
  }, [dispatch]);

  const { departments, isLoading } = useSelector(
    (state) => state.deliveryReducer,
  );

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(filteringByRegions(values.region));
    dispatch(filteringByCity(values.city));
    dispatch(filteringDepartments(values.department));
  };

  const customerInfo = [
    {
      id: 1,
      name: "name",
      type: "text",
      placeholder: "Вкажіть ім'я",
      errorMessage:
        "Не повинно мати цифри або символи, максимальна довжина 20 символів.",
      pattern: "^[ A-Za-zА-ЩЬЮЯҐЄІЇа-щьюяґєії]{3,20}$",
      required: true,
    },
    {
      id: 2,
      name: "surname",
      type: "text",
      placeholder: "Вкажіть по-батькові",
      errorMessage:
        "Не повинно мати цифри або символи, максимальна довжина 20 символів.",
      pattern: "^[ A-Za-zА-ЩЬЮЯҐЄІЇа-щьюяґєії]{3,20}$",
      required: true,
    },
    {
      id: 3,
      name: "phone",
      placeholder: "Вкажіть номер телефону",
      errorMessage: "Номер повинен складатись з 8-12 цифр.",
      pattern: "^[0-9]{10,12}$",
      required: true,
    },
  ];

  const orderInfo = [
    {
      id: 1,
      name: "region",
      type: "text",
      placeholder: "Вкажіть область",
      errorMessage:
        "Не повинно мати цифри або символи, максимальна довжина 25 символів.",
      pattern: "^[ А-ЩЬЮЯҐЄІЇа-щьюяґєії]{3,20}$",
      required: true,
    },
    {
      id: 2,
      name: "city",
      type: "text",
      placeholder: "Вкажіть місто (селище, село)",
      errorMessage:
        "Не повинно мати цифри або символи, максимальна довжина 25 символів.",
      pattern: "^[ А-ЩЬЮЯҐЄІЇа-щьюяґєії]{2,25}$",
      required: true,
    },
    {
      id: 3,
      name: "department",
      placeholder: "Вкажіть відділення телефону",
      errorMessage: "Номер повинен складатись цифр.",
      pattern: "^[0-9]{1,12}$",
    },
  ];

  const onChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      {/* {isLoading ? (
        <Loader />
      ) : ( */}
      <div className={styles.delivery}>
        <div className={styles.customerData}>
          <h3>Вкажіть ваші дані</h3>
          {customerInfo.map((input) => (
            <Input
              key={input.id}
              {...input}
              className={styles.input}
              value={values[input.name]}
              onChange={onChange}
            />
          ))}
        </div>
        <div className={styles.orderData}>
          <h3>Знайти відділення (українською мовою)</h3>
          <form onSubmit={handleSearch}>
            {orderInfo.map((input) => (
              <Input
                key={input.id}
                {...input}
                className={styles.input}
                value={values[input.name]}
                onChange={onChange}
              />
            ))}
            <Button containerClassName={styles.btn}>
              Пошук
            </Button>
          </form>
          {departments.length > 0 ? (
            <select
              name='deliveryDepartment'
              className={styles.select}
              onChange={onChange}>
              <option defaultValue='#' selected>
                Виберіть відділення
              </option>
              {departments.map((item) => (
                <option
                  key={item.SiteKey}
                  value={`${item.Description} ( ${item.CityDescription} )`}>
                  {`${item.Description} ( ${item.CityDescription} )`}
                </option>
              ))}
            </select>
          ) : null}
        </div>
      </div>
      {values.name &&
      values.surname &&
      values.phone.length > 9 &&
      values.region &&
      values.city &&
      values.deliveryDepartment.length > 9 ? (
        <div>
          <div className={styles.delivery}>
            <div>
              <h3>Ваші контактні дані</h3>
              <h5>Ім'я - {values.name}</h5>
              <h5>По-батькові - {values.surname}</h5>
              <h5>Номер телефону - {values.phone}</h5>
            </div>
            <div>
              <h3>Дані для доставки</h3>
              <h5>Область - {values.region}</h5>
              <h5>Місто - {values.city}</h5>
              <h5>Відділеня - {values.deliveryDepartment}</h5>
            </div>
          </div>
          <Button
            containerClassName={styles.btn}
            onClick={handleSearch}>
            Замовити
          </Button>
        </div>
      ) : null}
      {/* )} */}
    </div>
  );
};
