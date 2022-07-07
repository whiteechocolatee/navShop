import React from "react";
import { NavLink } from "react-router-dom";
import {
  RiBattery2ChargeLine,
  RiDeviceRecoverLine,
  RiComputerLine,
} from "react-icons/ri";
import {
  GiPowerGenerator,
  GiAudioCassette,
} from "react-icons/gi";
import { FaCarSide } from "react-icons/fa";

import styles from "./nav.module.css";
import { ContentWrapper } from "../contentWrapper/ContentWrapper";

export const CategoriesNavigation = () => {
  return (
    <React.Fragment>
      <ContentWrapper>
        <nav className={styles.nav}>
          <ul className={styles.navBtns}>
            <li className={styles.navBtn}>
              <RiBattery2ChargeLine />
              <NavLink to={`/`}>Зарядные</NavLink>
            </li>
            <li className={styles.navBtn}>
              <RiDeviceRecoverLine />
              <NavLink to={`/`}>
                Защитные акссесуары
              </NavLink>
            </li>
            <li className={styles.navBtn}>
              <GiPowerGenerator />
              <NavLink to={`/`}>Гаджеты</NavLink>
            </li>
            <li className={styles.navBtn}>
              <GiAudioCassette />
              <NavLink to={`/`}>Аудио</NavLink>
            </li>
            <li className={styles.navBtn}>
              <RiComputerLine />
              <NavLink to={`/`}>
                Для компьютеров
              </NavLink>
            </li>
            <li className={styles.navBtn}>
              <FaCarSide />
              <NavLink to={`/`}>
                Для авто
              </NavLink>
            </li>
          </ul>
        </nav>
      </ContentWrapper>
    </React.Fragment>
  );
};
