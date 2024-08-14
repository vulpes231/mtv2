import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAccessToken, liveServer, sendError } from "../constants";
import axios from "axios";

const initialState = {
  logoutLoad: false,
  logoutError: false,
  loggedOut: false,
};

export const logoutUser = createAsyncThunk("logout/logoutUser", async () => {
  const url = `${liveServer}/logout`;
  const accessToken = getAccessToken();
  try {
    const response = await axios.get(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    console.log(response.data);
    return response.data;
  } catch (error) {
    sendError(error);
  }
});

const logoutSlice = createSlice({
  name: "logout",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(logoutUser.pending, (state) => {
        state.logoutLoad = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.logoutLoad = false;
        state.logoutError = false;
        state.loggedOut = true;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.logoutLoad = false;
        state.logoutError = action.error.message;
        state.loggedOut = false;
      });
  },
});

export default logoutSlice.reducer;
