import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAccessToken } from "../constants";
import api from "./interceptor";

const initialState = {
	loginLoading: false,
	loginError: null,
	accessToken: getAccessToken() || null,
	user: false,
};

export const loginUser = createAsyncThunk(
	"login/loginUser",
	async (formData, { rejectWithValue }) => {
		try {
			const response = await api.post("/auth", formData);
			console.log(response.data);
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

const loginSlice = createSlice({
	name: "login",
	initialState,
	reducers: {
		resetLogin(state) {
			state.loginError = null;
			state.loginLoading = false;
			state.accessToken = null;
			state.user = null;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(loginUser.pending, (state) => {
				state.loginLoading = true;
			})
			.addCase(loginUser.fulfilled, (state, action) => {
				state.loginLoading = false;
				state.accessToken = action.payload.token;
				state.loginError = null;
				state.user = action.payload.data;

				sessionStorage.setItem("user", JSON.stringify(action.payload.data));
			})
			.addCase(loginUser.rejected, (state, action) => {
				state.loginLoading = false;
				state.loginError = action.error.payload || action.error.message;
				state.accessToken = null;
				state.user = null;
			});
	},
});

export const selectLoginSlice = (state) => state.login;

export const { resetLogin } = loginSlice.actions;
export default loginSlice.reducer;
