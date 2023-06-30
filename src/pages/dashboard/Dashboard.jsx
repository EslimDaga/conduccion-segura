import {
	ArrowDownIcon,
	ArrowUpIcon,
	BriefcaseIcon,
	DocumentIcon,
	PencilAltIcon,
	PlusCircleIcon,
	TrashIcon,
	TruckIcon,
	UserIcon,
	XCircleIcon,
} from "@heroicons/react/solid/";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { AgGridReact } from "ag-grid-react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useRef, useState } from "react";
import { createDriver, deleteDriver, getDriverById, getDrivers, updateDriver } from "../../features/driverSlice";
import * as Yup from "yup";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

const Dashboard = () => {

	const gridRef = useRef();
	const dispatch = useDispatch();

	const [showModal, setShowModal] = useState(false);
	const [showModalEdit, setShowModalEdit] = useState(false);

	const {
		drivers,
		driver,
		error,
		is_saving,
		loading_drivers,
		loading_driver,
	} = useSelector(state => ({
		...state.drivers,
	}));

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
					<div className="flex gap-6">
						<div
							className="flex flex-col p-4 w-1/3 bg-gray-900 rounded-lg gap-y-3"
						>
							<div className="flex items-center gap-x-3">
								<div className="p-2 bg-gray-800 rounded-lg">
									<TruckIcon className="fill-current text-white w-5 h-5" />
								</div>
							</div>
							<div className="text-3xl font-semibold text-white">675</div>
							<div className="text-sm tracking-wide text-gray-200">Unidades</div>
						</div>
						<div
							className="flex flex-col p-4 w-1/3 bg-gray-900 rounded-lg gap-y-3"
						>
							<div className="flex items-center gap-x-3">
								<div className="p-2 bg-gray-800 rounded-lg">
									<UserIcon className="fill-current text-white w-5 h-5" />
								</div>
							</div>
							<div className="text-3xl font-semibold text-white">423</div>
							<div className="text-sm tracking-wide text-gray-200">Conductores</div>
						</div>
						<div
							className="flex flex-col p-4 w-1/3 bg-gray-900 rounded-lg gap-y-3"
						>
							<div className="flex items-center gap-x-3">
								<div className="p-2 bg-gray-800 rounded-lg">
									<DocumentIcon className="fill-current text-white w-5 h-5" />
								</div>
							</div>
							<div className="text-3xl font-semibold text-white">412</div>
							<div className="text-sm tracking-wide text-gray-200">Inspecciones</div>
						</div>
						<div
							className="flex flex-col p-4 w-1/3 bg-gray-900 rounded-lg gap-y-3"
						>
							<div className="flex items-center gap-x-3">
								<div className="p-2 bg-gray-800 rounded-lg">
									<BriefcaseIcon className="fill-current text-white w-5 h-5" />
								</div>
							</div>
							<div className="text-3xl font-semibold text-white">675</div>
							<div className="text-sm tracking-wide text-gray-200">Mantenimientos</div>
						</div>
					</div>
				</div>
			</main>
		</>
	);
}

export default Dashboard;