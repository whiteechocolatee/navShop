import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
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
import { Checkbox } from "../../components/Checkbox/Checkbox";

import { getItemsByCategory } from "../../store/items/itemsSlice";
import { ScrollButton } from "../../components/ScrollButton/ScrollButton";

export const CategoryPage = () => {
  const [filters, setFilters] = useState({
    brand: "",
    model: "",
  });
  const [filtered, setFiltered] = useState([]);

  const [quantity, setQuantity] = useState(12);

  const ref = useRef(null);

  const { categoryName } = useParams();
  const dispatch = useDispatch();

  const { items, isLoading } = useSelector((state) => {
    return state.itemsReducer;
  });

  const { setDesc, sortedItems } = useSortItems(
    filtered.length === 0 ? items : filtered,
  );

  const priceFilter = items.map((item) => item.price);

  let minPrice = Math.min(...priceFilter);
  let maxPrice = Math.max(...priceFilter);

  const [range, setRange] = useState([minPrice, maxPrice]);

  const handleSortByPrice = (e) => {
    setDesc(JSON.parse(e.target.value));
  };

  const brandFilter = [
    ...new Set(items.map((item) => item.company)),
  ].sort();

  const modelFilter = [
    ...new Set(items.map((item) => item.model)),
  ];

  const handleReset = () => {
    setFilters({
      brand: "",
      model: "",
    });
    setRange([minPrice, maxPrice]);
    setFiltered([]);
  };

  const handleFilter = () => {
    let filteredItems = items.filter(
      (item) =>
        item.price >= range[0] && item.price <= range[1],
    );

    if (filters.brand !== "") {
      filteredItems = filteredItems.filter(
        (item) => item.company === filters.brand,
      );
    }

    if (filters.model !== "") {
      filteredItems = filteredItems.filter(
        (item) => item.model === filters.model,
      );
    }

    setFiltered(filteredItems);
  };

  const setPrices = useCallback(
    () => setRange([minPrice, maxPrice]),
    [maxPrice, minPrice],
  );

  const updateQuantity = useCallback(() => {
    let newPageLimit = Number(ref.current?.value);

    setQuantity(newPageLimit);
  }, [quantity]);

  const pages = [12, 24, 36];

  useEffect(() => {
    setPrices();
  }, [setPrices]);

  useEffect(() => {
    dispatch(getItemsByCategory(categoryName));
    updateQuantity();
  }, [categoryName, dispatch, updateQuantity]);

  const handleChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const filterData = [
    {
      _id: 1,
      name: "Ціна",
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
      name: "Бренд",
      description: [
        <p>
          {brandFilter.map((brand) => (
            <Checkbox
              onChange={handleChange}
              name='brand'
              checkedValue={filters.brand === brand}
              value={brand}
              children={brand}
              containerClassName={styles.checkbox}
            />
          ))}
        </p>,
      ],
    },
    {
      _id: 3,
      name: "Модель",
      description: [
        <p>
          {modelFilter.map((model) => (
            <Checkbox
              onChange={handleChange}
              name='model'
              checkedValue={filters.model === model}
              value={model}
              children={model}
              containerClassName={styles.checkbox}
            />
          ))}
        </p>,
      ],
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
            <Filter characteristic={filterData}>
              <div className={styles.filterBtns}>
                <Button
                  onClick={handleFilter}
                  containerClassName={styles.btnApply}
                  children='Пошук'
                />
                <Button
                  onClick={handleReset}
                  containerClassName={styles.btnReset}
                  children='Скинути'
                />
              </div>
            </Filter>
          </div>
          <div className={styles.items}>
            <ItemCarousel
              containerClassName={styles.grid}
              itemsQuantity={quantity}
              title={`Category ${categoryName}`}
              items={sortedItems}>
              <div className={styles.sortBlock}>
                <div>
                  <label htmlFor='sort'>
                    Відсортувати:{" "}
                  </label>
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
                <div>
                  <label htmlFor='sortQuantity'>
                    На сторінці:
                  </label>
                  <select
                    ref={ref}
                    name='sortQuantity'
                    onChange={updateQuantity}>
                    {pages.map((page) => {
                      return page === quantity ? (
                        <option selected value={page}>
                          {page}
                        </option>
                      ) : (
                        <option value={page}>{page}</option>
                      );
                    })}
                  </select>
                </div>
              </div>
            </ItemCarousel>
          </div>
          <div className={styles.scrollUp}>
            <ScrollButton />
          </div>
        </ContentWrapper>
      )}
      <CallbackBlock />
      <Footer />
    </React.Fragment>
  );
};
