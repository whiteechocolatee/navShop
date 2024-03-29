import {
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import deliveryService from "../services/deliveryService";

export const getAreas = createAsyncThunk(
  "getAreas",
  async (_, thunkAPI) => {
    try {
      return await deliveryService.getAreas();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const getAllDepartments = createAsyncThunk(
  "getAllDepartments",
  async (_, thunkAPI) => {
    try {
      return await deliveryService.getAllDepartments();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

const deliverySlice = createSlice({
  name: "delivery",
  initialState: {
    areas: [],
    cities: [],
    departments: [],
    departmentByCity: [],
    isLoading: false,
    areasLoading: false,
    reducerLoading: false,
  },
  reducers: {
    getCitiesByArea: (state, action) => {
      state.reducerLoading = true;
      let cities = state.departments.filter((city) => {
        return city.SettlementAreaDescription.toLowerCase().includes(
          action.payload.toLowerCase(),
        );
      });

      cities = Array.from(
        new Set(cities.map((city) => city.CityDescription)),
      ).sort();
      state.cities = cities;
      state.reducerLoading = false;
    },
    getDepartmentsByCity: (state, action) => {
      state.reducerLoading = true;

      state.departmentByCity = state.departments.filter(
        (department) => {
          return department.CityDescription.toLowerCase().includes(
            action.payload.toLowerCase(),
          );
        },
      );
      state.reducerLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAreas.pending, (state) => {
        state.areasLoading = true;
      })
      .addCase(getAreas.fulfilled, (state, action) => {
        state.areasLoading = false;
        state.areas = action.payload;
      })
      .addCase(getAreas.rejected, (state, action) => {
        state.areasLoading = false;
        state.areas = action.payload.data;
      })
      .addCase(getAllDepartments.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        getAllDepartments.fulfilled,
        (state, action) => {
          state.isLoading = false;
          state.departments = action.payload;
        },
      )
      .addCase(
        getAllDepartments.rejected,
        (state, action) => {
          state.isLoading = false;
          state.departments = action.payload.data;
        },
      );
  },
});

export const { getCitiesByArea, getDepartmentsByCity } =
  deliverySlice.actions;

export default deliverySlice.reducer;
