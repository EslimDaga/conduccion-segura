import {
	BriefcaseIcon,
	DocumentIcon,
	TruckIcon,
	UserIcon,
} from "@heroicons/react/solid/";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { getDashboardData } from "../../features/dashboardSlice";

const Dashboard = () => {

	const dispatch = useDispatch();

	const {
		total_units,
		total_drivers,
		total_initial_inspections,
		total_maintenances,
	} = useSelector((state) => ({
		...state.dashboard,
	}));

	useEffect(() => {
		dispatch(getDashboardData());
	}, []);

	return (
		<>
			<main className="h-screen pt-20 z-0">
				<div className="pt-6 w-full leading-6">
					<div className="mx-auto px-4 sm:px-6 lg:px-8">
						<nav>
							<ul className="flex m-0 items-center p-0">
								<li className="text-left">
									<a
										title=""
										className="cursor-pointer text-gray-600 hover:text-gray-900"
									>
										<svg
											className="block h-5 w-5 align-middle"
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
											strokeWidth="2"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
											/>
										</svg>
									</a>
								</li>
								<li className="flex items-center text-left">
									<svg
										className="block h-5 w-5 align-middle text-gray-600"
										xmlns="http://www.w3.org/2000/svg"
										fill="currentColor"
										viewBox="0 0 20 20"
										aria-hidden="true"
									>
										<path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z"></path>
									</svg>
									<Link
										to="/dashboard"
										title=""
										className="cursor-pointer text-sm font-semibold leading-5 text-gray-600 hover:text-gray-900"
									>
										Dashboard
									</Link>
								</li>
							</ul>
						</nav>
						<div className="flex justify-between items-center">
							<p className="mt-5 text-lg font-semibold leading-7 text-solgas-primary">
								Dashboard
							</p>
						</div>
					</div>
				</div>
				<div className="p-6">
					<div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-5">
						<div
							className="flex flex-col p-4 w-full bg-gray-900 rounded-lg gap-y-3"
						>
							<div className="flex items-center gap-x-3">
								<div className="p-2 bg-gray-800 rounded-lg">
									<TruckIcon className="fill-current text-white w-5 h-5" />
								</div>
							</div>
							<div className="text-3xl font-semibold text-white">{total_units}</div>
							<div className="text-sm tracking-wide text-gray-200">Unidades</div>
						</div>
						<div
							className="flex flex-col p-4 w-full bg-gray-900 rounded-lg gap-y-3"
						>
							<div className="flex items-center gap-x-3">
								<div className="p-2 bg-gray-800 rounded-lg">
									<UserIcon className="fill-current text-white w-5 h-5" />
								</div>
							</div>
							<div className="text-3xl font-semibold text-white">{total_drivers}</div>
							<div className="text-sm tracking-wide text-gray-200">Conductores</div>
						</div>
						<div
							className="flex flex-col p-4 w-full bg-gray-900 rounded-lg gap-y-3"
						>
							<div className="flex items-center gap-x-3">
								<div className="p-2 bg-gray-800 rounded-lg">
									<DocumentIcon className="fill-current text-white w-5 h-5" />
								</div>
							</div>
							<div className="text-3xl font-semibold text-white">{total_initial_inspections}</div>
							<div className="text-sm tracking-wide text-gray-200">Inspecciones</div>
						</div>
						<div
							className="flex flex-col p-4 w-full bg-gray-900 rounded-lg gap-y-3"
						>
							<div className="flex items-center gap-x-3">
								<div className="p-2 bg-gray-800 rounded-lg">
									<BriefcaseIcon className="fill-current text-white w-5 h-5" />
								</div>
							</div>
							<div className="text-3xl font-semibold text-white">{total_maintenances}</div>
							<div className="text-sm tracking-wide text-gray-200">Mantenimientos</div>
						</div>
					</div>
					<div className="grid mt-5 grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-5">
						<div className="bg-gray-100 w-full p-6 rounded-lg">

						</div>
						<div className="bg-gray-100 w-full p-6 rounded-lg">

						</div>
					</div>
				</div>
			</main>
		</>
	);
}

export default Dashboard;