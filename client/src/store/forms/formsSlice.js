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

const formSlice = createSlice({
  name: "form",
  initialState: {
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
          console.log(action.payload);
          state.isLoading = false;
          state.isError = true;
          state.errors = action.payload;
        },
      );
  },
});

export default formSlice.reducer;