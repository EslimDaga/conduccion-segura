import { configureStore } from "@reduxjs/toolkit";
import AuthenticationReducer from "../features/authenticationSlice";
import logger from "redux-logger";
import thunk from "redux-thunk";

const store = configureStore({
	reducer: {
		authentication: AuthenticationReducer,
	},
	middleware: [thunk, logger],
});

export default store;
