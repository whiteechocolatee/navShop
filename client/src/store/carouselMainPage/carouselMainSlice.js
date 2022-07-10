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

export const getDiscountItemsCarousel = createAsyncThunk(
  "getDiscountCarousel",
  async (_, thunkAPI) => {
    try {
      return await carouselService.getDiscountItems();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

const carouselMainPage = createSlice({
  name: "carouselItems",
  initialState: {
    items: {
      newItems: [],
      itemsByCategory: [],
      discountItems: [],
    },
    isLoading: {
      newItemsLoading: false,
      ItemsByCategoryLoading: false,
      discountItemsLoading: false,
    },
    isError: false,
    message: "",
  },
  extraReducers: (builder) => {
    builder
      .addCase(getNewItemsCarousel.pending, (state) => {
        state.isLoading.newItemsLoading = true;
      })
      .addCase(
        getNewItemsCarousel.fulfilled,
        (state, action) => {
          state.isLoading.newItemsLoading = false;
          state.items.newItems = action.payload;
        },
      )
      .addCase(
        getNewItemsCarousel.rejected,
        (state, action) => {
          state.isLoading.newItemsLoading = false;
          state.items.newItems = null;
          state.isError = action.error.message;
        },
      )
      .addCase(
        getItemsByCategoryCarousel.pending,
        (state) => {
          state.isLoading.ItemsByCategoryLoading = true;
        },
      )
      .addCase(
        getItemsByCategoryCarousel.fulfilled,
        (state, action) => {
          state.isLoading.ItemsByCategoryLoading = false;
          state.items.itemsByCategory = action.payload;
        },
      )
      .addCase(
        getItemsByCategoryCarousel.rejected,
        (state, action) => {
          state.isLoading.ItemsByCategoryLoading = false;
          state.items.itemsByCategory = null;
          state.isError = action.error.message;
        },
      )
      .addCase(
        getDiscountItemsCarousel.pending,
        (state) => {
          state.isLoading.discountItemsLoading = true;
        },
      )
      .addCase(
        getDiscountItemsCarousel.fulfilled,
        (state, action) => {
          state.isLoading.discountItemsLoading = false;
          state.items.discountItems = action.payload;
        },
      )
      .addCase(
        getDiscountItemsCarousel.rejected,
        (state, action) => {
          state.isLoading.discountItemsLoading = false;
          state.items.discountItems = null;
          state.isError = action.error.message;
        },
      );
  },
});

export default carouselMainPage.reducer;
