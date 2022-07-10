/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import styles from "./style.module.css";

export const Pagination = ({
  itemsPerPage,
  totalItems,
  paginate,
  currentPage,
}) => {
  const pageNumbers = [];

  for (
    let i = 1;
    i <= Math.ceil(totalItems / itemsPerPage);
    i++
  ) {
    pageNumbers.push(i);
  }

  return (
    <div className={styles.paginateContainer}>
      <ul className={styles.ul}>
        {pageNumbers.map((number) => {
          return (
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
            </li>
          );
        })}
      </ul>
    </div>
  );
};
