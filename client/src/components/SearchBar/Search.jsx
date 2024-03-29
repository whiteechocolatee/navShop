import React, { useState } from "react";
import styles from "./search.module.css";
import { Input } from "../Input/Input";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { paths } from "../../paths";
import { useSelector } from "react-redux";

export const Search = ({
  inputStyles,
  navStyles,
  searchStyles,
}) => {
  let data = useSelector((state) => {
    return state.itemsReducer.items;
  });

  const [filteredData, setFilteredData] = useState([]);

  const handleFilter = (e) => {
    const searchWord = e.target.value;
    const filteredArray = data.filter((value) => {
      return value.title
        .toLowerCase()
        .includes(searchWord.toLowerCase());
    });
    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(filteredArray);
    }
  };

  return (
    <li className={`${navStyles} ${searchStyles}`}>
      <Input
        type={`text`}
        placeholder={`Пошук`}
        className={inputStyles}
        onChange={handleFilter}
      />
      <FaSearch />
      {filteredData !== 0 && (
        <div className={styles.showResult}>
          <ul className={styles.searchElements}>
            {filteredData.map((el) => (
              <Link
                key={el._id}
                to={`${paths.itemPage}/${el._id}`}>
                <li
                  onClick={() => setFilteredData([])}
                  className={styles.searchElement}>
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
