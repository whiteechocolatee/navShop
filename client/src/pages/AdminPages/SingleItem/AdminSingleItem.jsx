import React, {
  useEffect,
  useState,
  useCallback,
} from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Navbar } from "../../../components/AdminNav/Navbar";
import { ContentWrapper } from "../../../components/contentWrapper/ContentWrapper";
import { Footer } from "../../../components/Footer/Footer";
import styles from "./adminSingleItem.module.css";
import { Input } from "../../../components/Input/Input";

import { getItem } from "../../../store/item/itemSlice";
import { Loader } from "../../../components/Loader/Loader";
import { Button } from "../../../components/Button/Button";
import { Select } from "../../../components/Select/Select";

export const AdminSingleItem = () => {
  // window.scroll(0, 0);
  const { id } = useParams();
  const dispatch = useDispatch();

  const { item, isLoading } = useSelector(
    (state) => state.singleItemReducer,
  );

  useEffect(() => {
    dispatch(getItem(id));
  }, [dispatch, id]);

  const [values, setValues] = useState({
    title: item?.title,
    price: item?.price,
    discount: item?.discount,
    description: item?.description,
    itemImage: item?.itemImage,
    color: item?.color,
    company: item?.company,
    model: item?.model,
    category: "",
    categoryUA: "",
    characteristics: item?.characteristics,
  });

  const [characteristic, setCharacteristic] = useState({
    name: "",
    description1: "",
    description2: "",
    description3: "",
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
  ];

  const updateState = useCallback(() => {
    setValues({
      title: item?.title,
      price: item?.price,
      discount: item?.discount,
      description: item?.description,
      itemImage: item?.itemImage,
      color: item?.color,
      company: item?.company,
      model: item?.model,
      category: "",
      categoryUA: "",
      characteristics: [],
    });
  }, [
    item?.color,
    item?.company,
    item?.description,
    item?.discount,
    item?.itemImage,
    item?.model,
    item?.price,
    item?.title,
  ]);

  useEffect(() => {
    updateState();
  }, [updateState]);

  const handleCreate = (e) => {
    e.preventDefault();

    const newCharacteristics = {
      name: characteristic.name,
      description: [
        characteristic.description1,
        characteristic.description2,
        characteristic.description3,
      ],
    };

    values.characteristics = [...item.characteristics];

    values.characteristics.push(newCharacteristics);

    console.log(values);
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
                  {item?.characteristics?.map(
                    (characteristic) => (
                      <div
                        className={styles.characteristic}
                        key={characteristic._id}>
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
                      styles.addCharacteristicsForm
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
                        name='description1'
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
                        name='description2'
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
                        name='description3'
                        id='title'
                        type='text'
                      />
                    </p>
                  </div>
                  <Button
                    containerClassName={
                      styles.btnAddCharacteristic
                    }
                    children='Додати характеристику'
                  />
                </div>
                <Button
                  containerClassName={styles.btn}
                  children={
                    <input
                      type='submit'
                      className={styles.signUp}
                      value='Створити товар'
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
