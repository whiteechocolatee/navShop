import {
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";

import usersServices from "../services/usersServices";

export const userLogin = createAsyncThunk(
  "userLogin",
  async (formData, thunkAPI) => {
    try {
      return await usersServices.userLogin(formData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

const userLoginSlice = createSlice({
  name: "user",
  initialState: {
    user: [],
    isLoading: false,
    isError: false,
    errors: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(userLogin.pending, (state) => {
        state.isLoading = true;
        state.errors = null;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.errors = null;
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errors = action.payload;
      });
  },
});

export default userLoginSlice.reducer;
