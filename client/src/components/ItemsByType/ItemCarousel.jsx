import React, { useState, useEffect } from "react";
import styles from "./carousel.module.css";
import { ContentWrapper } from "../contentWrapper/ContentWrapper";

import { ItemsContainer } from "../ItemsContainer/ItemsContainer";
import axios from "axios";
import { Pagination } from "../Paginate/Pagination";

export const ItemCarousel = () => {
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(4);

  useEffect(() => {
    const getItems = async () => {
      let res = await axios.get("/api/items/");

      console.log(res.data);
      setItems(res.data);
    };
    getItems();
  }, []);

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
            postsPerPage={itemsPerPage}
            totalPosts={items.length}
            paginate={paginate}
            currentPage={currentPage}
          />
        </div>
      </div>
    </ContentWrapper>
  );
};
