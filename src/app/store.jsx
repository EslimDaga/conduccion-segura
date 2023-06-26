import thunk from "redux-thunk";
import logger from "redux-logger";
import UnitsReducer from "../features/unitSlice";
import DriverReducer from "../features/driverSlice";
import AuthenticationReducer from "../features/authenticationSlice";
import InitialInspectionReducer from "../features/initialInspectionSlice";
import MaintenanceReducer from "../features/maintenanceSlice"
import RouteReducer from "../features/routeSlice";
import SearchInspectionReducer from "../features/searchInspectionSlice";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
	reducer: {
		authentication: AuthenticationReducer,
		units: UnitsReducer,
		drivers: DriverReducer,
		initialInspections: InitialInspectionReducer,
		maintenances: MaintenanceReducer,
		routes: RouteReducer,
		searchInspections: SearchInspectionReducer,
	},
	middleware: [thunk, logger],
});

export default store;
