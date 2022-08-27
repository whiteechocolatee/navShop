import {
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";

import formService from "../services/formService";

export const createCallbackRequest = createAsyncThunk(
  "createCallbackRequest",
  async (formData, thunkAPI) => {
    try {
      return await formService.createCallbackRequest(
        formData,
      );
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const getCallbacks = createAsyncThunk(
  "getCallbacks",
  async (_, thunkAPI) => {
    try {
      return await formService.getCallbacks();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const getSingleCallback = createAsyncThunk(
  "getSingleCallback",
  async (id, thunkAPI) => {
    try {
      return await formService.getSingleCallback(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

const formSlice = createSlice({
  name: "form",
  initialState: {
    callbacks: [],
    isLoading: false,
    isError: false,
    errors: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createCallbackRequest.pending, (state) => {
        state.isLoading = true;
        state.errors = null;
      })
      .addCase(createCallbackRequest.fulfilled, (state) => {
        state.isLoading = false;
        state.errors = null;
      })
      .addCase(
        createCallbackRequest.rejected,
        (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.errors = action.payload;
        },
      )
      // get all callbacks
      .addCase(getCallbacks.pending, (state) => {
        state.callbacks = [];
        state.isLoading = true;
      })
      .addCase(getCallbacks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.callbacks = action.payload;
      })
      .addCase(getCallbacks.rejected, (state, action) => {
        state.callbacks = [];
        state.isLoading = false;
        state.errors = action.payload;
      })
      //get single callback
      .addCase(getSingleCallback.pending, (state) => {
        state.callbacks = [];
        state.isLoading = true;
        state.isError = false;
        state.errors = null;
      })
      .addCase(
        getSingleCallback.fulfilled,
        (state, action) => {
          state.callbacks = action.payload;
          state.isLoading = false;
          state.isError = false;
          state.errors = null;
        },
      )
      .addCase(
        getSingleCallback.rejected,
        (state, action) => {
          state.callbacks = [];
          state.isLoading = false;
          state.isError = true;
          state.errors = action.payload?.message;
        },
      );
  },
});

export default formSlice.reducer;
