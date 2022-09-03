import React from "react";

import styles from "./aboutUs.module.css";
import { CategoriesNavigation } from "../../components/CategoriesNav/CategoriesNavigation";
import { Header } from "../../components/Header/Header";
import { ContentWrapper } from "../../components/contentWrapper/ContentWrapper";
import { CallbackBlock } from "../../components/CallbackForm/CallbackBlock";
import { Footer } from "../../components/Footer/Footer";

export const AboutUs = () => {
  window.scroll(0, 0);
  return (
    <>
      <Header />
      <CategoriesNavigation />
      <ContentWrapper className={styles.wrapper}>
        <h1>Інетрнет магазин GRIB</h1>
        <article className={styles.aboutUs}>
          <b>
            Grib– це затишний інтернет-магазин гаджетів та
            аксесуарів.
          </b>
          Ми не просто торгуємо технікою, ми нею
          захоплюємось. Саме тому наше головне завдання
          допомогти вам дізнатися ваш гаджет краще та
          зробити ваше життя комфортнішим. Grib допоможе вам
          розібратися з вашим першим айфоном і зможе
          здивувати вас цікавими фішками навіть якщо ви
          просунутий користувач. У нашому магазині ви
          зможете отримати якісний сервіс від моменту вибору
          бажаного товару до його отримання. Ми дбаємо про
          наших клієнтів і хочемо, щоб вони знайшли саме те,
          що їм сподобається, тому ми проводимо регулярні
          оновлення та поповнення асортименту. Всі товари
          проходять ретельне тестування, перш ніж потрапити
          в наш каталог.
        </article>
      </ContentWrapper>
      <CallbackBlock />
      <Footer />
    </>
  );
};
