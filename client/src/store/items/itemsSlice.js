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

export const deleteProductById = createAsyncThunk(
  "deleteProductById",

  async (id, thunkAPI) => {
    try {
      return await mainService.deleteProductById(id);
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
      )
      // delete product by id
      .addCase(deleteProductById.pending, (state) => {
        state.isError = null;
        state.isLoading = true;
      })
      .addCase(
        deleteProductById.fulfilled,
        (state, action) => {
          state.isLoading = false;
          state.message = action.payload;
        },
      )
      .addCase(deleteProductById, (state, action) => {
        state.isError = action.error.message;
        state.isLoading = false;
        state.message = "";
      });
  },
});

export default ItemsSlice.reducer;
