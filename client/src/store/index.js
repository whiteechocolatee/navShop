import { configureStore } from "@reduxjs/toolkit";
import itemsSlice from "./items/itemsSlice";
import formsSlice from "./form/formsSlice";

export const store = configureStore({
  reducer: {
    itemsReducer: itemsSlice,
    formReducer: formsSlice,
  },
});
