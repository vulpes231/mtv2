import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { devServer, liveServer, sendError } from "../constants";
import axios from "axios";

const initialState = {
  loginLoading: false,
  loginError: false,
  accessToken: false,
  user: false,
};

export const loginUser = createAsyncThunk(
  "login/loginUser",
  async (formData) => {
    const url = `${liveServer}/auth`;
    try {
      const response = await axios.post(url, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      sendError(error);
    }
  }
);

const loginSlice = createSlice({
  name: "login",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loginLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loginLoading = false;
        state.accessToken = action.payload.accessToken;
        state.loginError = false;
        state.user = action.payload.user;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loginLoading = false;
        state.loginError = action.error.message;
        state.accessToken = false;
        state.user = false;
      });
  },
});

export default loginSlice.reducer;
