import {
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import orderService from "../services/orderService";

export const createOrder = createAsyncThunk(
  "createOrder",
  async (order, thunkAPI) => {
    try {
      return await orderService.createOrder(order);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

const OrderSlice = createSlice({
  name: "orderSlice",
  initialState: {
    order: [],
    isLoading: false,
    errors: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.order = action.payload;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.order = null;
        state.errors = action.error.message;
      });
  },
});

export default OrderSlice.reducer;
