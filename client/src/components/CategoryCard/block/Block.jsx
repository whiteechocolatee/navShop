import React from "react";
import styles from "./block.module.css";
import { Button } from "../../Button/Button";

export const Block = ({
  imgClassList = "",
  containerClass = "",
  img = "",
  alt = "",
  title = "",
}) => {
  return (
    <div className={`${styles.accessories} ${containerClass}`}>
      <h3 className={styles.accessoriesTitle}>{title}</h3>
      <Button
        children={"Еще"}
        containerClassName={styles.btn}
      />
      <img className={imgClassList} src={img} alt={alt} />
    </div>
  );
};
