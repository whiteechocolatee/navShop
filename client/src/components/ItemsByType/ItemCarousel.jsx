import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import styles from "./carousel.module.css";

import { ContentWrapper } from "../contentWrapper/ContentWrapper";
import { Pagination } from "../Paginate/Pagination";
import { Loader } from "../Loader/Loader";

export const ItemCarousel = ({
  title = "",
  Component,
  items,
  loading,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(4);

  const lastItemIndex = currentPage * itemsPerPage;
  const firstItemIndex = lastItemIndex - itemsPerPage;

  const currentItems = items.slice(
    firstItemIndex,
    lastItemIndex,
  );

  const paginate = (pageNumber) =>
    setCurrentPage(pageNumber);

  if (loading) {
    return <Loader />;
  }

  return (
    <ContentWrapper>
      <div className={styles.cardContent}>
        <h1 className={styles.itemsTitle}>{title}</h1>
        <Component currentItems={currentItems} />
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
