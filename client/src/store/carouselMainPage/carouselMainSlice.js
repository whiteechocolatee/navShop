import carouselService from "../services/carouselService";
import {
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";

export const getItemsMainCarousel = createAsyncThunk(
  "getCarousel",
  async (_, thunkAPI) => {
    try {
      return await carouselService.getNewItems();
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
      .addCase(getItemsMainCarousel.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        getItemsMainCarousel.fulfilled,
        (state, action) => {
          state.isLoading = false;
          state.items = action.payload;
        },
      )
      .addCase(
        getItemsMainCarousel.rejected,
        (state, action) => {
          state.isLoading = false;
          state.items = null;
          state.isError = action.error.message;
        },
      );
  },
});

export default carouselMainPage.reducer;
