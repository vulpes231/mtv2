import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "../features/loginSlice";
import enrollReducer from "../features/enrollSlice";

const store = configureStore({
  reducers: {
    login: loginReducer,
    enroll: enrollReducer,
  },
});

export default store;
