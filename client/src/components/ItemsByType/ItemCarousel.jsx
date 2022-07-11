import React, { useState } from "react";

import styles from "./carousel.module.css";

import { ContentWrapper } from "../contentWrapper/ContentWrapper";
import { Pagination } from "../Paginate/Pagination";
import { ItemsContainer } from "../ItemsContainer/ItemsContainer";

export const ItemCarousel = ({
  title = "",
  items = [],
}) => {
  items = items.slice(0, 16);

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

  return (
    <ContentWrapper>
      <div className={styles.cardContent}>
        <h1 className={styles.itemsTitle}>{title}</h1>
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
