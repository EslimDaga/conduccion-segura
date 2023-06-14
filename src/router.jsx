import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/authentication/Login";
import Units from "./pages/units/Units"
import Dashboard from "./pages/dashboard/Dashboard";
import Drivers from "./pages/drivers/Drivers";
import Layout from "./template/Layout";

export const router = createBrowserRouter([
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
			}
		]
	},
]);
