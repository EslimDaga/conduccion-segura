import thunk from "redux-thunk";
import logger from "redux-logger";
import AuthenticationReducer from "../features/authenticationSlice";
import UnitsReducer from "../features/unitSlice"
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
	reducer: {
		authentication: AuthenticationReducer,
		units: UnitsReducer
	},
	middleware: [thunk, logger],
});

export default store;
