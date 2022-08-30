import mainService from "../services/mainServices";
import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";

export const getItem = createAsyncThunk(
  "getItemById",
  async (id, thunkAPI) => {
    try {
      return await mainService.getItem(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const updateItem = createAsyncThunk(
  "updateItem",
  async (item, thunkAPI) => {
    try {
      return await mainService.updateItem(item);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const createItem = createAsyncThunk(
  "createItem",
  async (item, thunkAPI) => {
    try {
      return await mainService.createItem(item);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

const itemSlice = createSlice({
  name: "item",
  initialState: {
    item: [],
    singleItemLoading: false,
    isError: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getItem.pending, (state) => {
        state.item = [];
        state.isLoading = true;
      })
      .addCase(getItem.fulfilled, (state, action) => {
        state.isLoading = false;
        state.item = action.payload;
      })
      .addCase(getItem.rejected, (state, action) => {
        state.isLoading = false;
        state.item = [];
        state.isError = action.payload.data;
      })
      // update item
      .addCase(updateItem.pending, (state) => {
        state.item = [];
        state.isLoading = true;
      })
      .addCase(updateItem.fulfilled, (state, action) => {
        state.isLoading = false;
        state.item = action.payload;
      })
      .addCase(updateItem.rejected, (state, action) => {
        state.isLoading = false;
        state.item = [];
        state.isError = action.payload.data;
      })
      // create item
      .addCase(createItem.pending, (state) => {
        state.item = [];
        state.isLoading = true;
      })
      .addCase(createItem.fulfilled, (state, action) => {
        state.isLoading = false;
        state.item = action.payload;
      })
      .addCase(createItem.rejected, (state, action) => {
        state.item = [];
        state.isLoading = true;
        state.error = action.payload;
      });
  },
});

export default itemSlice.reducer;
