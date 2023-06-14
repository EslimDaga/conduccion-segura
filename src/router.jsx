import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/authentication/Login";
import Units from "./pages/units/Units"
import Dashboard from "./pages/dashboard/Dashboard";
import Drivers from "./pages/drivers/Drivers";

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
		path: "/dashboard",
		element: <Dashboard />,
	},
	{
		path: "/units",
		element: <Units />
	},
	{
		path: "/drivers",
		element: <Drivers />
	}
]);
