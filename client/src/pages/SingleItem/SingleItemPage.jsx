import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Header } from "../../components/Header/Header";
import { getItem } from "../../store/item/itemSlice";
import { ContentWrapper } from "../../components/contentWrapper/ContentWrapper";
import { Image } from "cloudinary-react";

export const SingleItemPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { item, isLoading } = useSelector((state) => {
    return state.singleItemReducer;
  });

  useEffect(() => {
    dispatch(getItem(id));
  }, [dispatch, id]);

  console.log(item, isLoading);

  return (
    <React.Fragment>
      <Header />
      <ContentWrapper>
        <h1>{item.title}</h1>
        <h1>{item.price}</h1>
        <h1>{item.description}</h1>
        <h1>{item.reviews}</h1>
        <Image
          cloudName='dmhqzwtnd'
          publicId={item.itemImage}
          alt={"titulka"}
        />
      </ContentWrapper>
    </React.Fragment>
  );
};
