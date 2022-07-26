import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useSortItems } from "../../hooks/useSort";

import { CategoriesNavigation } from "../../components/CategoriesNav/CategoriesNavigation";
import { Header } from "../../components/Header/Header";
import { Footer } from "../../components/Footer/Footer";
import { Loader } from "../../components/Loader/Loader";
import { ItemCarousel } from "../../components/ItemsByType/ItemCarousel";
import { Button } from "../../components/Button/Button";
import styles from "./category.module.css";

import { getItemsByCategory } from "../../store/items/itemsSlice";
import { CallbackBlock } from "../../components/CallbackForm/CallbackBlock";
import { ContentWrapper } from "../../components/contentWrapper/ContentWrapper";

import { BsPlusLg } from "react-icons/bs";

export const CategoryPage = () => {
  const { categoryName } = useParams();
  const dispatch = useDispatch();

  const { items, isLoading } = useSelector((state) => {
    return state.itemsReducer;
  });

  const { desc, setDesc, sortedItems } = useSortItems(
    items || [],
  );

  useEffect(() => {
    dispatch(getItemsByCategory(categoryName));
  }, [categoryName, dispatch]);

  return (
    <React.Fragment>
      <Header />
      <CategoriesNavigation />
      {isLoading ? (
        <Loader />
      ) : (
        <ContentWrapper className={styles.container}>
          <div className={styles.filter}>
            <div className={styles.filterTitle}>
              <h3>Фільтр</h3>
            </div>
            <div className={styles.filterBtns}>
              <div className={styles.filterBtn}>
                <p>Колір</p>
                <BsPlusLg />
              </div>
              <div className={styles.filterBtn}>
                <p>Пам'ять</p>
                <BsPlusLg />
              </div>
              <div className={styles.filterBtn}>
                <p>Модель</p>
                <BsPlusLg />
              </div>
            </div>
          </div>
          <div className={styles.items}>
            <ItemCarousel
              itemsQuantity={16}
              title={`Category ${categoryName}`}
              items={sortedItems}>
              <Button
                containerClassName={styles.sortButton}
                onClick={() => setDesc(!desc)}>
                {`${
                  desc
                    ? "Сортировать по цене: по убыванию"
                    : "Сортировать по цене: по возрастанию"
                }`}
              </Button>
            </ItemCarousel>
          </div>
        </ContentWrapper>
      )}
      <CallbackBlock />
      <Footer />
    </React.Fragment>
  );
};
