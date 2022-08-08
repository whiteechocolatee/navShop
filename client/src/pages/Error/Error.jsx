import React from "react";
import styles from "./error.module.css";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../components/Button/Button";
import { ImageComponent } from "../../components/Image/Image";

let mario =
  "https://res.cloudinary.com/dmhqzwtnd/image/upload/v1659963760/assets/mario-removebg-preview_ncjbkg.png";
let block = `https://res.cloudinary.com/dmhqzwtnd/image/upload/v1659963781/assets/block-removebg-preview_j2qesx.png`;
let zero =
  "https://res.cloudinary.com/dmhqzwtnd/image/upload/v1659964678/assets/png-clipart-minecraft-story-mode-pixel-art-cute-number-zero-angle-rectangle-removebg-preview_jhbrrj.png";
let pipe =
  "https://res.cloudinary.com/dmhqzwtnd/image/upload/v1659965711/assets/pipe_mario_exvad7.png";

export const Error = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className={styles.body}>
      <div className={styles.centered}>
        {/* <div className={styles.title}>
          <p className={styles.firstNumber}>4</p>
          <div className={styles.imageContainer}>
            <div className={styles.image}>
              <ImageComponent
                alt={"block"}
                publicId={block}
              />
            </div>
          </div>
          <div className={styles.zero}>
            <ImageComponent alt={"block"} publicId={zero} />
            <Button children='Назад' onClick={handleBack} />
          </div>
          <p>4</p>
        </div>
      </div>
      <div className={styles.mario}>
        <ImageComponent publicId={mario} />
      </div>
      <div className={styles.pipe}>
        <ImageComponent publicId={pipe} /> */}
        <div className={styles.title}>
          404
          <Button children='Назад' onClick={handleBack} />
        </div>
      </div>
    </div>
  );
};
