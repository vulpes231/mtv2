import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "./interceptor";

const initialState = {
	getTrnxLoad: false,
	getTrnxError: null,
	userTrnxs: [],
	getAcctTrnxLoad: false,
	getAcctTrnxError: null,
	acctTrnxs: [],
};

export const getUserTrnxs = createAsyncThunk(
	"trnx/getUserTrnxs",
	async (_, { rejectWithValue }) => {
		try {
			const response = await api.get("/transactions");
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

export const getAcctTrnxs = createAsyncThunk(
	"trnx/getAcctTrnxs",
	async (queryData, { rejectWithValue }) => {
		const { acctNo, page, limit, sortBy } = queryData;
		try {
			const response = await api.get(
				`/transactions/?filterBy=${acctNo}&page=${page}&limit=${limit}&sortBy=${sortBy}`
			);
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
				state.userTrnxs = action.payload;
			})
			.addCase(getUserTrnxs.rejected, (state, action) => {
				state.getTrnxLoad = false;
				state.userTrnxs = null;
				state.getTrnxError = action.error.payload || action.error.message;
			});
		builder
			.addCase(getAcctTrnxs.pending, (state) => {
				state.getAcctTrnxLoad = true;
			})
			.addCase(getAcctTrnxs.fulfilled, (state, action) => {
				state.getAcctTrnxLoad = false;
				state.getAcctTrnxError = null;
				state.acctTrnxs = action.payload;
			})
			.addCase(getAcctTrnxs.rejected, (state, action) => {
				state.getAcctTrnxLoad = false;
				state.getAcctTrnxError = action.error.payload || action.error.message;
				state.acctTrnxs = null;
			});
	},
});

export const selectTransactionSlice = (state) => state.trnx;
export const selectUserTransations = (state) => state.trnx.userTrnxs;
export const selectAcctTransations = (state) => state.trnx.acctTrnxs;

export default transactionSlice.reducer;
