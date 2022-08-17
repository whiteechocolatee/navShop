import mainService from "../services/mainServices";
import {
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";

export const getItems = createAsyncThunk(
  "getAllItems",
  async (_, thunkAPI) => {
    try {
      return await mainService.getItems();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const getItemsByCategory = createAsyncThunk(
  "getItemsByCategory",
  async (category, thunkAPI) => {
    try {
      return await mainService.getItemsByCategory(category);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

const ItemsSlice = createSlice({
  name: "itemsSlice",
  initialState: {
    items: [],
    isLoading: false,
    isError: false,
    message: "",
  },
  extraReducers: (builder) => {
    builder
      .addCase(getItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(getItems.rejected, (state, action) => {
        state.isLoading = false;
        state.items = null;
        state.isError = action.error.message;
      })
      // get items by category
      .addCase(getItemsByCategory.pending, (state) => {
        state.isLoading = true;
        state.items = [];
      })
      .addCase(
        getItemsByCategory.fulfilled,
        (state, action) => {
          state.isLoading = false;
          state.items = action.payload;
        },
      )
      .addCase(
        getItemsByCategory.rejected,
        (state, action) => {
          state.isLoading = false;
          state.items = null;
          state.isError = action.error.message;
        },
      );
  },
});

export default ItemsSlice.reducer;
