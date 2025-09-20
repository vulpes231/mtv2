import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "./interceptor";

const initialState = {
	getUserAccountsLoading: false,
	getUserAccountsError: null,
	userAccounts: [],
	getAccountInfoLoading: false,
	getAccountInfoError: null,
	accountInfo: null,
	fetchExternalLoading: false,
	fetchExternalError: null,
	externalAccs: [],
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

export const getAccountInfo = createAsyncThunk(
	"account/getAccountInfo",
	async (accountId, { rejectWithValue }) => {
		try {
			const response = await api.get(`/account/${accountId}`);
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
				state.getUserAccountsLoading = true;
			})
			.addCase(getUserAccounts.fulfilled, (state, action) => {
				state.getUserAccountsLoading = false;
				state.getUserAccountsError = null;
				state.userAccounts = action.payload.data;
			})
			.addCase(getUserAccounts.rejected, (state, action) => {
				state.getUserAccountsLoading = false;
				state.getUserAccountsError =
					action.error.payload || action.error.message;
				state.userAccounts = [];
			});
		builder
			.addCase(getAccountInfo.pending, (state) => {
				state.getAccountInfoLoading = true;
			})
			.addCase(getAccountInfo.fulfilled, (state, action) => {
				state.getAccountInfoLoading = false;
				state.getAccountInfoError = null;
				state.accountInfo = action.payload.data;
			})
			.addCase(getAccountInfo.rejected, (state, action) => {
				state.getAccountInfoLoading = false;
				state.getAccountInfoError =
					action.error.payload || action.error.message;
				state.accountInfo = [];
			});

		builder
			.addCase(getExternalAccs.pending, (state) => {
				state.fetchExternalLoading = true;
			})
			.addCase(getExternalAccs.fulfilled, (state, action) => {
				state.fetchExternalLoading = false;
				state.fetchExternalError = null;
				state.externalAccs = action.payload.data;
			})
			.addCase(getExternalAccs.rejected, (state, action) => {
				state.fetchExternalLoading = false;
				state.fetchExternalError = action.error.payload || action.error.message;
				state.externalAccs = null;
			});
	},
});

export const selectAccountSlice = (state) => state.account;
export const selectUserAccounts = (state) => state.account.userAccounts;
export const selectExternalAccounts = (state) => state.account.externalAccs;
export const selectAccountInfo = (state) => state.account.accountInfo;

export default accountSlice.reducer;
