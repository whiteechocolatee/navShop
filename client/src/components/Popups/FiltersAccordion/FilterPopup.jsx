import React from "react";

import { Popup } from "../../Popup/Popup";
import styles from "./filterPopup.module.css";
import { Filter } from "../../Filter/Filter";
import { Button } from "../../Button/Button";

export const FilterPopup = ({
  active,
  setActive,
  handleFilter,
  handleReset,
  filterData,
}) => {
  return (
    <Popup
      className={styles.popupBody}
      active={active}
      setActive={setActive}>
      <h1>Фільтри</h1>
      <Filter characteristic={filterData}>
        <div className={styles.filterBtns}>
          <Button
            onClick={handleFilter}
            containerClassName={styles.btnApply}
            children='Пошук'
          />
          <Button
            onClick={handleReset}
            containerClassName={styles.btnReset}
            children='Скинути'
          />
        </div>
      </Filter>
    </Popup>
  );
};
