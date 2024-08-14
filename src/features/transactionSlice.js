import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { devServer, getAccessToken, liveServer, sendError } from "../constants";
import axios from "axios";

const initialState = {
  getTrnxLoad: false,
  getTrnxError: false,
  userTrnxs: [],
};

export const getUserTrnxs = createAsyncThunk("trnx/getUserTrnxs", async () => {
  const url = `${liveServer}/transactions`;
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
});

const transactionSlice = createSlice({
  name: "trnx",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getUserTrnxs.pending, (state) => {
        state.getTrnxLoad = true;
      })
      .addCase(getUserTrnxs.fulfilled, (state, action) => {
        state.getTrnxLoad = false;
        state.getTrnxError = false;
        state.userTrnxs = action.payload;
      })
      .addCase(getUserTrnxs.rejected, (state, action) => {
        state.getTrnxLoad = false;
        state.getTrnxLoad = false;
        state.userTrnxs = false;
        state.getTrnxError = action.error.message;
      });
  },
});

export default transactionSlice.reducer;
