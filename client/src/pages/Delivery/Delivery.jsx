import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import styles from "./delivery.module.css";
import { Header } from "../../components/Header/Header";
import { Footer } from "../../components/Footer/Footer";
import { ContentWrapper } from "../../components/contentWrapper/ContentWrapper";
import { useDispatch } from "react-redux";
import { getRegions } from "../../store/deliveryAddresses/deliverySlice";
import { Input } from "../../components/Input/Input";
import { Button } from "../../components/Button/Button";
import { Loader } from "../../components/Loader/Loader";

import {
  filteringByRegions,
  filteringByCity,
  filteringDepartments,
} from "../../store/deliveryAddresses/deliverySlice";

export const Delivery = () => {
  const [region, setRegion] = useState("");
  const [city, setCity] = useState("");
  const [department, setDepartment] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRegions());
  }, [dispatch]);

  const { departments, isLoading } = useSelector(
    (state) => state.deliveryReducer,
  );

  const handleSearch = () => {
    dispatch(filteringByRegions(region));
    dispatch(filteringByCity(city));
    dispatch(filteringDepartments(department));
  };

  return (
    <React.Fragment>
      <Header />
      {isLoading ? (
        <Loader />
      ) : (
        <ContentWrapper className={styles.wrapper}>
          <h1>Знайти відділення (українською мовою)</h1>
          <Input
            type='text'
            placeholder='Вкажіть область'
            onChange={(e) => setRegion(e.target.value)}
          />
          <Input
            type='text'
            placeholder='Вкажіть місто'
            onChange={(e) => setCity(e.target.value)}
          />
          <Input
            type='text'
            placeholder='Вкажіть відділення'
            onChange={(e) => setDepartment(e.target.value)}
          />
          <Button onClick={handleSearch}>Пошук</Button>
          <select>
            {departments.map((item) => (
              <option
                key={item.SiteKey}
                value={item.ShortAddress}>
                {`${item.Description} ( ${item.CityDescription} )`}
              </option>
            ))}
          </select>
        </ContentWrapper>
      )}
      <Footer />
    </React.Fragment>
  );
};
