import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "./interceptor";

const initialState = {
	createLoading: false,
	createError: null,
	userCreated: false,
};

export const createUser = createAsyncThunk(
	"enroll/createUser",
	async (formData, { rejectWithValue }) => {
		try {
			const response = await api.post(``, formData);
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
				state.createError = null;
			})
			.addCase(createUser.rejected, (state, action) => {
				state.createLoading = true;
				state.createError = action.error.payload || action.error.message;
				state.userCreated = false;
			});
	},
});

export const selectEnrollSlice = (state) => state.enroll;
export default enrollSlice.reducer;
