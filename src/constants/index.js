const devServer = "";
const liveServer = "";

const sendError = (error) => {
  if (error.response) {
    const errMsg = error.response.message.data;
    throw new Error(errMsg);
  } else {
    throw error;
  }
};

const getAccessToken = () => {
  let accessToken;
  const tokenString = sessionStorage.getItem("accessToken");
  if (!tokenString) {
    throw new Error("Token string not found");
  } else {
    accessToken = JSON.parse(tokenString);
  }
  return accessToken;
};

export { devServer, liveServer, sendError, getAccessToken };
