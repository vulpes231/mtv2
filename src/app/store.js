import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "../features/loginSlice";

const store = configureStore({
  reducers: {
    login: loginReducer,
  },
});

export default store;
