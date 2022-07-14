import { configureStore } from "@reduxjs/toolkit";
import itemsSlice from "./items/itemsSlice";
import formsSlice from "./forms/formsSlice";
import itemSlice from "./item/itemSlice";

export const store = configureStore({
  reducer: {
    itemsReducer: itemsSlice,
    formReducer: formsSlice,
    singleItemReducer: itemSlice,
  },
});
