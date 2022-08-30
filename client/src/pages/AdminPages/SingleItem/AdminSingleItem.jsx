import React, {
  useEffect,
  useState,
  useCallback,
} from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import styles from "./adminSingleItem.module.css";
import { Navbar } from "../../../components/AdminNav/Navbar";
import { ContentWrapper } from "../../../components/contentWrapper/ContentWrapper";
import { Footer } from "../../../components/Footer/Footer";
import { Input } from "../../../components/Input/Input";
import { Loader } from "../../../components/Loader/Loader";
import { Button } from "../../../components/Button/Button";
import { Select } from "../../../components/Select/Select";

import {
  getItem,
  updateItem,
} from "../../../store/item/itemSlice";

export const AdminSingleItem = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { item, isLoading } = useSelector(
    (state) => state.singleItemReducer,
  );

  const [formActive, setFormActive] = useState(false);

  useEffect(() => {
    dispatch(getItem(id));
  }, [dispatch, id]);

  const [values, setValues] = useState({
    id: item?._id,
    title: item?.title,
    price: item?.price,
    discount: item?.discount,
    description: item?.description,
    itemImage: item?.itemImage,
    color: item?.color,
    company: item?.company,
    model: item?.model,
    memory: item && item?.memory ? item?.memory : "",
    category: "",
    categoryUA: "",
    characteristics: [],
  });

  const characteristicsList =
    values.characteristics.length > 0
      ? values.characteristics
      : item?.characteristics;

  const [characteristic, setCharacteristic] = useState({
    name: "",
    fLine: "",
    sLine: "",
    thrdLine: "",
  });

  const categories = [
    { category: "smartphones", categoryUA: "Смартфони" },
    { category: "cover", categoryUA: "Аксесуари" },
    { category: "gadgets", categoryUA: "Гаджети" },
    { category: "audio", categoryUA: "Аудіо" },
    { category: "home", categoryUA: "Для дому" },
    { category: "pc", categoryUA: "Для компьютерів" },
    { category: "game", categoryUA: "Для геймерів" },
    { category: "auto", categoryUA: "Для авто" },
  ];

  const inputs = [
    {
      id: 1,
      name: "title",
      type: "text",
      placeholder: "Вкажіть назву товара",
      errorMessage: "Вкажіть назву товара!!!",
      required: true,
    },
    {
      id: 2,
      name: "price",
      placeholder: "Вкажіть ціну",
      type: "number",
      errorMessage:
        "Ціна повинна бути виключно з чисел та до 12 символів",
      pattern: "^[0-9]{2,12}$",
      required: true,
    },
    {
      id: 3,
      name: "discount",
      type: "number",
      placeholder: "Вкажіть знижку",
      errorMessage: "Знижка не вказана",
      required: true,
    },
    {
      id: 4,
      name: "description",
      type: "text",
      placeholder: "Вкажіть опис до товару",
      errorMessage: "Вкажіть опис!!!",
      required: true,
    },
    {
      id: 5,
      name: "itemImage",
      type: "text",
      placeholder: "Вкажіть посилання на картинку",
      errorMessage: "Додайте зображення",
      required: true,
    },
    {
      id: 6,
      name: "color",
      type: "text",
      placeholder: "Вкажіть колір товару",
      errorMessage: "Колір не вказан!",
      required: true,
    },
    {
      id: 7,
      name: "company",
      type: "text",
      placeholder: "Вкажіть компанію виробника",
      errorMessage: "Компанія не вказана!",
      required: true,
    },
    {
      id: 8,
      name: "model",
      type: "text",
      placeholder: "Вкажіть модель пристрою",
      errorMessage: "Модель не вказана!",
      required: true,
    },
    {
      id: 9,
      name: "memory",
      type: "number",
      placeholder: "Вкажіть пам'ять пристрою",
      errorMessage: "Пам'ять не вказана!",
    },
  ];

  const updateState = useCallback(() => {
    setValues({
      id: item?._id,
      title: item?.title,
      price: item?.price,
      discount: item?.discount,
      description: item?.description,
      itemImage: item?.itemImage,
      color: item?.color,
      company: item?.company,
      model: item?.model,
      memory: item?.memory,
      category: "",
      categoryUA: "",
      characteristics: [],
    });
  }, [
    item?._id,
    item?.color,
    item?.company,
    item?.memory,
    item?.description,
    item?.discount,
    item?.itemImage,
    item?.model,
    item?.price,
    item?.title,
  ]);

  const createCharacteristic = () => {
    const newCharacteristics = {
      name: characteristic.name,
      description: [
        characteristic.fLine,
        characteristic.sLine,
        characteristic.thrdLine,
      ],
    };

    const editedCharacteristics = [
      ...item.characteristics,
      newCharacteristics,
    ];

    setValues({
      ...values,
      characteristics: editedCharacteristics,
    });
    setFormActive(false);
  };

  useEffect(() => {
    updateState();
  }, [updateState]);

  const handleUpdate = (e) => {
    e.preventDefault();

    if (
      values.category === "" ||
      values.categoryUA === ""
    ) {
      alert("Вкажіть категорію!!!");
      return;
    }

    if (values.characteristics.length === 0) {
      dispatch(
        updateItem({
          ...values,
          characteristics: item?.characteristics,
        }),
      );
    } else {
      dispatch(updateItem(values));
    }
  };

  const onChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const onChangeSelect = (e) => {
    const { options, selectedIndex, value } = e.target;
    setValues({
      ...values,
      categoryUA: options[selectedIndex].innerHTML,
      category: value,
    });
  };

  return (
    <>
      <Navbar />
      <ContentWrapper className={styles.wrapper}>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <h1>Товари</h1>
            <div className={styles.itemForm}>
              <Select
                onChange={(e) => {
                  onChangeSelect(e);
                }}
                value='Виберіть категорію'
                name='categories'
                options={categories.map(
                  (category, index) => (
                    <option
                      key={index}
                      value={category.category}>
                      {category.categoryUA}
                    </option>
                  ),
                )}
              />
              <form
                onSubmit={handleUpdate}
                className={styles.updateForm}>
                {inputs.map((input) => (
                  <div key={input.id}>
                    <Input
                      {...input}
                      value={values[input.name]}
                      onChange={onChange}
                      className={styles.input}
                    />
                  </div>
                ))}
                <div className={styles.addCharacteristics}>
                  <h4>Харакетристики</h4>
                  {Array.isArray(characteristicsList) &&
                    characteristicsList.map(
                      (characteristic, index) => (
                        <div
                          className={styles.characteristic}
                          key={index}>
                          {characteristic.name}
                          {characteristic.description.map(
                            (desc, index) => (
                              <p key={index}>{desc}</p>
                            ),
                          )}
                        </div>
                      ),
                    )}
                  <div
                    className={
                      formActive
                        ? `${styles.addCharacteristicsForm}`
                        : `${styles.hide}`
                    }>
                    <p
                      className={
                        styles.characteristicTitle
                      }>
                      <label htmlFor='title'>
                        Назва харакетристики -
                      </label>
                      <input
                        onChange={(e) => {
                          setCharacteristic({
                            ...characteristic,
                            [e.target.name]: e.target.value,
                          });
                        }}
                        name='name'
                        id='title'
                        type='text'
                      />
                      <br />
                      <label htmlFor='title'>
                        Текст харакетристики -
                      </label>
                      <input
                        onChange={(e) => {
                          setCharacteristic({
                            ...characteristic,
                            [e.target.name]: e.target.value,
                          });
                        }}
                        name='fLine'
                        id='title'
                        type='text'
                      />
                      <input
                        onChange={(e) => {
                          setCharacteristic({
                            ...characteristic,
                            [e.target.name]: e.target.value,
                          });
                        }}
                        name='sLine'
                        id='title'
                        type='text'
                      />
                      <input
                        onChange={(e) => {
                          setCharacteristic({
                            ...characteristic,
                            [e.target.name]: e.target.value,
                          });
                        }}
                        name='thrdLine'
                        id='title'
                        type='text'
                      />
                    </p>
                    <Button
                      onClick={createCharacteristic}
                      containerClassName={
                        styles.btnAddCharacteristic
                      }
                      children='Додати'
                    />
                  </div>
                  {Array.isArray(characteristicsList) &&
                  characteristicsList.length >= 3 ? null : (
                    <Button
                      containerClassName={
                        styles.btnAddCharacteristic
                      }
                      onClick={(e) => setFormActive(true)}
                      children='Додати нову характеристику'
                    />
                  )}
                </div>
                <Button
                  containerClassName={styles.btn}
                  children={
                    <input
                      type='submit'
                      className={styles.signUp}
                      value='Зберегти'
                    />
                  }
                />
              </form>
            </div>
          </>
        )}
      </ContentWrapper>
      <Footer />
    </>
  );
};
