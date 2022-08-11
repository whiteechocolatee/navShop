import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import styles from "./singleItem.module.css";
import { Header } from "../../components/Header/Header";
import { ContentWrapper } from "../../components/contentWrapper/ContentWrapper";
import { Loader } from "../../components/Loader/Loader";
import { CategoriesNavigation } from "../../components/CategoriesNav/CategoriesNavigation";
import { Button } from "../../components/Button/Button";
import { ImageComponent } from "../../components/Image/Image";
import { Filter } from "../../components/Filter/Filter";
import { Footer } from "../../components/Footer/Footer";
import { ItemCarousel } from "../../components/ItemsByType/ItemCarousel";
import { AddToFavorite } from "../../components/AddToFavorite/AddToFavorite";

import { setItemInCart } from "../../store/cart/cartSlice";
import { getItem } from "../../store/item/itemSlice";
import { getItems } from "../../store/items/itemsSlice";

export const SingleItemPage = () => {
  window.scroll(0, 0);
  const { id } = useParams();
  const dispatch = useDispatch();

  const { item, singleItemLoading } = useSelector(
    (state) => {
      return state.singleItemReducer;
    },
  );

  let cart = useSelector(
    (state) => state.cartReducer.itemsInCart,
  );

  const isItemInCart = cart?.some(
    (itemInCart) => itemInCart._id === item._id,
  );

  const { items, isLoading } = useSelector((state) => {
    return state.itemsReducer;
  });

  const discount = items.filter((elem) => {
    return elem.discount > 0;
  });

  const buyPerClick = () => {
    cart = [];
    cart.push(item);
  };

  const addToCart = (e) => {
    e.stopPropagation();

    if (isItemInCart) {
      return false;
    } else {
      dispatch(setItemInCart(item));
    }
  };

  useEffect(() => {
    dispatch(getItems());
    dispatch(getItem(id));
  }, [dispatch, id]);

  return (
    <React.Fragment>
      <Header />
      <CategoriesNavigation />
      <ContentWrapper>
        {singleItemLoading || isLoading ? (
          <Loader containerClassName={styles.loader} />
        ) : (
          <div className={styles.itemContainer}>
            <div className={styles.itemHeader}>
              <div className={styles.itemTitle}>
                {item.title}
              </div>
              <div className={styles.itemPrice}>
                <div>
                  <h1>
                    {" "}
                    {item.discount > 0
                      ? Math.ceil(
                          item.price -
                            (item.price / 100) *
                              item.discount,
                        )
                      : item.price}{" "}
                    ₴
                  </h1>
                </div>
                <Button
                  onClick={addToCart}
                  containerClassName={styles.itemPriceBtn}
                  children={
                    isItemInCart
                      ? `В кошику`
                      : `Додати в кошик`
                  }
                />
              </div>
            </div>
            <div className={styles.itemBody}>
              <div className={styles.itemImage}>
                <ImageComponent
                  publicId={item.itemImage}
                  alt={item.title}
                />
              </div>
              <div className={styles.itemInfo}>
                <div className={styles.itemInfoTitle}>
                  <p>Характеристики</p>
                  <p>артикул : 123123</p>
                </div>
                <div className={styles.itemFilter}>
                  <Filter data={data} />
                </div>
                <div className={styles.itemNavigation}>
                  <div className={styles.itemAddFavorite}>
                    <AddToFavorite
                      toBeFavorite={
                        <span className={styles.favText}>
                          додати в обране
                        </span>
                      }
                      alreadyFavorite={
                        <span className={styles.favText}>
                          вже обрано
                        </span>
                      }
                      item={item}
                    />
                  </div>
                  <div
                    onClick={buyPerClick}
                    className={styles.itemBuy}>
                    <p>купити в один клік</p>
                  </div>
                </div>
                <div className={styles.additional}>
                  <div className={styles.colors}>
                    <div>Color:</div>
                    <div className={styles.color}>
                      <input type='color' value='#242424' />
                    </div>
                    <div className={styles.color}>
                      <input type='color' value='#f1f1f1' />
                    </div>
                    <div className={styles.color}>
                      <input type='color' value='#d1d2d9' />
                    </div>
                  </div>
                  <div className={styles.memories}>
                    <div>Memory:</div>
                    <div className={styles.memory}>
                      128gb
                    </div>
                    <div className={styles.memory}>
                      256gb
                    </div>
                    <div className={styles.memory}>
                      512gb
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.itemFooter}>
              <div className={styles.footerTitle}>
                <h3>Опис</h3>
              </div>
              <p className={styles.footerBody}>
                Lorem, ipsum dolor sit amet consectetur
                adipisicing elit. Ipsum doloribus vero esse
                ea dolorum. Dolor hic laborum fugiat
                expedita veritatis, sed vero placeat,
                incidunt repudiandae quae ex mollitia saepe
                corporis, molestias voluptas odio
                aspernatur. Corrupti voluptatibus doloremque
                inventore provident voluptatem, eligendi
                amet vel. Veritatis ad voluptatum maxime
                magni dicta quis, officia harum sequi et
                aperiam enim modi. Vel iste deserunt ut
                consectetur facere natus quisquam ex
                quibusdam numquam unde adipisci at beatae,
                nisi voluptatem. Quae sit, ipsum vel cumque
                cupiditate, optio nesciunt omnis rerum
                quisquam voluptates quod sed repudiandae hic
                obcaecati. Incidunt ad, temporibus repellat
                similique quos exercitationem necessitatibus
                molestias.
              </p>
            </div>
            <div className={styles.recommended}>
              <div className={styles.recommendedTitle}>
                <h1>Рекомендовані товари</h1>
              </div>
              <ItemCarousel
                containerClassName={styles.flex}
                itemsQuantity={4}
                items={discount}
              />
            </div>
          </div>
        )}
      </ContentWrapper>
      <Footer />
    </React.Fragment>
  );
};

let data = [
  {
    question: "test 1",
    answer: ` Lorem, ipsum dolor sit amet consectetur
    adipisicing elit. Ipsum doloribus vero esse
    ea dolorum. Dolor hic laborum fugiat
    expedita veritatis,`,
  },
  {
    question: "test 2",
    answer: ` Lorem, ipsum dolor sit amet consectetur
    adipisicing elit. Ipsum doloribus vero esse
    ea dolorum. Dolor hic laborum fugiat
    expedita veritatis,`,
  },
  {
    question: "test 3",
    answer: ` Lorem, ipsum dolor sit amet consectetur
    adipisicing elit. Ipsum doloribus vero esse
    ea dolorum. Dolor hic laborum fugiat
    expedita veritatis,`,
  },
  {
    question: "test 4",
    answer: ` Lorem, ipsum dolor sit amet consectetur
    adipisicing elit. Ipsum doloribus vero esse
    ea dolorum. Dolor hic laborum fugiat
    expedita veritatis,`,
  },
];
