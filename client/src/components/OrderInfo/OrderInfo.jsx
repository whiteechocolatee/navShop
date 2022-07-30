import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

import styles from "./orderInfo.module.css";
import { Input } from "../Input/Input";
import { Button } from "../Button/Button";
import { Loader } from "../Loader/Loader";

import { resetCart } from "../../store/cart/cartSlice";
import {
  getRegions,
  filteringByRegions,
  filteringByCity,
  filteringDepartments,
} from "../../store/deliveryAddresses/deliverySlice";
import { createOrder } from "../../store/order/orderSlice";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { paths } from "../../paths";
import { OrderCheckDelivery } from "../OrderCheckDelivery/OrderCheckDelivery";
import { CustomerForm } from "../CustomerForm/CustomerForm";
import { DeliveryMethod } from "../DeliveryMethod/DeliveryMethod";

export const OrderInfo = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [values, setValues] = useState({
    name: "",
    surname: "",
    phone: "",

    region: "",
    city: "",
    department: "",
    deliveryDepartment: "",
  });

  // useEffect(() => {
  //   dispatch(getRegions());
  // }, [dispatch]);

  const { departments, isLoading } = useSelector(
    (state) => state.deliveryReducer,
  );

  const cart = useSelector((state) => {
    return state.cartReducer.itemsInCart;
  });

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(filteringByRegions(values.region));
    dispatch(filteringByCity(values.city));
    dispatch(filteringDepartments(values.department));
  };

  const total = cart.reduce((acc, item) => {
    return acc + item.totalPrice;
  }, 0);

  const orderCart = [];

  cart.map((item) => {
    return orderCart.push({
      name: item.title,
      image: item.itemImage,
      price: item.price,
      product: item._id,
    });
  });

  const handleOrder = () => {
    const order = {
      orderItems: orderCart,
      shippingAddress: {
        region: values.region,
        city: values.city,
        department: values.deliveryDepartment,
      },
      customerData: {
        name: values.name,
        surname: values.surname,
        phone: values.phone,
      },
      totalPrice: total,
    };

    dispatch(createOrder(order)).then((res) => {
      if (!res.error) {
        toast.success(
          `Ваше замовлення прийнято!
          Ви будете направленні на головну`,
          {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          },
        );
        setTimeout(() => {
          dispatch(resetCart());
          navigate(paths.main);
        }, 5000);
      } else {
        toast.error(res.payload.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setTimeout(() => {
          navigate(paths.main);
        }, 5000);
      }
    });
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
    <div className={styles.deliveryPayment}>
      <ToastContainer />
      <div className={styles.navigation}>
        <Link className={styles.link} to={paths.main}>
          Головна
        </Link>
        <hr className={styles.border} />
        <Link className={styles.link} to={paths.order}>
          Кошик
        </Link>
        <hr className={styles.border} />
        <Link className={styles.link} to={paths.order}>
          Доставка та оплата
        </Link>
      </div>
      <div>
        <h1 className={styles.cartTitle}>
          Доставка та оплата
        </h1>
      </div>
      <div className={styles.orderPayment}>
        <div className={styles.forms}>
          <CustomerForm />
          <DeliveryMethod />
        </div>
        <OrderCheckDelivery total={total} cart={cart} />
      </div>
      {/* {isLoading ? (
        <Loader />
      ) : (
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
      )} */}
      {/* {values.name &&
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
              <h5>
                Відділеня - {values.deliveryDepartment}
              </h5>
            </div>
          </div>
          <Button
            containerClassName={styles.btn}
            onClick={handleOrder}>
            Замовити
          </Button>
        </div>
      ) : null} */}
    </div>
  );
};
