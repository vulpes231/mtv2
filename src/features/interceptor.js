import axios from "axios";
import { devServer, getAccessToken, liveServer } from "../constants";

const api = axios.create({
	baseURL: `${liveServer}`,
	headers: {
		"Content-Type": "application/json",
	},
});

api.interceptors.request.use(
	(config) => {
		const token = getAccessToken();
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		} else {
			delete config.headers.Authorization;
		}
		return config;
	},
	(error) => Promise.reject(error)
);

api.interceptors.response.use(
	(response) => response,
	(error) => {
		if (error.response && error.response.status === 401) {
			// Clear both storages for safety
			localStorage.removeItem("token");
			sessionStorage.clear();

			// Avoid infinite redirect loop
			if (window.location.pathname !== "/login") {
				window.location.href = "/login";
			}
		}

		return Promise.reject(error);
	}
);

export default api;
