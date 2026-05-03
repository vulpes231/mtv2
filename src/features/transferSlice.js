import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "./interceptor";

const initialState = {
  transferLoad: false,
  transferError: null,
  transferSuccess: false,
};

export const transferFunds = createAsyncThunk(
  "transfer/transferFunds",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await api.post("/transfer", formData);
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

const transferSlice = createSlice({
  name: "transfer",
  initialState,
  reducers: {
    resetTransfer(state) {
      state.transferError = null;
      state.transferLoad = false;
      state.transferSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(transferFunds.pending, (state) => {
        state.transferLoad = true;
      })
      .addCase(transferFunds.fulfilled, (state) => {
        state.transferLoad = false;
        state.transferError = null;
        state.transferSuccess = true;
      })
      .addCase(transferFunds.rejected, (state, action) => {
        state.transferLoad = false;
        state.transferError = action.error.payload || action.error.message;
        state.transferSuccess = false;
      });
  },
});

export const selectTransferSlice = (state) => state.transfer;
export const { resetTransfer } = transferSlice.actions;

export default transferSlice.reducer;
