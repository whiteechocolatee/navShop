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
      if (action.payload.discount > 0) {
        let item = {
          ...action.payload,
          totalPrice: Math.ceil(
            action.payload.price -
              (action.payload.price / 100) *
                action.payload.discount,
          ),
        };
        state.itemsInCart.push(item);
      } else {
        state.itemsInCart.push(action.payload);
      }
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
    increaseItem: (state, action) => {
      state.itemsInCart = state.itemsInCart.map((item) => {
        if (item._id === action.payload) {
          return {
            ...item,
            count: ++item.count,
            totalPrice:
              item.count *
              Math.ceil(
                item.price -
                  (item.price / 100) * item.discount,
              ),
          };
        }
        return item;
      });
      localStorage.setItem(
        "cart",
        JSON.stringify(state.itemsInCart),
      );
    },
    decreaseItem: (state, action) => {
      state.itemsInCart = state.itemsInCart.map((item) => {
        if (item._id === action.payload) {
          const newCount =
            item.count - 1 > 1 ? item.count - 1 : 1;

          return {
            ...item,
            count: newCount,
            totalPrice:
              newCount *
              Math.ceil(
                item.price -
                  (item.price / 100) * item.discount,
              ),
          };
        }
        return item;
      });
      localStorage.setItem(
        "cart",
        JSON.stringify(state.itemsInCart),
      );
    },
  },
});

export const {
  setItemInCart,
  removeItemFromCart,
  resetCart,
  increaseItem,
  decreaseItem,
} = cartSlice.actions;

export default cartSlice.reducer;
