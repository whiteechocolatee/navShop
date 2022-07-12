import { configureStore } from "@reduxjs/toolkit";
import carouselMainSlice from "./carouselMainPage/carouselMainSlice";
import fromsSlice from "./form/formsSlice";

export const store = configureStore({
  reducer: {
    carousel: carouselMainSlice,
    form: fromsSlice,
  },
});
