import React, { useEffect, useState } from "react";
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
import { RangeSlider } from "../../components/PriceRange/PriceRange";

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

  const priceFilter = items.map((item) => item.price);

  let minPrice = Math.min(...priceFilter);
  let maxPrice = Math.max(...priceFilter);

  const [range, setRange] = useState([minPrice, maxPrice]);

  const handleSortByPrice = (e) => {
    setDesc(JSON.parse(e.target.value));
  };

  useEffect(() => {
    dispatch(getItemsByCategory(categoryName));
  }, [categoryName, dispatch]);

  const filterData = [
    {
      _id: 1,
      name: "По цене",
      description: [
        <p className={styles.range}>
          <p>
            шукати від {range[0]} до {range[1]}
          </p>
          <RangeSlider
            range={range}
            setRange={setRange}
            min={minPrice}
            max={maxPrice}
          />
        </p>,
      ],
    },
    {
      _id: 2,
      name: "По приколу",
      description: [<input type='range' />],
    },
    {
      _id: 3,
      name: "Просто так",
      description: [<input type='range' />],
    },
  ];

  return (
    <React.Fragment>
      <Header />
      <CategoriesNavigation />
      {isLoading ? (
        <Loader containerClassName={styles.loader} />
      ) : (
        <ContentWrapper className={styles.container}>
          <div className={styles.filterContent}>
            <h3 className={styles.filterTitle}>Фільтри</h3>
            <Filter characteristic={filterData} />
          </div>
          <div className={styles.items}>
            <ItemCarousel
              containerClassName={styles.grid}
              itemsQuantity={12}
              title={`Category ${categoryName}`}
              items={sortedItems}>
              <div className={styles.sortBlock}>
                <label htmlFor='sort'>Відсортувати: </label>
                <select
                  name='sort'
                  onChange={handleSortByPrice}>
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
