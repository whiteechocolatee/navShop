import {
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import deliveryService from "../services/deliveryService";

export const getCities = createAsyncThunk(
  "getCities",
  async (_, thunkAPI) => {
    try {
      return await deliveryService.getCities();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

const deliverySlice = createSlice({
  name: "delivery",
  initialState: {
    cities: [],
    isLoading: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCities.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCities.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cities = action.payload;
      })
      .addCase(getCities.rejected, (state, action) => {
        state.isLoading = false;
        state.cities = action.payload.data;
      });
  },
});

export default deliverySlice.reducer;
