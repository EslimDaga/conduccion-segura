import {
  ChartBarIcon,
  LogoutIcon,
  MenuIcon,
  PlusCircleIcon,
  UserCircleIcon,
  UserIcon,
  XCircleIcon,
  XIcon,
} from "@heroicons/react/solid/";
import { Link } from "react-router-dom";
import { Fragment, useEffect, useMemo, useRef, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { getUnitsService } from "../../services/unitsService";
import { AG_GRID_LOCALE_ES } from "../../i18n/agGridLocale.es"
import { Popover, Transition } from "@headlessui/react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

const solutions = [
  {
    name: "Analytics",
    description:
      "Get a better understanding of where your traffic is coming from.",
    href: "#",
    icon: ChartBarIcon,
  },
];

const Units = () => {

  const gridRef = useRef();
  const [showModal, setShowModal] = useState(false);
  const [rowData, setRowData] = useState([]);

  const [columnDefs, setColumnDefs] = useState([
    { field: "name", filter: true, headerName: "Nombre", cellStyle: { textAlign: "center" } },
    { field: "description", filter: true, headerName: "Descripción", cellStyle: { textAlign: "center" } },
    { field: "last_odometer", filter: true, headerName: "Odómetro", cellStyle: { textAlign: "center" } }
  ]);

  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      minWidth: 150,
      filter: true,
    }
  });

  const localeText = useMemo(() => {
    return AG_GRID_LOCALE_ES;
  }, []);

  const showAddUnitModal = () => {
    setShowModal(true);
  }

  const closeAddUnitModal = () => {
    setShowModal(false);
  }

  useEffect(() => {
    getUnitsService().then((response) => {
      setRowData(response);
    });
  }, []);

  return (
    <>
      {showModal && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 py-5 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl overflow-auto max-w-3xl w-full max-h-full">
            <div className="z-50 rounded-t-xl bg-white-primary flex items-start justify-between px-6 py-5 max-w-3xl w-full border-b-2 border-white-secondary dark:border-dark-secondary">
              <h3 className="text-gray-900 dark:text-gray-100 font-medium self-center">
                Crear Unidad
              </h3>
              <button
                onClick={closeAddUnitModal}
                className={
                  "p-1 ml-auto bg-transparent border-0 text-gray-900 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                }

              >
                <span
                  className={
                    "bg-transparent text-gray-500 hover:text-gray-900 dark:text-gray-300 hover:dark:text-gray-100 h-6 w-6 text-xl outline-none focus:outline-none"
                  }
                >
                  <XCircleIcon className="w-6 h-6" />
                </span>
              </button>
            </div>
            <div className="p-6">
              <form>
                <div className="space-y-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-gray-700 dark:text-white font-medium mb-2"
                    >
                      Placa de la unidad {" "}
                      <span className="text-md font-normal text-red-500">
                        *
                      </span>
                    </label>
                    <input
                      className="w-full font-semibold px-4 py-4 rounded-xl transition duration-150 ease-out bg-gray-100"
                      type="text"
                      name="name"
                      id="name"
                      autoComplete="off"
                    />

                  </div>
                  <button
                    className="bg-solgas-primary text-white active:bg-solgas-secondary text-base font-semibold px-4 py-4 rounded-xl hover:shadow-lg outline-none focus:outline-none w-full"
                    style={{ transition: "all .15s ease" }}
                    type="submit"
                  >
                    Crear unidad
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      <section className="flex flex-col h-screen">
        <Popover className="flex-1 fixed w-full shadow-lg">
          <div className="mx-auto px-6">
            <div className="flex items-center justify-between border-gray-100 py-6 lg:py-5">
              <div className="flex justify-start lg:w-0 lg:flex-1">
                <a href="#">
                  <span className="sr-only">Solgas Logo</span>
                  <img
                    className="h-8 w-auto sm:h-10"
                    src="/images/logo-solgas.png"
                    alt="logo-solgas-in-header"
                  />
                </a>
              </div>
              <div className="flex md:hidden">
                <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-inset">
                  <span className="sr-only">Open menu</span>
                  <MenuIcon className="h-8 w-8" aria-hidden="true" />
                </Popover.Button>
              </div>
              <div className="hidden items-center justify-end md:flex md:flex-1 lg:w-0">
                <Popover.Group as="nav" className="hidden md:flex gap-5">
                  <Link
                    to="/units"
                    className="text-base font-medium text-gray-600 hover:text-gray-900"
                  >
                    Unidades
                  </Link>
                  <Link
                    to="/personal-information"
                    className="text-base font-medium text-gray-600 hover:text-gray-900"
                  >
                    Datos Personales
                  </Link>
                </Popover.Group>
                <a
                  href="#"
                  className="ml-8 inline-flex items-center justify-center whitespace-nowrap border-transparent text-base font-medium text-black"
                >
                  <Popover className="flex">
                    <Popover.Button className="inline-flex items-center justify-center rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-inse mt-0 pt-0">
                      <span className="sr-only">Open menu</span>
                      <UserCircleIcon
                        className="h-10 w-10"
                        aria-hidden="true"
                      />
                    </Popover.Button>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-200"
                      enterFrom="opacity-0 translate-y-1"
                      enterTo="opacity-100 translate-y-0"
                      leave="transition ease-in duration-150"
                      leaveFrom="opacity-100 translate-y-0"
                      leaveTo="opacity-0 translate-y-1"
                    >
                      <Popover.Panel
                        focus
                        className="absolute z-10 right-4 top-16 w-56 origin-top-right bg-gray-50 divide-y divide-gray-100 rounded-xl shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                      >
                        <div className="px-4 py-3 hover:bg-gray-200 rounded-tl-xl rounded-tr-xl">
                          <p className="flex gap-2 items-center text-base font-medium text-gray-700">
                            <UserIcon className="w-6 h-6" /> Mi cuenta
                          </p>
                          <p className="text-sm text-gray-700 truncate"></p>
                        </div>
                        <div
                          onClick={() => {
                            localStorage.removeItem("user");
                            window.location.href = "/login";
                          }}
                          className="px-4 py-3 hover:bg-gray-200 rounded-bl-xl rounded-br-xl"
                        >
                          <p className="flex gap-2 items-center text-base font-medium text-gray-700">
                            <LogoutIcon className="w-6 h-6" /> Cerrar sesión
                          </p>
                          <p className="text-sm text-gray-700 truncate"></p>
                        </div>
                      </Popover.Panel>
                    </Transition>
                  </Popover>
                </a>
              </div>
            </div>
          </div>

          <Transition
            as={Fragment}
            enter="duration-200 ease-out"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="duration-100 ease-in"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Popover.Panel
              focus
              className="absolute inset-x-0 top-0 origin-top-right transform p-2 transition md:hidden"
            >
              <div className="divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                <div className="px-5 pt-5 pb-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <img
                        className="h-8 w-auto"
                        src="/images/logo-solgas.png"
                        alt="logo-solgas-in-header"
                      />
                    </div>
                    <div className="-mr-2">
                      <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-inset">
                        <span className="sr-only">Close menu</span>
                        <XIcon className="h-6 w-6" aria-hidden="true" />
                      </Popover.Button>
                    </div>
                  </div>
                  <div className="mt-6">
                    <nav className="grid gap-y-8">
                      {solutions.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          className="-m-3 flex items-center rounded-md p-3 hover:bg-gray-50"
                        >
                          <item.icon
                            className="h-6 w-6 flex-shrink-0 text-indigo-600"
                            aria-hidden="true"
                          />
                          <span className="ml-3 text-base font-medium text-gray-900">
                            {item.name}
                          </span>
                        </a>
                      ))}
                    </nav>
                  </div>
                </div>
                <div className="space-y-6 pb-6 px-5">
                  <div>
                    <a
                      href="#"
                      className="flex w-full items-center justify-center rounded-md border border-transparent bg-solgas-primary px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                    >
                      Cerrar sesión
                    </a>
                  </div>
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </Popover>
        <main className="h-screen pt-20">
          <div className="pt-6 w-full leading-6">
            <div className="mx-auto px-4 sm:px-6 lg:px-8">
              <nav>
                <ul className="flex m-0 items-center p-0">
                  <li className="text-left">
                    <a
                      title=""
                      className="cursor-pointer text-gray-400 hover:text-gray-900"
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
                      className="block h-5 w-5 align-middle text-gray-400"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      aria-hidden="true"
                    >
                      <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z"></path>
                    </svg>
                    <Link
                      to="/units"
                      title=""
                      className="cursor-pointer text-sm font-semibold leading-5 text-gray-400 hover:text-gray-900"
                    >
                      Unidades
                    </Link>
                  </li>
                </ul>
              </nav>
              <div className="flex justify-between items-center">
                <p className="mt-5 text-lg font-semibold leading-7 text-solgas-primary">
                  Unidades
                </p>
                <button
                  onClick={showAddUnitModal}
                  className="focus:ring outline-none rounded-lg text-white bg-solgas-primary px-8 py-2 font-semibold active:scale-95 hover:opacity-90 flex gap-2 items-center"
                >
                  Agregar Unidad <PlusCircleIcon className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>
          <div className="p-6">
            <div
              className="ag-theme-alpine w-full h-screen rounded-xl"
              style={{
                boxShadow: "0px 20px 68px 21px rgba(0,0,0,0.1)",
                height: "calc(100vh - 220px)",
              }}
            >
              <AgGridReact
                ref={gridRef}
                rowData={rowData}
                columnDefs={columnDefs}
                pagination={true}
                localeText={localeText}
                defaultColDef={defaultColDef}
                overlayLoadingTemplate={
                  '<span className="ag-overlay-loading-center">Espere mientras se cargan sus filas</span>'
                }
                enableCellTextSelection={true}
                rowSelection="single"
              ></AgGridReact>
            </div>
          </div>
        </main>
      </section>
    </>
  );
}

export default Units