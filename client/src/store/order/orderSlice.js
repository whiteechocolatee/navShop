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

export const getUserOrders = createAsyncThunk(
  "getUserOrders",
  async (_, thunkAPI) => {
    try {
      return await orderService.userOrders();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const getOrders = createAsyncThunk(
  "getOrders",
  async (_, thunkAPI) => {
    try {
      return await orderService.getOrders();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const getSingleOrder = createAsyncThunk(
  "getSingleOrder",
  async (id, thunkAPI) => {
    try {
      return await orderService.getSingleOrder(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const markAsDelivered = createAsyncThunk(
  "markAsDelivered",
  async (id, thunkAPI) => {
    try {
      return await orderService.markAsDelivered(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

const OrderSlice = createSlice({
  name: "orderSlice",
  initialState: {
    orders: [],
    isLoading: false,
    errors: null,
  },
  extraReducers: (builder) => {
    // create order
    builder

      .addCase(createOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.orders = [];
        state.errors = action.error.message;
      })

      //get user orders
      .addCase(getUserOrders.pending, (state) => {
        state.isLoading = true;
        state.orders = [];
      })
      .addCase(getUserOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload;
      })
      .addCase(getUserOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.orders = [];
        state.errors = action.error.message;
      })

      //get orders by admin
      .addCase(getOrders.pending, (state) => {
        state.orders = [];
        state.isLoading = true;
        state.errors = null;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.orders = action?.payload;
        state.isLoading = false;
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.orders = [];
        state.errors = action.error.message;
      })

      // get single order by admin or user
      .addCase(getSingleOrder.pending, (state) => {
        state.orders = [];
        state.isLoading = true;
        state.errors = null;
      })
      .addCase(
        getSingleOrder.fulfilled,
        (state, action) => {
          state.orders = action.payload;
          state.isLoading = false;
          state.errors = null;
        },
      )
      .addCase(getSingleOrder.rejected, (state, action) => {
        state.errors = action.error.message;
        state.isLoading = false;
        state.orders = [];
      })
      .addCase(markAsDelivered.pending, (state) => {
        state.orders = [];
        state.isLoading = true;
        state.errors = null;
      })
      .addCase(
        markAsDelivered.fulfilled,
        (state, action) => {
          state.orders = action.payload;
          state.isLoading = false;
          state.errors = null;
        },
      )
      .addCase(
        markAsDelivered.rejected,
        (state, action) => {
          state.errors = action.error.message;
          state.isLoading = false;
          state.orders = [];
        },
      );
  },
});

export default OrderSlice.reducer;
