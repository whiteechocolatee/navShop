import mainService from "../services/mainServices";
import {
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";

export const getNewItemsCarousel = createAsyncThunk(
  "getCarouselNew",
  async (_, thunkAPI) => {
    try {
      return await mainService.getItems();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

const carouselMainPage = createSlice({
  name: "carouselItems",
  initialState: {
    items: [],
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
      );
  },
});

export default carouselMainPage.reducer;
