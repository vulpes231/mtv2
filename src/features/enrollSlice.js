import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { devServer, liveServer, sendError } from "../constants";
import axios from "axios";

const initialState = {
  createLoading: false,
  createError: false,
  userCreated: false,
};

export const createUser = createAsyncThunk(
  "enroll/createUser",
  async (formData) => {
    const url = `${liveServer}`;
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

const enrollSlice = createSlice({
  name: "enroll",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        state.createLoading = true;
      })
      .addCase(createUser.fulfilled, (state) => {
        state.createLoading = true;
        state.userCreated = true;
        state.createError = false;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.createLoading = true;
        state.createError = action.error.message;
        state.userCreated = false;
      });
  },
});

export default enrollSlice.reducer;
