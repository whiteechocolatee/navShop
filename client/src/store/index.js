import { configureStore } from "@reduxjs/toolkit";
import carouselMainSlice from "./carouselMainPage/carouselMainSlice";

export const store = configureStore({
  reducer: {
    carousel: carouselMainSlice,
  },
});
