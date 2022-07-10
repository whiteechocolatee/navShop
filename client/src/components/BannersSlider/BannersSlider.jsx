import React, { useRef } from "react";
import styles from "./slider.module.css";
import Carousel from "react-elastic-carousel";
import { Banner } from "../Banner/Banner";

export const BannersSlider = () => {
  const carouselRef = useRef(null);
  const totalPages = 5;
  let resetTimeout;
  return (
    <div className={`container-fluid ${styles.slider}`}>
      <Carousel
        className={styles.carousel}
        pagination={false}
        showArrows={false}
        itemsToShow={1}
        ref={carouselRef}
        enableAutoPlay
        autoPlaySpeed={5000}
        onNextEnd={({ index }) => {
          clearTimeout(resetTimeout);
          if (index + 1 === totalPages) {
            resetTimeout = setTimeout(() => {
              carouselRef.current.goTo(0);
            }, 5000);
          }
        }}>
        <div className={styles.slide}>
          <Banner />
        </div>
        <div className={styles.slide}>
          <Banner />
        </div>
        <div className={styles.slide}>
          <Banner />
        </div>
        <div className={styles.slide}>
          <Banner />
        </div>
        <div className={styles.slide}>
          <Banner />
        </div>
      </Carousel>
    </div>
  );
};
