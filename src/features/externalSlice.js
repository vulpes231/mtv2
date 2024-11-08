import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { devServer, getAccessToken, liveServer, sendError } from "../constants";
import axios from "axios";

const initialState = {
  fetchExternalLoading: false,
  fetchExternalError: false,
  externalAccs: false,
};

export const getExternalAccs = createAsyncThunk(
  "external/getExternalAccs",
  async () => {
    const url = `${liveServer}/external`;
    const accessToken = getAccessToken();
    try {
      const response = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return response.data;
    } catch (error) {
      sendError(error);
    }
  }
);

const externalSlice = createSlice({
  name: "external",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getExternalAccs.pending, (state) => {
        state.fetchExternalLoading = true;
      })
      .addCase(getExternalAccs.fulfilled, (state, action) => {
        state.fetchExternalLoading = false;
        state.fetchExternalError = false;
        state.externalAccs = action.payload.externalAccs;
      })
      .addCase(getExternalAccs.rejected, (state, action) => {
        state.fetchExternalLoading = false;
        state.fetchExternalError = action.error.message;
        state.externalAccs = false;
      });
  },
});

export default externalSlice.reducer;
