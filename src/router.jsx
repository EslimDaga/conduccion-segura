import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/authentication/Login";
import Units from "./pages/units/Units"
import Layout from "./template/Layout";
import Drivers from "./pages/drivers/Drivers";
import Dashboard from "./pages/dashboard/Dashboard";
import InitialInspections from "./pages/initial-inspections/InitialInspections";
import SearchInspections from "./pages/reports/SearchInspections";

export const router = createBrowserRouter([
	{
		path: "/",
		element: <Login />,
	},
	{
		path: "/login",
		element: <Login />,
	},
	{
		element: <Layout />,
		children: [
			{
				path: "/dashboard",
				element: <Dashboard />
			},
			{
				path: "/units",
				element: <Units />
			},
			{
				path: "/drivers",
				element: <Drivers />
			},
			{
				path: "/initial-inspections",
				element: <InitialInspections />
			},
			{
				path: "/search-inspections",
				element: <SearchInspections />
			}
		]
	},
]);
