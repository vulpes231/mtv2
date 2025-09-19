import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "./interceptor";

const initialState = {
	logoutLoad: false,
	logoutError: null,
	loggedOut: false,
};

export const logoutUser = createAsyncThunk(
	"logout/logoutUser",
	async (_, { rejectWithValue }) => {
		try {
			const response = await api.get("/logout");
			return response.data;
		} catch (error) {
			return rejectWithValue(
				error.response?.data || {
					message: error.message,
				}
			);
		}
	}
);

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
				state.logoutError = null;
				state.loggedOut = true;
			})
			.addCase(logoutUser.rejected, (state, action) => {
				state.logoutLoad = false;
				state.logoutError = action.error.payload || action.error.message;
				state.loggedOut = false;
			});
	},
});

export const selectLogoutSlice = (state) => state.logout;

export default logoutSlice.reducer;
