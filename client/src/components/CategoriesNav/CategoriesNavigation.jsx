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
import { paths } from "../../paths";

export const CategoriesNavigation = () => {
  return (
    <React.Fragment>
      <ContentWrapper>
        <nav className={styles.nav}>
          <ul className={styles.navBtns}>
            <li className={styles.navBtn}>
              <NavLink
                to={`${paths.category}/charger`}
                style={({ isActive }) => ({
                  color: isActive ? "#ABAFE9" : "#000",
                })}>
                <RiBattery2ChargeLine />
                Зарядные
              </NavLink>
            </li>
            <li className={styles.navBtn}>
              <NavLink
                to={`${paths.category}/cover`}
                style={({ isActive }) => ({
                  color: isActive ? "#ABAFE9" : "#000",
                })}>
                <RiDeviceRecoverLine />
                Защитные акссесуары
              </NavLink>
            </li>
            <li className={styles.navBtn}>
              <NavLink
                to={`${paths.category}/gadget`}
                style={({ isActive }) => ({
                  color: isActive ? "#ABAFE9" : "#000",
                })}>
                <GiPowerGenerator />
                Гаджеты
              </NavLink>
            </li>
            <li className={styles.navBtn}>
              <NavLink
                to={`${paths.category}/audio`}
                style={({ isActive }) => ({
                  color: isActive ? "#ABAFE9" : "#000",
                })}>
                <GiAudioCassette />
                Аудио
              </NavLink>
            </li>
            <li className={styles.navBtn}>
              <NavLink
                to={`${paths.category}/pc`}
                style={({ isActive }) => ({
                  color: isActive ? "#ABAFE9" : "#000",
                })}>
                <RiComputerLine />
                Для компьютеров
              </NavLink>
            </li>
            <li className={styles.navBtn}>
              <NavLink
                to={`${paths.category}/auto`}
                style={({ isActive }) => ({
                  color: isActive ? "#ABAFE9" : "#000",
                })}>
                <FaCarSide />
                Для авто
              </NavLink>
            </li>
          </ul>
        </nav>
      </ContentWrapper>
    </React.Fragment>
  );
};
