const devServer = "http://localhost:4000";
const liveServer = "https://metro-m9ur.onrender.com";

const sendError = (error) => {
	if (error.response) {
		const errMsg = error.response.data.message;
		throw new Error(errMsg);
	} else {
		throw error;
	}
};

const getAccessToken = () => {
	return JSON.parse(sessionStorage.getItem("accessToken")) || null;
};

export { devServer, liveServer, sendError, getAccessToken };
