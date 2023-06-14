import thunk from "redux-thunk";
import logger from "redux-logger";
import UnitsReducer from "../features/unitSlice";
import DriverReducer from "../features/driverSlice";
import AuthenticationReducer from "../features/authenticationSlice";
import InitialInspectionReducer from "../features/initialInspectionSlice";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
	reducer: {
		authentication: AuthenticationReducer,
		units: UnitsReducer,
		drivers: DriverReducer,
		initialInspections: InitialInspectionReducer,
	},
	middleware: [thunk, logger],
});

export default store;
