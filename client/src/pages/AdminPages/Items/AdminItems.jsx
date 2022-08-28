import React, {
  useEffect,
  useState,
  useCallback,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  AiOutlineEdit,
  AiOutlineDelete,
} from "react-icons/ai";

import styles from "./adminItems.module.css";
import { Navbar } from "../../../components/AdminNav/Navbar";
import { ContentWrapper } from "../../../components/contentWrapper/ContentWrapper";
import { Footer } from "../../../components/Footer/Footer";
import { Filter } from "../../../components/Filter/Filter";
import { getItems } from "../../../store/items/itemsSlice";
import { Checkbox } from "../../../components/Checkbox/Checkbox";
import { Loader } from "../../../components/Loader/Loader";
import { ImageComponent } from "../../../components/Image/Image";
import { Button } from "../../../components/Button/Button";
import { Link } from "react-router-dom";

export const AdminItems = () => {
  const dispatch = useDispatch();

  const [filters, setFilters] = useState({
    category: "",
  });

  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    dispatch(getItems());
  }, [dispatch]);

  const { items, isLoading } = useSelector(
    (state) => state.itemsReducer,
  );

  const itemsArray =
    filtered.length === 0 ? items : filtered;

  const categoriesTitles = [
    ...new Set(items.map((item) => item.categoryUA)),
  ];

  const handleChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const filterData = [
    {
      _id: 1,
      name: "Категорія",
      description: [
        <div className={styles.range}>
          {categoriesTitles.map((item) => (
            <Checkbox
              name={"category"}
              onChange={handleChange}
              checkedValue={filters.category === item}
              value={item}
              children={item}
              containerClassName={styles.checkbox}
            />
          ))}
        </div>,
      ],
    },
  ];

  const handleFilter = useCallback(() => {
    let filteredItems = items.filter(
      (item) => item.categoryUA === filters.category,
    );

    setFiltered(filteredItems);
  }, [filters.category, items]);

  return (
    <>
      <Navbar />
      <ContentWrapper className={styles.wrapper}>
        {isLoading ? (
          <Loader containerClassName={styles.loader} />
        ) : (
          <>
            <h1>Товари</h1>
            <div className={styles.itemContainer}>
              <div className={styles.filterData}>
                <Filter characteristic={filterData}>
                  <Button
                    onClick={handleFilter}
                    containerClassName={styles.btnApply}
                    children='Пошук'
                  />
                  <Button
                    onClick={() => {
                      setFiltered([]);
                      setFilters("");
                    }}
                    containerClassName={styles.btnReset}
                    children='Скинути'
                  />
                </Filter>
              </div>
              <div className={styles.items}>
                {itemsArray?.map((item, index) => (
                  <div key={index} className={styles.item}>
                    <div className={styles.itemInfo}>
                      <div className={styles.itemImage}>
                        <ImageComponent
                          publicId={item?.itemImage}
                        />
                      </div>
                      <div
                        className={styles.itemDescription}>
                        <p>{item.title}</p>
                        <p>{item.price} ₴</p>
                      </div>
                    </div>
                    <div className={styles.itemNav}>
                      <Link to={item._id}>
                        <div className={styles.itemEdit}>
                          <AiOutlineEdit />
                        </div>
                      </Link>
                      <div className={styles.itemRemove}>
                        <AiOutlineDelete />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </ContentWrapper>
      <Footer />
    </>
  );
};
