import {
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";

import usersServices from "../services/usersServices";

export const userRegister = createAsyncThunk(
  "userRegister",
  async (formData, thunkAPI) => {
    try {
      return await usersServices.userRegister(formData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

const userRegisterSlice = createSlice({
  name: "userRegister",
  initialState: {
    newUser: [],
    isLoading: false,
    isError: false,
    errors: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(userRegister.pending, (state) => {
        state.isLoading = true;
        state.errors = null;
      })
      .addCase(userRegister.fulfilled, (state, action) => {
        state.isLoading = false;
        state.newUser = action.payload;
        state.errors = null;
      })
      .addCase(userRegister.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errors = action.payload;
      });
  },
});

export default userRegisterSlice.reducer;
