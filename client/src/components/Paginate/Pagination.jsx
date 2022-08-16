/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import styles from "./style.module.css";

import {
  IoIosArrowBack,
  IoIosArrowForward,
} from "react-icons/io";

export const Pagination = ({
  itemsPerPage,
  totalItems,
  paginate,
  currentPage,
}) => {
  let maxPages = Math.ceil(totalItems / itemsPerPage);
  let items = [];
  let leftSide = currentPage - 2;
  if (leftSide <= 0) leftSide = 1;
  let rightSide = currentPage + 2;
  if (rightSide > maxPages) rightSide = maxPages;
  for (
    let number = leftSide;
    number <= rightSide;
    number++
  ) {
    items.push(
      <li
        className={`${styles.li} ${
          currentPage === number ? styles.active : ""
        }`}
        key={number}>
        <a
          className={`${styles.a}`}
          onClick={() => {
            paginate(number);
          }}>
          {number < 10 ? "0" + number : number}
        </a>
      </li>,
    );
  }

  const nextPage = () => {
    if (currentPage < maxPages) {
      paginate(currentPage + 1);
    }
    window.scroll(0, 0);
  };

  const prevPage = () => {
    if (currentPage > 1) {
      paginate(currentPage - 1);
    }
    window.scroll(0, 0);
  };

  return (
    <div className={styles.paginateContainer}>
      <ul className={styles.ul}>
        <li
          className={` ${
            maxPages < 5 ? styles.hide : styles.li
          }`}>
          <a
            className={`${styles.a}`}
            onClick={() => {
              prevPage();
            }}>
            <IoIosArrowBack />
          </a>
        </li>
        {items}
        <li
          className={` ${
            maxPages < 5 ? styles.hide : styles.li
          }`}>
          <a
            className={`${styles.a}`}
            onClick={() => {
              nextPage();
            }}>
            <IoIosArrowForward />
          </a>
        </li>
      </ul>
    </div>
  );
};
