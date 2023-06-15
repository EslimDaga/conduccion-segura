import thunk from "redux-thunk";
import logger from "redux-logger";
import UnitsReducer from "../features/unitSlice";
import DriverReducer from "../features/driverSlice";
import AuthenticationReducer from "../features/authenticationSlice";
import InitialInspectionReducer from "../features/initialInspectionSlice";
import SearchInspectionReducer from "../features/searchInspectionSlice";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
	reducer: {
		authentication: AuthenticationReducer,
		units: UnitsReducer,
		drivers: DriverReducer,
		initialInspections: InitialInspectionReducer,
		searchInspections: SearchInspectionReducer,
	},
	middleware: [thunk, logger],
});

export default store;
