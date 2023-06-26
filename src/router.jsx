import { Navigate, createBrowserRouter } from "react-router-dom";
import Login from "./pages/authentication/Login";
import Units from "./pages/units/Units"
import Layout from "./template/Layout";
import Drivers from "./pages/drivers/Drivers";
import Dashboard from "./pages/dashboard/Dashboard";
import Maintenance from "./pages/maintenance/Maintenance";
import ProtectedRoute from "./components/ProtectedRoute";
import SearchInspections from "./pages/reports/SearchInspections";
import InitialInspections from "./pages/initial-inspections/InitialInspections";
import Routes from "./pages/routes/Routes";

const user = JSON.parse(localStorage.getItem("user"));

export const router = createBrowserRouter([
	{
		path: "/",
		element: user ? <Navigate to="/dashboard" /> : <Navigate to="/login" />,
	},
	{
		path: "/login",
		element: (
			<ProtectedRoute accessBy="non-authenticated">
				<Login />
			</ProtectedRoute>
		),
	},
	{
		element: <Layout />,
		children: [
			{
				path: "/dashboard",
				element: (
					<ProtectedRoute accessBy="authenticated">
						<Dashboard />
					</ProtectedRoute>
				),
			},
			{
				path: "/units",
				element: (
					<ProtectedRoute accessBy="authenticated">
						<Units />
					</ProtectedRoute>
				),
			},
			{
				path: "/drivers",
				element: (
					<ProtectedRoute accessBy="authenticated">
						<Drivers />,
					</ProtectedRoute>
				),
			},
			{
				path: "/initial-inspections",
				element: (
					<ProtectedRoute accessBy="authenticated">
						<InitialInspections />,
					</ProtectedRoute>
				),
			},
			{
				path: "/search-inspections",
				element: (
					<ProtectedRoute accessBy="authenticated">
						<SearchInspections />,
					</ProtectedRoute>
				),
			},
			{
				path: "/maintenance",
				element: (
					<ProtectedRoute accessBy="authenticated">
						<Maintenance />,
					</ProtectedRoute>
				),
			},
			{
				path: "/routes",
				element: (
					<ProtectedRoute accessBy="authenticated">
						<Routes />,
					</ProtectedRoute>
				),
			}
		],
	},
]);
