import React from "react";
import { NavLink } from "react-router-dom";
import {
  RiDeviceRecoverLine,
  RiComputerLine,
} from "react-icons/ri";
import {
  GiPowerGenerator,
  GiAudioCassette,
} from "react-icons/gi";
import { FaCarSide, FaHome } from "react-icons/fa";
import { FiSmartphone } from "react-icons/fi";
import { GrGamepad } from "react-icons/gr";

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
                to={`${paths.category}/smartphones`}
                style={({ isActive }) => ({
                  color: isActive ? "#ABAFE9" : "#000",
                })}>
                <FiSmartphone />
                Смартфони
              </NavLink>
            </li>
            <li className={styles.navBtn}>
              <NavLink
                to={`${paths.category}/cover`}
                style={({ isActive }) => ({
                  color: isActive ? "#ABAFE9" : "#000",
                })}>
                <RiDeviceRecoverLine />
                Аксесуари
              </NavLink>
            </li>
            <li className={styles.navBtn}>
              <NavLink
                to={`${paths.category}/gadgets`}
                style={({ isActive }) => ({
                  color: isActive ? "#ABAFE9" : "#000",
                })}>
                <GiPowerGenerator />
                Гаджети
              </NavLink>
            </li>
            <li className={styles.navBtn}>
              <NavLink
                to={`${paths.category}/audio`}
                style={({ isActive }) => ({
                  color: isActive ? "#ABAFE9" : "#000",
                })}>
                <GiAudioCassette />
                Аудіо
              </NavLink>
            </li>
            <li className={styles.navBtn}>
              <NavLink
                to={`${paths.category}/home`}
                style={({ isActive }) => ({
                  color: isActive ? "#ABAFE9" : "#000",
                })}>
                <FaHome />
                Для дому
              </NavLink>
            </li>
            <li className={styles.navBtn}>
              <NavLink
                to={`${paths.category}/pc`}
                style={({ isActive }) => ({
                  color: isActive ? "#ABAFE9" : "#000",
                })}>
                <RiComputerLine />
                Для компьютерів
              </NavLink>
            </li>
            <li className={styles.navBtn}>
              <NavLink
                to={`${paths.category}/game`}
                style={({ isActive }) => ({
                  color: isActive ? "#ABAFE9" : "#000",
                })}>
                <GrGamepad />
                Для геймерів
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
