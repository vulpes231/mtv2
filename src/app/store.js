import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "../features/loginSlice";
import enrollReducer from "../features/enrollSlice";
import accountReducer from "../features/accountSlice";
import transactionReducer from "../features/transactionSlice";
import logoutReducer from "../features/logoutSlice";
import userReducer from "../features/userSlice";
import navReducer from "../features/navSlice";

const store = configureStore({
	reducer: {
		login: loginReducer,
		enroll: enrollReducer,
		account: accountReducer,
		trnx: transactionReducer,
		logout: logoutReducer,
		user: userReducer,
		nav: navReducer,
	},
});

export default store;
