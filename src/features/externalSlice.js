import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "./interceptor";

const initialState = {
  addExternalLoad: false,
  addExternalError: null,
  addExternalSuccess: false,
  fetchExternalLoading: false,
  fetchExternalError: null,
  externalAccs: [],
};

export const addExternalAccount = createAsyncThunk(
  "external/addExternalAccount",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await api.post("/external", formData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || {
          message: error.message,
        },
      );
    }
  },
);

export const getExternalAccs = createAsyncThunk(
  "external/getExternalAccs",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/external");
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || {
          message: error.message,
        },
      );
    }
  },
);

const externalSlice = createSlice({
  name: "external",
  initialState,
  reducers: {
    resetAddExternal(state) {
      state.addExternalError = null;
      state.addExternalLoad = false;
      state.addExternalSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addExternalAccount.pending, (state) => {
        state.addExternalLoad = true;
      })
      .addCase(addExternalAccount.fulfilled, (state) => {
        state.addExternalLoad = false;
        state.addExternalError = null;
        state.addExternalSuccess = true;
      })
      .addCase(addExternalAccount.rejected, (state, action) => {
        state.addExternalLoad = false;
        state.addExternalError = action.error.payload || action.error.message;
        state.addExternalSuccess = false;
      });
    builder
      .addCase(getExternalAccs.pending, (state) => {
        state.fetchExternalLoading = true;
      })
      .addCase(getExternalAccs.fulfilled, (state, action) => {
        state.fetchExternalLoading = false;
        state.fetchExternalError = null;
        state.externalAccs = action.payload.data;
      })
      .addCase(getExternalAccs.rejected, (state, action) => {
        state.fetchExternalLoading = false;
        state.fetchExternalError = action.error.payload || action.error.message;
        state.externalAccs = null;
      });
  },
});

export const selectExternalSlice = (state) => state.external;
export const { resetAddExternal } = externalSlice.actions;
export const selectExternalAccounts = (state) => state.external.externalAccs;

export default externalSlice.reducer;
