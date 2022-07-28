import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    itemsInCart: localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : [],
  },
  reducers: {
    setItemInCart: (state, action) => {
      state.itemsInCart.push(action.payload);
      localStorage.setItem(
        "cart",
        JSON.stringify(state.itemsInCart),
      );
    },
    removeItemFromCart: (state, action) => {
      state.itemsInCart = state.itemsInCart.filter(
        (item) => item._id !== action.payload,
      );
      localStorage.setItem(
        "cart",
        JSON.stringify(state.itemsInCart),
      );
    },
    resetCart: (state) => {
      state.itemsInCart = [];
      localStorage.removeItem("cart");
    },
  },
});

export const {
  setItemInCart,
  removeItemFromCart,
  resetCart,
} = cartSlice.actions;

export default cartSlice.reducer;
