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
import { CallbackBlock } from "../../components/CallbackForm/CallbackBlock";
import { ContentWrapper } from "../../components/contentWrapper/ContentWrapper";
import { Filter } from "../../components/Filter/Filter";
import styles from "./category.module.css";

import { getItemsByCategory } from "../../store/items/itemsSlice";

export const CategoryPage = () => {
  const { categoryName } = useParams();
  const dispatch = useDispatch();

  const { items, isLoading } = useSelector((state) => {
    return state.itemsReducer;
  });

  const { setDesc, sortedItems } = useSortItems(
    items || [],
  );

  const handleSort = (e) => {
    setDesc(JSON.parse(e.target.value));
  };

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
          <Filter />
          <div className={styles.items}>
            <ItemCarousel
              containerClassName={styles.grid}
              itemsQuantity={16}
              title={`Category ${categoryName}`}
              items={sortedItems}>
              <div className={styles.sortBlock}>
                <label htmlFor='sort'>Відсортувати: </label>
                <select name='sort' onChange={handleSort}>
                  <option value={`true`}>
                    найдорожче - найдешевше
                  </option>
                  <option value='false'>
                    найдешевше - найдорожче
                  </option>
                </select>
              </div>
            </ItemCarousel>
          </div>
        </ContentWrapper>
      )}
      <CallbackBlock />
      <Footer />
    </React.Fragment>
  );
};
