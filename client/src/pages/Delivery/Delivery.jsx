import React, { useState, useEffect } from "react";

import styles from "./delivery.module.css";
import { Header } from "../../components/Header/Header";
import { Footer } from "../../components/Footer/Footer";
import { ContentWrapper } from "../../components/contentWrapper/ContentWrapper";
import axios from "axios";
import { Input } from '../../components/Input/Input';
import { Button } from "../../components/Button/Button";

export const Delivery = () => {
  const [value, setValue] = useState("");
  const [result, setResult] = useState("");
  const [city, setCity] = useState("");
  const [department, setDepartment] = useState("");

  const handleSearch = async () => {
    let config = {
      apiKey: "d6a9f94157b12fe4993a41f31d276bef",
      modelName: "Address",
      calledMethod: "getWarehouses",
    };

    let response = await axios.post(
      "https://api.novaposhta.ua/v2.0/json/",
      config,
    );

    const data = response.data.data.filter((item) => {
      return item.SettlementAreaDescription.toLowerCase().includes(
        value.toLowerCase(),
      );
    });

    let result = data.filter((item) => {
      return item.SettlementDescription.toLowerCase().includes(
        city.toLowerCase(),
      );
    });

    console.log(`delivery city >>>`, result);

    let deliveryDepartmentArr = result.filter((item) => {
      return item.Number.includes(department);
    });

    setResult(deliveryDepartmentArr);

    console.log(
      "delivery department >>>",
      deliveryDepartmentArr,
    );
  };

  return (
    <React.Fragment>
      <Header />
      <ContentWrapper className={styles.wrapper}>
        <Input
          type='text'
          onChange={(e) => setValue(e.target.value)}
          placeholder='Укажите область'
        />
        <Input
          type='text'
          onChange={(e) => setCity(e.target.value)}
          placeholder='Укажите город'
        />
        <Input
          type='text'
          onChange={(e) => setDepartment(e.target.value)}
          placeholder='Укажите отделение'
        />
        <Button onClick={handleSearch}>Поиск</Button>
        {result.length > 0 ? (
          <select>
            {result.map((item) => (
              <option
                key={item.SiteKey}
                value={item.ShortAddress}>
                {`${item.Description} ( ${item.CityDescription} )`}
              </option>
            ))}
          </select>
        ) : (
          ""
        )}
      </ContentWrapper>
      <Footer />
    </React.Fragment>
  );
};
