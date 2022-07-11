import React, { useState } from "react";
import styles from "./search.module.css";
import { Input } from "../Input/Input";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

export const Search = ({
  data,
  inputStyles,
  navStyles,
  searchStyles,
}) => {
  const [filteredData, setFilteredData] = useState([]);

  const handleFilter = (e) => {
    const searchWord = e.target.value;
    const filteredArray = data.filter((value) => {
      return value.title
        .toLowerCase()
        .includes(searchWord.toLowerCase());
    });
    if ((searchWord === "")) {
      setFilteredData([]);
    } else {
      setFilteredData(filteredArray);
    }
  };

  return (
    <li className={`${navStyles} ${searchStyles}`}>
      <Input
        type={`text`}
        placeholder={`Поиск`}
        className={inputStyles}
        onChange={handleFilter}
      />
      <FaSearch />
      {filteredData !== 0 && (
        <div className={styles.showResult}>
          <ul className={styles.searchElements}>
            {filteredData.map((el) => (
              <Link key={el._id} to={`/item/${el._id}`}>
                <li className={styles.searchElement}>
                  <span>{el.title}</span>
                  <span>{el.price}</span>
                </li>
              </Link>
            ))}
          </ul>
        </div>
      )}
    </li>
  );
};
