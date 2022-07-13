import React from "react";
import { useParams } from "react-router-dom";
import { CategoriesNavigation } from "../../components/CategoriesNav/CategoriesNavigation";
import { Header } from "../../components/Header/Header";

export const CategoryPage = () => {
  const { categoryName } = useParams();

  console.log(categoryName);

  return (
    <React.Fragment>
      <Header />
      <CategoriesNavigation />
    </React.Fragment>
  );
};
