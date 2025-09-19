import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "./interceptor";

const initialState = {
	getAccountLoading: false,
	getAccountError: null,
	userAccounts: [],
	fetchExternalLoading: false,
	fetchExternalError: null,
	externalAccs: null,
};

export const getUserAccounts = createAsyncThunk(
	"account/getUserAcccounts",
	async (_, { rejectWithValue }) => {
		try {
			const response = await api.get("/account");
			// console.log(response.data);
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

export const getExternalAccs = createAsyncThunk(
	"external/getExternalAccs",
	async (_, { rejectWithValue }) => {
		try {
			const response = await api.get("/external");
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
				state.getAccountError = null;
				state.userAccounts = action.payload;
			})
			.addCase(getUserAccounts.rejected, (state, action) => {
				state.getAccountLoading = false;
				state.getAccountError = action.error.payload || action.error.message;
				state.userAccounts = [];
			});

		builder
			.addCase(getExternalAccs.pending, (state) => {
				state.fetchExternalLoading = true;
			})
			.addCase(getExternalAccs.fulfilled, (state, action) => {
				state.fetchExternalLoading = false;
				state.fetchExternalError = null;
				state.externalAccs = action.payload.externalAccs;
			})
			.addCase(getExternalAccs.rejected, (state, action) => {
				state.fetchExternalLoading = false;
				state.fetchExternalError = action.error.payload || action.error.message;
				state.externalAccs = null;
			});
	},
});

export default accountSlice.reducer;
