import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "./interceptor";

const initialState = {
	getTrnxLoad: false,
	getTrnxError: null,
	userTrnxs: [],
	userTrnxsPagination: null,
	getAcctTrnxLoad: false,
	getAcctTrnxError: null,
	acctTrnxs: [],
	acctTrnxsPagination: null,
};

export const getUserTrnxs = createAsyncThunk(
	"trnx/getUserTrnxs",
	async (queryData, { rejectWithValue }) => {
		const { filterBy, filterValue, limit, sortBy, page } = queryData;
		try {
			const response = await api.get(
				`/transactions/?filterBy=${filterBy}&filterValue=${filterValue}&page=${page}&limit=${limit}&sortBy=${sortBy}`
			);
			// console.log(response.data);
			return response.data;
		} catch (error) {
			return rejectWithValue(
				error.response?.data || { message: error.message }
			);
		}
	}
);

export const getAcctTrnxs = createAsyncThunk(
	"trnx/getAcctTrnxs",
	async (queryData, { rejectWithValue }) => {
		const { filterBy, filterValue, limit, sortBy, page, accountNo } = queryData;

		try {
			const url = `/transactions/account/?filterBy=${filterBy}&filterValue=${filterValue}&page=${page}&limit=${limit}&sortBy=${sortBy}&accountNo=${accountNo}`;
			console.log("Request URL:", url);
			const response = await api.get(url);

			console.log(response.data);
			return response.data;
		} catch (error) {
			return rejectWithValue(
				error.response?.data || { message: error.message }
			);
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
				state.getTrnxError = null;
				state.userTrnxs = action.payload.data;
				state.userTrnxsPagination = action.payload.pagination;
			})
			.addCase(getUserTrnxs.rejected, (state, action) => {
				state.getTrnxLoad = false;
				state.userTrnxs = null;
				state.userTrnxsPagination = null;
				state.getTrnxError = action.error.payload || action.error.message;
			});
		builder
			.addCase(getAcctTrnxs.pending, (state) => {
				state.getAcctTrnxLoad = true;
			})
			.addCase(getAcctTrnxs.fulfilled, (state, action) => {
				state.getAcctTrnxLoad = false;
				state.getAcctTrnxError = null;
				state.acctTrnxs = action.payload.data;
				state.acctTrnxsPagination = action.payload.pagination;
			})
			.addCase(getAcctTrnxs.rejected, (state, action) => {
				state.getAcctTrnxLoad = false;
				state.getAcctTrnxError = action.error.payload || action.error.message;
				state.acctTrnxs = null;
				state.acctTrnxsPagination = null;
			});
	},
});

export const selectTransactionSlice = (state) => state.trnx;
export const selectUserTransations = (state) => state.trnx.userTrnxs;
export const selectAcctTransations = (state) => state.trnx.acctTrnxs;

export default transactionSlice.reducer;
