import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { getAccessToken } from "../constants";
import { devServer, liveServer, sendError } from "../constants";

const initialState = {
  getUserLoading: false,
  getUserError: false,
  user: false,
  changePassLoading: false,
  changePassError: false,
  passwordChanged: false,
};

export const getUser = createAsyncThunk("user/getUser", async () => {
  const url = `${liveServer}/user`;
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

export const changePassword = createAsyncThunk(
  "user/changePassword",
  async (formData) => {
    const url = `${liveServer}/change-password`;
    const accessToken = getAccessToken();
    try {
      const response = await axios.put(url, formData, {
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

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetGetUser(state) {
      state.getUserError = false;
      state.getUserLoading = false;
      state.user = false;
    },
    resetChangePass(state) {
      state.changePassError = false;
      state.changePassLoading = false;
      state.passwordChanged = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {
        state.getUserLoading = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.getUserLoading = false;
        state.getUserError = false;
        state.user = action.payload;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.getUserLoading = false;
        state.getUserError = action.error.message;
        state.user = false;
      });

    builder
      .addCase(changePassword.pending, (state) => {
        state.changePassLoading = true;
      })
      .addCase(changePassword.fulfilled, (state) => {
        state.changePassLoading = false;
        state.changePassError = false;
        state.passwordChanged = true;
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.changePassLoading = false;
        state.changePassError = action.error.message;
        state.passwordChanged = false;
      });
  },
});

export const { resetGetUser, resetChangePass } = userSlice.actions;
export default userSlice.reducer;
