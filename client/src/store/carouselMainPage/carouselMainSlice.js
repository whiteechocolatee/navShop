import carouselService from "../services/carouselService";
import {
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";

export const getNewItemsCarousel = createAsyncThunk(
  "getCarouselNew",
  async (_, thunkAPI) => {
    try {
      return await carouselService.getNewItems();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const getItemsByCategoryCarousel = createAsyncThunk(
  "getCarouselByCategory",
  async (category, thunkAPI) => {
    try {
      return await carouselService.getItemsByCategory(
        category,
      );
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

const carouselMainPage = createSlice({
  name: "carouselItems",
  initialState: {
    items: [],
    itemsByCategory: [],
    isLoading: false,
    isError: false,
    message: "",
  },
  extraReducers: (builder) => {
    builder
      .addCase(getNewItemsCarousel.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        getNewItemsCarousel.fulfilled,
        (state, action) => {
          state.isLoading = false;
          state.items = action.payload;
        },
      )
      .addCase(
        getNewItemsCarousel.rejected,
        (state, action) => {
          state.isLoading = false;
          state.items = null;
          state.isError = action.error.message;
        },
      )
      .addCase(
        getItemsByCategoryCarousel.pending,
        (state) => {
          state.isLoading = true;
        },
      )
      .addCase(
        getItemsByCategoryCarousel.fulfilled,
        (state, action) => {
          state.isLoading = false;
          state.itemsByCategory = action.payload;
        },
      )
      .addCase(
        getItemsByCategoryCarousel.rejected,
        (state, action) => {
          state.isLoading = false;
          state.itemsByCategory = null;
          state.isError = action.error.message;
        },
      );
  },
});

export default carouselMainPage.reducer;
