import { configureStore } from "@reduxjs/toolkit";
import itemsSlice from "./items/itemsSlice";
import formsSlice from "./forms/formsSlice";
import itemSlice from "./item/itemSlice";
import userLoginSlice from "./users/userLoginSlice";
import userRegisterSlice from "./users/userRegisterSlice";

export const store = configureStore({
  reducer: {
    itemsReducer: itemsSlice,
    formReducer: formsSlice,
    singleItemReducer: itemSlice,
    userLogReducer: userLoginSlice,
    userSignReducer: userRegisterSlice,

  },
});
