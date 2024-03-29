import React from "react";
import styles from "./categoryCards.module.css";
import { ContentWrapper } from "../contentWrapper/ContentWrapper";
import { Block } from "./block/Block";

import { NavLink, useNavigate } from "react-router-dom";
import { BsArrowUpRight } from "react-icons/bs";
import { paths } from "../../paths";

export const CategoryCards = () => {
  const navigate = useNavigate();
  return (
    <ContentWrapper>
      <div className={`${styles.content}`}>
        <Block
          containerClass={styles.main}
          img={`https://res.cloudinary.com/dmhqzwtnd/image/upload/v1657382901/assets/iphone_back_gbuhxh.png`}
          alt={`Для телефона`}
          title={`Для телефону`}
          imgClassList={styles.imgPhone}
          onClick={() =>
            navigate(`${paths.category}/cover`)
          }
        />
        <Block
          containerClass={styles.main}
          img={`https://res.cloudinary.com/dmhqzwtnd/image/upload/v1657382898/assets/ipad_back_ykceo9.png`}
          alt={`Гаджеты`}
          title={`Гаджети`}
          imgClassList={styles.imgGadget}
          onClick={() =>
            navigate(`${paths.category}/gadgets`)
          }
        />
        <div className={styles.smallerBlocks}>
          <div className={styles.smallerBlocksTitle}>
            <h1>Категорії</h1>
            <p
              className={styles.links}
              onClick={() => window.scroll(0, 0)}>
              <span className={styles.link}>
                Подивитись усі
              </span>
              <BsArrowUpRight />
            </p>
          </div>
          <Block
            containerClass={styles.game}
            img={`https://res.cloudinary.com/dmhqzwtnd/image/upload/v1657382897/assets/games_z3v72h.jpg`}
            alt={`Для геймерів`}
            title={`Для геймеров`}
            imgClassList={styles.imgGame}
            onClick={() =>
              navigate(`${paths.category}/game`)
            }
          />
          <Block
            containerClass={styles.home}
            img={`https://res.cloudinary.com/dmhqzwtnd/image/upload/v1657382898/assets/home_wneac1.png`}
            alt={`Для дома`}
            title={`Для дому`}
            imgClassList={styles.imgHome}
            onClick={() =>
              navigate(`${paths.category}/home`)
            }
          />
        </div>
      </div>
    </ContentWrapper>
  );
};
