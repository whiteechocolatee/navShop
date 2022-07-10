import React, { useState, useEffect } from "react";

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
  const [itemsPerPage, setItemsPerPage] = useState(0);

  const lastItemIndex = currentPage * itemsPerPage;
  const firstItemIndex = lastItemIndex - itemsPerPage;

  const currentItems = items.slice(
    firstItemIndex,
    lastItemIndex,
  );

  const paginate = (pageNumber) =>
    setCurrentPage(pageNumber);

  const [windowSize, setWindowSize] = useState(
    getWindowSize(),
  );

  useEffect(() => {
    function handleWindowResize() {
      setWindowSize(getWindowSize());
    }

    window.addEventListener("resize", handleWindowResize);

    if (windowSize.innerWidth > 1300) {
      setItemsPerPage(4);
    } else if (windowSize.innerWidth < 1000) {
      setItemsPerPage(2);
    }

    return () => {
      window.removeEventListener(
        "resize",
        handleWindowResize,
      );
    };
  }, []);

  if (loading) {
    return <Loader />;
  }

  console.log(windowSize.innerWidth);

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

function getWindowSize() {
  const { innerWidth, innerHeight } = window;
  return { innerWidth, innerHeight };
}
