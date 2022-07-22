import { configureStore } from "@reduxjs/toolkit";
import itemsSlice from "./items/itemsSlice";
import formsSlice from "./forms/formsSlice";
import itemSlice from "./item/itemSlice";
import userAuthSlice from "./users/userAuthSlice";
import cartSlice from "./cart/cartSlice";

export const store = configureStore({
  reducer: {
    itemsReducer: itemsSlice,
    singleItemReducer: itemSlice,
    formReducer: formsSlice,
    userAuthReducer: userAuthSlice,
    cartReducer: cartSlice,
  },
});
