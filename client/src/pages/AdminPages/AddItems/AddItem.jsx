import React, { useState } from "react";
import { useDispatch } from "react-redux";

import styles from "./addItem.module.css";
import { Navbar } from "../../../components/AdminNav/Navbar";
import { ContentWrapper } from "../../../components/contentWrapper/ContentWrapper";
import { Footer } from "../../../components/Footer/Footer";
import { Button } from "../../../components/Button/Button";
import { Input } from "../../../components/Input/Input";
import { Select } from "../../../components/Select/Select";
import { createItem } from "../../../store/item/itemSlice";

export const AddItem = () => {
  const dispatch = useDispatch();

  const [formActive, setFormActive] = useState(false);

  const [values, setValues] = useState({
    title: "",
    price: "",
    discount: "",
    description: "",
    itemImage: "",
    color: "",
    company: "",
    model: "",
    memory: "",
    category: "",
    categoryUA: "",
    characteristics: [],
    count: 1,
  });

  const characteristicsList = values.characteristics;

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
      ...values.characteristics,
      newCharacteristics,
    ];

    setValues({
      ...values,
      characteristics: editedCharacteristics,
    });
    setFormActive(false);
  };

  const onChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreate = (e) => {
    e.preventDefault();

    if (
      values.category === "" ||
      values.categoryUA === ""
    ) {
      alert("Вкажіть категорію!!!");
      return;
    } else {
      console.log(values);
      dispatch(createItem(values));
    }
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
        <>
          <h1>Додати товар</h1>
          <div className={styles.addItemForm}>
            <Select
              onChange={(e) => {
                onChangeSelect(e);
              }}
              value='Виберіть категорію'
              name='categories'
              options={categories.map((category, index) => (
                <option
                  key={index}
                  value={category.category}>
                  {category.categoryUA}
                </option>
              ))}
            />
            <form
              onSubmit={handleCreate}
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
                  <p className={styles.characteristicTitle}>
                    <label htmlFor='title'>
                      Назва харакетристики -
                    </label>
                    <input
                      onChange={(e) => {
                        setCharacteristic({
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
      </ContentWrapper>
      <Footer />
    </>
  );
};
