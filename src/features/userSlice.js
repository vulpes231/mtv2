import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "./interceptor";

const initialState = {
	getUserLoading: false,
	getUserError: null,
	user: null,
	changePassLoading: false,
	changePassError: null,
	passwordChanged: false,
};

export const getUser = createAsyncThunk(
	"user/getUser",
	async (_, { rejectWithValue }) => {
		try {
			const response = await api.get("/user");

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

export const changePassword = createAsyncThunk(
	"user/changePassword",
	async (formData, { rejectWithValue }) => {
		try {
			const response = await api.put("/change-password", { data: formData });
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

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		resetGetUser(state) {
			state.getUserError = null;
			state.getUserLoading = false;
			state.user = null;
		},
		resetChangePass(state) {
			state.changePassError = null;
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
				state.getUserError = null;
				state.user = action.payload;
			})
			.addCase(getUser.rejected, (state, action) => {
				state.getUserLoading = false;
				state.getUserError = action.error.message;
				state.user = null;
			});

		builder
			.addCase(changePassword.pending, (state) => {
				state.changePassLoading = true;
			})
			.addCase(changePassword.fulfilled, (state) => {
				state.changePassLoading = false;
				state.changePassError = null;
				state.passwordChanged = true;
			})
			.addCase(changePassword.rejected, (state, action) => {
				state.changePassLoading = false;
				state.changePassError = action.error.payload || action.error.message;
				state.passwordChanged = false;
			});
	},
});

export const selectUserSlice = (state) => state.user;
export const selectCurrentUser = (state) => state.user.user;

export const { resetGetUser, resetChangePass } = userSlice.actions;
export default userSlice.reducer;
