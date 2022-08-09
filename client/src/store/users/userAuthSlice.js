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

export const updateProfile = createAsyncThunk(
  "updateProfile",
  async (data, thunkAPI) => {
    try {
      return await usersServices.updateProfile(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const saveAddress = createAsyncThunk(
  "saveAddress",
  async (address, thunkAPI) => {
    try {
      return await usersServices.saveAddress(address);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const addToFavorite = createAsyncThunk(
  "addToFavorite",
  async (favorite, thunkAPI) => {
    try {
      return await usersServices.addToFavorite(favorite);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const removeFromFavorites = createAsyncThunk(
  "removeFromFavorites",
  async (favorite, thunkAPI) => {
    try {
      return await usersServices.removeFromFavorites(
        favorite,
      );
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

const userAuthSlice = createSlice({
  name: "userAuth",
  initialState: {
    user: [],
    chosenAddress: [],
    favorites: [],
    token: null,
    isLoading: false,
    isError: false,
    errors: null,
    isChanged: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isLoading = false;
      state.isError = false;
      state.errors = null;
      state.favorites = [];
      localStorage.removeItem("token");
    },
    updateChosenAddress: (state, action) => {
      state.chosenAddress = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // login
      .addCase(userLogin.pending, (state) => {
        state.isLoading = true;
        state.errors = null;
        state.isError = false;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
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
        state.isError = false;
      })
      .addCase(userRegister.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.token = action.payload.token;
        state.errors = null;
        state.isError = false;
      })
      .addCase(userRegister.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errors = action.payload;
      })
      // profile
      .addCase(userProfile.pending, (state) => {
        state.isChanged = false;
        state.isLoading = true;
        state.isError = false;
        state.errors = null;
      })
      .addCase(userProfile.fulfilled, (state, action) => {
        state.isChanged = false;
        state.isLoading = false;
        state.isError = false;
        state.errors = null;
        state.user = action.payload;
        state.favorites = action.payload.favorites;
        state.token = action.payload.token;
      })
      .addCase(userProfile.rejected, (state, action) => {
        state.isChanged = false;
        state.errors = action.payload.message;
        state.isError = true;
        state.isLoading = false;
        state.user = null;
        state.token = null;
        localStorage.removeItem("token");
      })
      // update profile
      .addCase(updateProfile.pending, (state) => {
        state.isLoading = true;
        state.isChanged = false;
        state.isError = false;
        state.errors = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isChanged = true;
        state.isError = false;
        state.errors = null;
        state.user = action.payload;
        state.favorites = action.payload.favorites;
        state.token = action.payload?.token;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.errors = action.payload?.message;
        state.isChanged = null;
        state.isError = true;
        state.isLoading = false;
      })
      // save address
      .addCase(saveAddress.pending, (state) => {
        state.isLoading = true;
        state.isChanged = false;
        state.isError = false;
        state.errors = null;
      })
      .addCase(saveAddress.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isChanged = true;
        state.isError = false;
        state.user = action.payload;
        state.favorites = action.payload.favorites;
        state.token = action.payload?.token;
        state.errors = null;
      })
      .addCase(saveAddress.rejected, (state, action) => {
        state.errors = action.payload?.message;
        state.isChanged = null;
        state.isError = true;
        state.isLoading = false;
      })
      //add to favorites
      .addCase(addToFavorite.pending, (state) => {
        state.isLoading = true;
        state.isChanged = false;
        state.isError = false;
        state.errors = null;
      })
      .addCase(addToFavorite.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isChanged = true;
        state.isError = false;
        state.user = action.payload;
        state.favorites = action.payload.favorites;
        state.token = action.payload?.token;
        state.errors = null;
      })
      .addCase(addToFavorite.rejected, (state, action) => {
        state.errors = action.payload?.message;
        state.isChanged = null;
        state.isError = true;
        state.isLoading = false;
      })
      // remove from favorites
      .addCase(removeFromFavorites.pending, (state) => {
        state.isLoading = true;
        state.isChanged = false;
        state.isError = false;
        state.errors = null;
      })
      .addCase(
        removeFromFavorites.fulfilled,
        (state, action) => {
          state.isLoading = false;
          state.isChanged = true;
          state.isError = false;
          state.user = action.payload;
          state.favorites = action.payload.favorites;
          state.token = action.payload?.token;
          state.errors = null;
        },
      )
      .addCase(
        removeFromFavorites.rejected,
        (state, action) => {
          state.errors = action.payload?.message;
          state.isChanged = null;
          state.isError = true;
          state.isLoading = false;
        },
      );
  },
});

export const checkIsAuth = (state) =>
  Boolean(state.userAuthReducer.token) ||
  Boolean(window.localStorage.getItem("token"));

export const { logout, updateChosenAddress } =
  userAuthSlice.actions;

export default userAuthSlice.reducer;
