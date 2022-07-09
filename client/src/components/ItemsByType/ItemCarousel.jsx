import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import styles from "./carousel.module.css";

import { ContentWrapper } from "../contentWrapper/ContentWrapper";
import { ItemsContainer } from "../ItemsContainer/ItemsContainer";
import { Pagination } from "../Paginate/Pagination";
import { getItemsMainCarousel } from "../../store/carouselMainPage/carouselMainSlice";

export const ItemCarousel = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(4);
  const dispatch = useDispatch();

  const loading = useSelector((state) => {
    return state.carousel.isLoading;
  });

  const items = useSelector((state) => {
    return state.carousel.items;
  });

  useEffect(() => {
    dispatch(getItemsMainCarousel());
  }, [dispatch]);

  const lastItemIndex = currentPage * itemsPerPage;
  const firstItemIndex = lastItemIndex - itemsPerPage;

  const currentItems = items.slice(
    firstItemIndex,
    lastItemIndex,
  );

  const paginate = (pageNumber) =>
    setCurrentPage(pageNumber);

  return (
    <ContentWrapper>
      <div className={styles.cardContent}>
        <h1 className={styles.itemsTitle}>Новые товары</h1>
        <ItemsContainer currentItems={currentItems} />
        <div className={styles.paginate}>
          <Pagination
            itemsPerPage={itemsPerPage}
            totalItems={items.length}
            paginate={paginate}
            currentPage={currentPage}
          />
        </div>
      </div>
    </ContentWrapper>
  );
};
