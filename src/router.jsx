import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/authentication/Login";
import Units from "./pages/units/Units"
import Dashboard from "./pages/dashboard/Dashboard";
import PersonalInformation from "./pages/people/PersonalInformation";

export const router = createBrowserRouter([
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
		path: "/personal-information",
		element: <PersonalInformation />
	}
]);
