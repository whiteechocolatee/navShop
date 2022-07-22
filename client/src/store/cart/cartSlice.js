import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    itemsInCart: [],
  },
  reducers: {
    setItemInCart: (state, action) => {
      state.itemsInCart.push(action.payload);
    },
    removeItemFromCart: (state, action) => {
      state.itemsInCart = state.itemsInCart.filter(
        (item) => item._id !== action.payload,
      );
    },
  },
});

export const { setItemInCart, removeItemFromCart } =
  cartSlice.actions;

export default cartSlice.reducer;
