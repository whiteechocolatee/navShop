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
      });
  },
});

export default itemSlice.reducer;
