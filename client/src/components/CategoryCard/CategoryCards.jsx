import React from "react";
import styles from "./categoryCards.module.css";
import { ContentWrapper } from "../contentWrapper/ContentWrapper";
import { Block } from "./block/Block";

import phoneimg from "./img/iphone_back.png";
import gadgetImg from "./img/ipad_back.png";
import gameImg from "./img/games.jpeg";
import homeImg from "./img/home.png";

import { NavLink } from "react-router-dom";
import { BsArrowUpRight } from "react-icons/bs";

export const CategoryCards = () => {
  return (
    <ContentWrapper>
      <div className={`${styles.content} mb-5 mt-5`}>
        <Block
          containerClass={styles.main}
          img={phoneimg}
          alt={`Для телефона`}
          title={`Для телефона`}
          imgClassList={styles.imgPhone}
        />
        <Block
          containerClass={styles.main}
          img={gadgetImg}
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
            img={gameImg}
            alt={`Для геймеров`}
            title={`Для геймеров`}
            imgClassList={styles.imgGame}
          />
          <Block
            containerClass={styles.home}
            img={homeImg}
            alt={`Для дома`}
            title={`Для дома`}
            imgClassList={styles.imgHome}
          />
        </div>
      </div>
    </ContentWrapper>
  );
};
