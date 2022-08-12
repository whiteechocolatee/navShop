import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

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
import { paths } from "../../paths";

export const SingleItemPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  let similarItems = items?.filter((value) => {
    return (
      value.model?.toLowerCase() ===
      item?.model?.toLowerCase()
    );
  });

  const filteredColors = [
    ...new Set(similarItems?.map((value) => value.color)),
  ];

  const filteredMemory = [
    ...new Set(
      similarItems?.map((value) => value.memory).sort(),
    ),
  ];

  const addToCart = (e) => {
    e.stopPropagation();

    if (isItemInCart) {
      return false;
    } else {
      dispatch(setItemInCart(item));
    }
  };

  // console.log(filteredMemory);

  const chooseColor = (color) => {
    let [chosenItem] = similarItems.filter(
      (item) => item.color === color,
    );
    navigate(`${paths.itemPage}/${chosenItem._id}`);
  };

  const chooseMemory = (memory) => {
    let [chosenMemory] = similarItems.filter(
      (value) =>
        value.memory === memory &&
        value.color === item.color,
    );

    navigate(`${paths.itemPage}/${chosenMemory._id}`);
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
                  <Filter
                    characteristic={item.characteristics}
                  />
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
                  {filteredColors.length > 0 ? (
                    <div className={styles.colors}>
                      <div>Color:</div>
                      {filteredColors?.map((value) => {
                        return (
                          <div>
                            {item.color === value ? (
                              <div
                                className={
                                  styles.chosenColor
                                }>
                                <div
                                  className={styles.color}
                                  style={{
                                    backgroundColor: value,
                                  }}></div>
                              </div>
                            ) : (
                              <div
                                className={
                                  styles.chooseColor
                                }
                                onClick={() =>
                                  chooseColor(value)
                                }>
                                <div
                                  className={styles.color}
                                  style={{
                                    backgroundColor: value,
                                  }}></div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  ) : null}
                  {filteredMemory.length > 0 ? (
                    <div className={styles.memories}>
                      <div>Memory:</div>
                      {filteredMemory?.map((value) => {
                        return (
                          <div>
                            {item.memory === value ? (
                              <div
                                className={
                                  styles.chosenMemory
                                }>
                                <p>{value} Gb</p>
                              </div>
                            ) : (
                              <div
                                className={
                                  styles.chooseMemory
                                }
                                onClick={() =>
                                  chooseMemory(value)
                                }>
                                <p>{value} Gb</p>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
            <div className={styles.itemFooter}>
              <div className={styles.footerTitle}>
                <h3>Опис</h3>
              </div>
              <p className={styles.footerBody}>
                {item.description}
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
