import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { devServer, sendError } from "../constants";
import axios from "axios";

const initialState = {
  loginLoading: false,
  loginError: false,
  accessToken: false,
};

export const loginUser = createAsyncThunk(
  "login/loginUser",
  async (formData) => {
    const url = `${devServer}`;
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
        state.loginLoading = true;
        state.accessToken = action.payload.accessToken;
        state.loginError = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loginLoading = true;
        state.loginError = action.error.message;
        state.accessToken = false;
      });
  },
});

export default loginSlice.reducer;
