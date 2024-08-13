import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "../features/loginSlice";
import enrollReducer from "../features/enrollSlice";
import accountReducer from "../features/accountSlice";
import transactionReducer from "../features/transactionSlice";

const store = configureStore({
  reducer: {
    login: loginReducer,
    enroll: enrollReducer,
    account: accountReducer,
    trnx: transactionReducer,
  },
});

export default store;
