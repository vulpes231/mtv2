import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { devServer, getAccessToken, liveServer, sendError } from "../constants";
import axios from "axios";

const initialState = {
  getAccountLoading: false,
  getAccountError: false,
  userAccounts: [],
};

export const getUserAccounts = createAsyncThunk(
  "account/getUserAcccounts",
  async () => {
    const url = `${liveServer}/account`;
    const accessToken = getAccessToken();
    try {
      const response = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      // console.log(response.data);
      return response.data;
    } catch (error) {
      sendError(error);
    }
  }
);

const accountSlice = createSlice({
  name: "account",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getUserAccounts.pending, (state) => {
        state.getAccountLoading = true;
      })
      .addCase(getUserAccounts.fulfilled, (state, action) => {
        state.getAccountLoading = false;
        state.getAccountError = false;
        state.userAccounts = action.payload;
      })
      .addCase(getUserAccounts.rejected, (state, action) => {
        state.getAccountLoading = false;
        state.getAccountError = action.error.message;
        state.userAccounts = [];
      });
  },
});

export default accountSlice.reducer;
