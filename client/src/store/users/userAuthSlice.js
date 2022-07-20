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

export const userProfile = createAsyncThunk(
  "userProfile",
  async (_, thunkAPI) => {
    try {
      return await usersServices.userProfile();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

const userAuthSlice = createSlice({
  name: "userAuth",
  initialState: {
    user: [],
    token: null,
    isLoading: false,
    isError: false,
    errors: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isLoading = false;
      state.isError = false;
      state.errors = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // login
      .addCase(userLogin.pending, (state) => {
        state.isLoading = true;
        state.errors = null;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.token = action.payload.token;
        state.errors = null;
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errors = action.payload;
      })
      // register
      .addCase(userRegister.pending, (state) => {
        state.isLoading = true;
        state.errors = null;
      })
      .addCase(userRegister.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.token = action.payload.token;
        state.errors = null;
      })
      .addCase(userRegister.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errors = action.payload;
      })
      // profile
      .addCase(userProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(userProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.token = action.payload.token;
      })
      .addCase(userProfile.rejected, (state, action) => {
        state.errors = action.payload.message;
        state.isError = true;
        state.isLoading = false;
      });
  },
});

export const checkIsAuth = (state) =>
  Boolean(state.userAuthReducer.token) ||
  Boolean(window.localStorage.getItem("token"));

export const { logout } = userAuthSlice.actions;

export default userAuthSlice.reducer;
