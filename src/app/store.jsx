import thunk from "redux-thunk";
import logger from "redux-logger";
import UnitsReducer from "../features/unitSlice";
import DriverReducer from "../features/driverSlice";
import AuthenticationReducer from "../features/authenticationSlice";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
	reducer: {
		authentication: AuthenticationReducer,
		units: UnitsReducer,
		drivers: DriverReducer
	},
	middleware: [thunk, logger],
});

export default store;
