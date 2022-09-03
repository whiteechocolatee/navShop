import React from "react";

import styles from "./exchange.module.css";
import { Header } from "../../components/Header/Header";
import { CategoriesNavigation } from "../../components/CategoriesNav/CategoriesNavigation";
import { ContentWrapper } from "../../components/contentWrapper/ContentWrapper";
import { CallbackBlock } from "../../components/CallbackForm/CallbackBlock";
import { Footer } from "../../components/Footer/Footer";

export const Exchange = () => {
  window.scroll(0, 0);
  return (
    <>
      <Header />
      <CategoriesNavigation />
      <ContentWrapper className={styles.wrapper}>
        <h1>Обмін та повернення</h1>
        <article className={styles.exchange}>
          <p>
            Інтернет-магазин гаджетів Grib у своїй роботі
            повністю дотримується законодавства України,
            зокрема Закон України "Про захист прав
            споживачів" за умовами якого Ви можете протягом
            14 днів з дня покупки - обміняти або повернути
            куплений у нас товар та отримати інший товар або
            повну компенсацію його вартість.
          </p>
          <h4>Процедура повернення товару:</h4>
          <p>
            <b> 1.</b> Товар повинен бути повернутий
            повністю у товарному вигляді та повній
            комплектації, в якому Ви його отримали разом
            підтверджуючим документом про те, що покупка
            була зроблена в нашому інтернет магазині
          </p>
          <p>
            <b> 2.</b> Товар може бути повернутий Новою
            поштою або Укрпоштою на реквізити, які Вам
            надасть наш менеджер. Відправлення товару
            обов'язково має здійснюватися від імені особи,
            на яку було оформлено замовлення. Покупець
            оплачує доставку повернення товару.
          </p>
          <p>
            <b> 3.</b> Повернення грошей за товар
            здійснюється на картку, з якої проводилася
            оплата замовлення. Звертаємо увагу, що банк може
            брати комісію за повернення грошей у розмірі 0,5
            - 1%, якщо повернення грошей здійснюється не на
            "Універсальну" картку Приватбанку.
          </p>
        </article>
      </ContentWrapper>
      <CallbackBlock />
      <Footer />
    </>
  );
};
