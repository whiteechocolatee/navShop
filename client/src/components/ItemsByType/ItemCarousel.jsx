import React from "react";
import styles from "./carousel.module.css";
import { ContentWrapper } from "../contentWrapper/ContentWrapper";
import { Item } from "../ItemCard/Item";

import ushi from "./img/testImg.jpeg";
import iphone from "./img/iphone.png";
import watch from "./img/watch.jpeg";
import playstation from "./img/playstation.jpeg";

export const ItemCarousel = () => {
  return (
    <ContentWrapper>
      <div className={styles.cardContent}>
        <Item
          title={`Sony PlayStation 5 825GB`}
          price={`25 999`}
          itemImg={playstation}
        />
        <Item
          title={`Iphone 13 grey 256GB `}
          price={`32 999`}
          itemImg={iphone}
        />
        <Item
          title={`Apple watch series 7 grey`}
          price={`16 000`}
          itemImg={watch}
        />
        <Item
          title={`Air Pods Pro`}
          price={`5 999`}
          itemImg={ushi}
        />
      </div>
    </ContentWrapper>
  );
};
