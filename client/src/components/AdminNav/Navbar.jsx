import React, { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { GrClose } from "react-icons/gr";
import {
  AiOutlineHome,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { FiPhoneCall, FiUsers } from "react-icons/fi";
import { BsCartPlus, BsBag, BsShop } from "react-icons/bs";
import { Link } from "react-router-dom";

import styles from "./navbar.module.css";
import { paths } from "../../paths";

export const Navbar = () => {
  const [sidebar, setSidebar] = useState(false);

  const toggleNav = () => setSidebar(!sidebar);

  return (
    <>
      <div className={styles.header}>
        <div>
          <GiHamburgerMenu onClick={toggleNav} />
        </div>
      </div>
      <nav
        className={
          sidebar
            ? `${styles.navbar} ${styles.active}`
            : styles.navbar
        }>
        <ul className={styles.navItems} onClick={toggleNav}>
          <li className={styles.navToggle}>
            <GrClose />
          </li>
          <li className={styles.navItem}>
            <AiOutlineHome />
            <span>
              <Link to={paths.admin}>Головна</Link>
            </span>
          </li>
          <li className={styles.navItem}>
            <BsCartPlus />
            <span>
              <Link to='#'>Додати товар</Link>
            </span>
          </li>
          <li className={styles.navItem}>
            <AiOutlineShoppingCart />
            <span>
              <Link to='#'>Товари</Link>
            </span>
          </li>
          <li className={styles.navItem}>
            <FiPhoneCall />
            <span>
              <Link to='#'>Дзвінки</Link>
            </span>
          </li>
          <li className={styles.navItem}>
            <BsBag />
            <span>
              <Link to='#'>Замовлення</Link>
            </span>
          </li>
          <li className={styles.navItem}>
            <FiUsers />
            <span>
              <Link to='#'>Користувачі</Link>
            </span>
          </li>
          <li className={styles.navItem}>
            <BsShop />
            <span>
              <Link to='/'>До магазину</Link>
            </span>
          </li>
        </ul>
      </nav>
    </>
  );
};
