import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { CategoriesNavigation } from "../../components/CategoriesNav/CategoriesNavigation";
import { Header } from "../../components/Header/Header";
import { Footer } from "../../components/Footer/Footer";
import { Loader } from "../../components/Loader/Loader";

import { getItemsByCategory } from "../../store/items/itemsSlice";
import { ItemCarousel } from "../../components/ItemsByType/ItemCarousel";

export const CategoryPage = () => {
  const { categoryName } = useParams();
  const dispatch = useDispatch();

  const { items, isLoading } = useSelector((state) => {
    return state.itemsReducer;
  });

  useEffect(() => {
    dispatch(getItemsByCategory(categoryName));
  }, [categoryName, dispatch]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <React.Fragment>
      <Header />
      <CategoriesNavigation />
      <ItemCarousel
        itemsQuantity={16}
        title={`Категория ${categoryName}`}
        items={items}
      />
      <Footer />
    </React.Fragment>
  );
};
