import React from "react";
import styles from "./categoryCards.module.css";
import { ContentWrapper } from "../contentWrapper/ContentWrapper";
import { Block } from "./block/Block";

import { NavLink } from "react-router-dom";
import { BsArrowUpRight } from "react-icons/bs";

export const CategoryCards = () => {
  return (
    <ContentWrapper>
      <div className={`${styles.content}`}>
        <Block
          containerClass={styles.main}
          img={`https://res.cloudinary.com/dmhqzwtnd/image/upload/v1657382901/assets/iphone_back_gbuhxh.png`}
          alt={`Для телефона`}
          title={`Для телефона`}
          imgClassList={styles.imgPhone}
        />
        <Block
          containerClass={styles.main}
          img={`https://res.cloudinary.com/dmhqzwtnd/image/upload/v1657382898/assets/ipad_back_ykceo9.png`}
          alt={`Гаджеты`}
          title={`Гаджеты`}
          imgClassList={styles.imgGadget}
        />
        <div className={styles.smallerBlocks}>
          <div className={styles.smallerBlocksTitle}>
            <h1>Категории</h1>
            <p className={styles.links}>
              <NavLink className={styles.link} to={"#"}>
                Посмотреть все
              </NavLink>
              <BsArrowUpRight />
            </p>
          </div>
          <Block
            containerClass={styles.game}
            img={`https://res.cloudinary.com/dmhqzwtnd/image/upload/v1657382897/assets/games_z3v72h.jpg`}
            alt={`Для геймеров`}
            title={`Для геймеров`}
            imgClassList={styles.imgGame}
          />
          <Block
            containerClass={styles.home}
            img={`https://res.cloudinary.com/dmhqzwtnd/image/upload/v1657382898/assets/home_wneac1.png`}
            alt={`Для дома`}
            title={`Для дома`}
            imgClassList={styles.imgHome}
          />
        </div>
      </div>
    </ContentWrapper>
  );
};
