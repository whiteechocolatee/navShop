import {
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import deliveryService from "../services/deliveryService";

export const getRegions = createAsyncThunk(
  "getRegions",
  async (_, thunkAPI) => {
    try {
      return await deliveryService.getRegions();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

const deliverySlice = createSlice({
  name: "delivery",
  initialState: {
    shippingData: [],
    regions: [],
    cities: [],
    departments: [],
    isLoading: false,
  },
  reducers: {
    filteringByRegions: (state, action) => {
      state.regions = state.shippingData.filter((item) => {
        return item.SettlementAreaDescription.toLowerCase().includes(
          action.payload.toLowerCase(),
        );
      });
    },
    filteringByCity: (state, action) => {
      state.cities = state.regions.filter((item) => {
        return item.SettlementDescription.toLowerCase().includes(
          action.payload.toLowerCase(),
        );
      });
    },
    filteringDepartments: (state, action) => {
      state.departments = state.cities.filter((item) => {
        return item.Number.includes(action.payload);
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getRegions.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getRegions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.shippingData = action.payload;
      })
      .addCase(getRegions.rejected, (state, action) => {
        state.isLoading = false;
        state.shippingData = action.payload.data;
      });
  },
});

export const {
  filteringByRegions,
  filteringByCity,
  filteringDepartments,
} = deliverySlice.actions;

export default deliverySlice.reducer;
