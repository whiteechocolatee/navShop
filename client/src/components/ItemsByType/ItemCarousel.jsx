import React, { useState } from "react";

import styles from "./carousel.module.css";

import { ContentWrapper } from "../contentWrapper/ContentWrapper";
import { Pagination } from "../Paginate/Pagination";
import { ItemsContainer } from "../ItemsContainer/ItemsContainer";

export const ItemCarousel = ({
  title = "",
  items = [],
  itemsQuantity,
  children = "",
  containerClassName,
}) => {
  items = items.slice(0, 12);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(itemsQuantity);

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
        <h1 className={styles.itemsTitle}>{title}</h1>
        {children}
        <ItemsContainer
          containerClassName={containerClassName}
          currentItems={currentItems}
        />
        <div
          className={
            itemsQuantity >= items.length
              ? styles.hide
              : styles.paginate
          }>
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
