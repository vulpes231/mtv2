import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { devServer, getAccessToken, liveServer, sendError } from "../constants";
import axios from "axios";

const initialState = {
  getTrnxLoad: false,
  getTrnxError: false,
  userTrnxs: [],
  getAcctTrnxLoad: false,
  getAcctTrnxError: false,
  acctTrnxs: [],
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

export const getAcctTrnxs = createAsyncThunk(
  "trnx/getAcctTrnxs",
  async (acctNo) => {
    const url = `${devServer}/transactions/${acctNo}`;
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
    builder
      .addCase(getAcctTrnxs.pending, (state) => {
        state.getAcctTrnxLoad = true;
      })
      .addCase(getAcctTrnxs.fulfilled, (state, action) => {
        state.getAcctTrnxLoad = false;
        state.getAcctTrnxError = false;
        state.acctTrnxs = action.payload;
      })
      .addCase(getAcctTrnxs.rejected, (state, action) => {
        state.getAcctTrnxLoad = false;
        state.getAcctTrnxError = action.error.message;
        state.acctTrnxs = false;
      });
  },
});

export default transactionSlice.reducer;
