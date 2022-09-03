import React from "react";

import styles from "./paymentAndDelivery.module.css";
import { CallbackBlock } from "../../components/CallbackForm/CallbackBlock";
import { CategoriesNavigation } from "../../components/CategoriesNav/CategoriesNavigation";
import { ContentWrapper } from "../../components/contentWrapper/ContentWrapper";
import { Header } from "../../components/Header/Header";
import { Footer } from "../../components/Footer/Footer";

export const PaymentAndDelivery = () => {
  window.scroll(0, 0);
  return (
    <>
      <Header />
      <CategoriesNavigation />
      <ContentWrapper className={styles.wrapper}>
        <h1>Доставка та оплата</h1>
        <article className={styles.payment}>
          Після оформлення вами замовлення в нашому
          інтернет-магазині для доставки товару у ваше місто
          ви повинні чітко та{" "}
          <b> обов'язково вказати таку інформацію:</b>
          <br />
          <br />
          <b>Прізвище</b>
          <br />
          <br />
          <b> Ім'я отримувача</b>
          <br />
          <br />
          <b> Місто чи населений пункт</b>
          <br />
          <br />
          <b> Номер найближчого до вас відділення</b>
          <br />
          <br />
          <b> Індекс відділення пошти (для Укр Пошти)</b>
          <br />
          <br />
          <b> Номер мобільного телефону</b>
          <br />
          <br />
          Відправки здійснюються у робочі дні транспортних
          компаній Нова Пошта, Укр Пошта. Термін доставки
          становить від 1 до 3 робочих днів.
        </article>
      </ContentWrapper>
      <CallbackBlock />
      <Footer />
    </>
  );
};
