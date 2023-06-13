import {
  ChartBarIcon,
  LogoutIcon,
  MenuIcon,
  PencilAltIcon,
  PlusCircleIcon,
  TrashIcon,
  UserCircleIcon,
  UserIcon,
  XCircleIcon,
  XIcon,
} from "@heroicons/react/solid/";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { AgGridReact } from "ag-grid-react";
import { Popover, Transition } from "@headlessui/react";
import { Fragment, useCallback, useEffect, useMemo, useRef, useState } from "react";
import * as Yup from "yup";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { useDispatch, useSelector } from "react-redux";
import { createDriver, deleteDriver, getDriverById, getDrivers, updateDriver } from "../../features/driverSlice";

const solutions = [
  {
    name: "Analytics",
    description:
      "Get a better understanding of where your traffic is coming from.",
    href: "#",
    icon: ChartBarIcon,
  },
];

const People = () => {

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

  const columnDefs = useMemo(() => {
    return [
      {
        field: "firstname",
        filter: true,
        headerName: "Nombre",
        cellStyle: { textAlign: "center" },
      },
      {
        field: "lastname",
        filter: true,
        headerName: "Apellido",
        cellStyle: { textAlign: "center" },
      },
      {
        field: "driver_license_expiration_date",
        filter: true,
        headerName: "Expiración de la licencia",
        cellStyle: { textAlign: "center" },
      },
      {
        field: "modified",
        filter: true,
        headerName: "Modificado",
        cellStyle: { textAlign: "center" },
      },
      {
        field: "created",
        filter: true,
        headerName: "Creado",
        cellStyle: { textAlign: "center" },
      },
      {
        field: "id",
        filter: false,
        headerName: "Acciones",
        cellStyle: { textAlign: "center" },
        cellRendererParams: (params) => {
          id: params.value;
        },
        cellRenderer: ({ value }) => {
          return (
            <div className="flex gap-2 justify-center items-center">
              <button
                onClick={() => {
                  showEditPersonalInformationModal(value);
                }}
                className="bg-solgas-primary hover:bg-solgas-secondary text-white font-bold py-2 px-4 rounded-lg"
              >
                <PencilAltIcon className="h-6 w-6" />
              </button>
              <button
                className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 rounded-lg"
                onClick={() => {
                  dispatch(deleteDriver(value));
                }}
              >
                <TrashIcon className="h-6 w-6" />
              </button>
            </div>
          );
        }
      }
    ];
  })

  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      minWidth: 150,
      filter: true,
    };
  });

  const showAddPersonalInformationModal = () => {
    setShowModal(true);
  }

  const showEditPersonalInformationModal = (id) => {
    setShowModalEdit(true);
    dispatch(getDriverById(id));
  }

  const closeAddPersonalInformationModal = () => {
    setShowModal(false);
  }

  const closeEditPersonalInformationModal = () => {
    setShowModalEdit(false);
  }

  const formikCreateDriver = useFormik({
    initialValues: {
      id_number: "",
      firstname: "",
      lastname: "",
      driver_license_expiration_date: "",
    },
    validationSchema: Yup.object({
      id_number: Yup.string().required("El número de identificación es requerido")
        .matches(/^[0-9]+$/, "El número de identificación solo puede contener números"),
      firstname: Yup.string().required("El nombre es requerido"),
      lastname: Yup.string().required("El apellido es requerido"),
      driver_license_expiration_date: Yup.string().required("La fecha de expiración de la licencia es requerida"),
    }),
    onSubmit: values => {
      dispatch(createDriver(values));
    }
  });

  const formikUpdateDriver = useFormik({
    initialValues: {
      id: "",
      id_number: "",
      firstname: "",
      lastname: "",
      driver_license_expiration_date: "",
    },
    validationSchema: Yup.object({
      id_number: Yup.string().required("El número de identificación es requerido"),
      firstname: Yup.string().required("El nombre es requerido"),
      lastname: Yup.string().required("El apellido es requerido"),
      driver_license_expiration_date: Yup.string().required("La fecha de expiración de la licencia es requerida"),
    }),
    onSubmit: values => {
      dispatch(updateDriver(values))
    }
  });

  useEffect(() => {
    dispatch(getDrivers());
  }, []);

  useEffect(() => {
    formikUpdateDriver.setValues({
      id: driver?.id || "",
      id_number: driver?.id_number || "",
      firstname: driver?.firstname || "",
      lastname: driver?.lastname || "",
      driver_license_expiration_date: driver?.driver_license_expiration_date || "",
    })
  }, [driver]);

  useEffect(() => {
    if (!is_saving) {
      closeAddPersonalInformationModal();
      closeEditPersonalInformationModal();
    }
  }, [drivers]);

  return (
    <>
      {showModal && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 py-5 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl overflow-auto max-w-3xl w-full max-h-full">
            <div className="z-50 rounded-t-xl bg-white-primary flex items-start justify-between px-6 py-5 max-w-3xl w-full border-b-2 border-white-secondary dark:border-dark-secondary">
              <h3 className="text-gray-900 dark:text-gray-100 font-medium self-center">
                Crear Conductor
              </h3>
              <button
                onClick={closeAddPersonalInformationModal}
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
              <form onSubmit={formikCreateDriver.handleSubmit}>
                <div className="space-y-6">
                  <div>
                    <label
                      htmlFor="id_number"
                      className="block text-gray-700 dark:text-white font-medium mb-2"
                    >
                      Id{" "}
                      <span className="text-md font-normal text-red-500">
                        *
                      </span>
                    </label>
                    <input
                      className={
                        "w-full font-normal px-4 py-4 bg-gray-100 rounded-xl transition duration-150 ease-out " +
                        ((formikCreateDriver.touched.id_number &&
                          formikCreateDriver.errors.id_number) ||
                          error?.errors?.id_number
                          ? " border-2 border-red-500"
                          : is_saving
                            ? "opacity-50 cursor-not-allowed"
                            : " border-2 border-white hover:border-gray-900 focus:border-gray-900")
                      }
                      type="text"
                      name="id_number"
                      id="id_number"
                      autoComplete="off"
                      onChange={(e) => {
                        formikCreateDriver.handleChange(e);
                        if (error?.errors?.id_number) {
                          dispatch(resetErrors());
                        }
                      }}
                      disabled={is_saving}
                    />
                    {(formikCreateDriver.touched.id_number &&
                      formikCreateDriver.errors.id_number) ||
                      error?.errors?.id_number ? (
                      <span className="text-sm font-medium text-red-500">
                        {formikCreateDriver.errors.id_number ||
                          error?.errors?.id_number[0]}
                      </span>
                    ) : null}
                  </div>
                  <div>
                    <label
                      htmlFor="firstname"
                      className="block text-gray-700 dark:text-white font-medium mb-2"
                    >
                      Nombres{" "}
                      <span className="text-md font-normal text-red-500">
                        *
                      </span>
                    </label>
                    <input
                      className={
                        "w-full font-normal px-4 py-4 bg-gray-100 rounded-xl transition duration-150 ease-out " +
                        ((formikCreateDriver.touched.firstname &&
                          formikCreateDriver.errors.firstname) ||
                          error?.errors?.name
                          ? " border-2 border-red-500"
                          : is_saving
                            ? "opacity-50 cursor-not-allowed"
                            : " border-2 border-white hover:border-gray-900 focus:border-gray-900")
                      }
                      type="text"
                      name="firstname"
                      id="firstname"
                      autoComplete="off"
                      onChange={(e) => {
                        formikCreateDriver.handleChange(e);
                        if (error?.errors?.firstname) {
                          dispatch(resetErrors());
                        }
                      }}
                      disabled={is_saving}
                    />
                    {(formikCreateDriver.touched.firstname &&
                      formikCreateDriver.errors.firstname) ||
                      error?.errors?.firstname ? (
                      <span className="text-sm font-medium text-red-500">
                        {formikCreateDriver.errors.firstname ||
                          error?.errors?.firstname[0]}
                      </span>
                    ) : null}
                  </div>
                  <div>
                    <label
                      htmlFor="lastname"
                      className="block text-gray-700 dark:text-white font-medium mb-2"
                    >
                      Apellidos{" "}
                      <span className="text-md font-normal text-red-500">
                        *
                      </span>
                    </label>
                    <input
                      className={
                        "w-full font-normal px-4 py-4 bg-gray-100 rounded-xl transition duration-150 ease-out " +
                        ((formikCreateDriver.touched.lastname &&
                          formikCreateDriver.errors.lastname) ||
                          error?.errors?.name
                          ? " border-2 border-red-500"
                          : is_saving
                            ? "opacity-50 cursor-not-allowed"
                            : " border-2 border-white hover:border-gray-900 focus:border-gray-900")
                      }
                      type="text"
                      name="lastname"
                      id="lastname"
                      autoComplete="off"
                      onChange={(e) => {
                        formikCreateDriver.handleChange(e);
                        if (error?.errors?.lastname) {
                          dispatch(resetErrors());
                        }
                      }}
                      disabled={is_saving}
                    />
                    {(formikCreateDriver.touched.lastname &&
                      formikCreateDriver.errors.lastname) ||
                      error?.errors?.lastname ? (
                      <span className="text-sm font-medium text-red-500">
                        {formikCreateDriver.errors.lastname ||
                          error?.errors?.lastname[0]}
                      </span>
                    ) : null}
                  </div>
                  <div>
                    <label
                      htmlFor="driver_license_expiration_date"
                      className="block text-gray-700 dark:text-white font-medium mb-2"
                    >
                      Fecha de expiración(Licencia de Conducir){" "}
                      <span className="text-md font-normal text-red-500">
                        *
                      </span>
                    </label>
                    <input
                      className={
                        "w-full font-normal px-4 py-4 bg-gray-100 rounded-xl transition duration-150 ease-out " +
                        ((formikCreateDriver.touched
                          .driver_license_expiration_date &&
                          formikCreateDriver.errors
                            .driver_license_expiration_date) ||
                          error?.errors?.name
                          ? " border-2 border-red-500"
                          : is_saving
                            ? "opacity-50 cursor-not-allowed"
                            : " border-2 border-white hover:border-gray-900 focus:border-gray-900")
                      }
                      type="date"
                      name="driver_license_expiration_date"
                      id="driver_license_expiration_date"
                      autoComplete="off"
                      onChange={(e) => {
                        formikCreateDriver.handleChange(e);
                        if (error?.errors?.driver_license_expiration_date) {
                          dispatch(resetErrors());
                        }
                      }}
                      disabled={is_saving}
                    />
                    {(formikCreateDriver.touched
                      .driver_license_expiration_date &&
                      formikCreateDriver.errors
                        .driver_license_expiration_date) ||
                      error?.errors?.driver_license_expiration_date ? (
                      <span className="text-sm font-medium text-red-500">
                        {formikCreateDriver.errors
                          .driver_license_expiration_date ||
                          error?.errors?.driver_license_expiration_date[0]}
                      </span>
                    ) : null}
                  </div>
                  <button
                    className="bg-solgas-primary text-white active:bg-solgas-secondary text-base font-semibold px-4 py-4 rounded-xl hover:shadow-lg outline-none focus:outline-none w-full"
                    style={{ transition: "all .15s ease" }}
                    type="submit"
                  >
                    Crear Conductor
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      {showModalEdit && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 py-5 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl overflow-auto max-w-3xl w-full max-h-full">
            <div className="z-50 rounded-t-xl bg-white-primary flex items-start justify-between px-6 py-5 max-w-3xl w-full border-b-2 border-white-secondary dark:border-dark-secondary">
              <h3 className="text-gray-900 dark:text-gray-100 font-medium self-center">
                Actualizar Conductor
              </h3>
              <button
                onClick={closeEditPersonalInformationModal}
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
              <form onSubmit={formikUpdateDriver.handleSubmit}>
                <div className="space-y-6">
                  <div>
                    <label
                      htmlFor="id_number"
                      className="block text-gray-700 dark:text-white font-medium mb-2"
                    >
                      Id{" "}
                      <span className="text-md font-normal text-red-500">
                        *
                      </span>
                    </label>
                    <input
                      className={
                        "w-full font-normal px-4 py-4 bg-gray-100 rounded-xl transition duration-150 ease-out " +
                        ((formikUpdateDriver.touched.id_number &&
                          formikUpdateDriver.errors.id_number) ||
                          error?.errors?.id_number
                          ? " border-2 border-red-500"
                          : is_saving
                            ? "opacity-50 cursor-not-allowed"
                            : " border-2 border-white hover:border-gray-900 focus:border-gray-900")
                      }
                      type="text"
                      name="id_number"
                      id="id_number"
                      autoComplete="off"
                      onChange={(e) => {
                        formikUpdateDriver.handleChange(e);
                        if (error?.errors?.id_number) {
                          dispatch(resetErrors());
                        }
                      }}
                      disabled={is_saving}
                      value={formikUpdateDriver.values.id_number}
                    />
                    {(formikUpdateDriver.touched.id_number &&
                      formikUpdateDriver.errors.id_number) ||
                      error?.errors?.id_number ? (
                      <span className="text-sm font-medium text-red-500">
                        {formikUpdateDriver.errors.id_number ||
                          error?.errors?.id_number[0]}
                      </span>
                    ) : null}
                  </div>
                  <div>
                    <label
                      htmlFor="firstname"
                      className="block text-gray-700 dark:text-white font-medium mb-2"
                    >
                      Nombres{" "}
                      <span className="text-md font-normal text-red-500">
                        *
                      </span>
                    </label>
                    <input
                      className={
                        "w-full font-normal px-4 py-4 bg-gray-100 rounded-xl transition duration-150 ease-out " +
                        ((formikUpdateDriver.touched.firstname &&
                          formikUpdateDriver.errors.firstname) ||
                          error?.errors?.name
                          ? " border-2 border-red-500"
                          : is_saving
                            ? "opacity-50 cursor-not-allowed"
                            : " border-2 border-white hover:border-gray-900 focus:border-gray-900")
                      }
                      type="text"
                      name="firstname"
                      id="firstname"
                      autoComplete="off"
                      onChange={(e) => {
                        formikUpdateDriver.handleChange(e);
                        if (error?.errors?.firstname) {
                          dispatch(resetErrors());
                        }
                      }}
                      disabled={is_saving}
                      value={formikUpdateDriver.values.firstname}
                    />
                    {(formikUpdateDriver.touched.firstname &&
                      formikUpdateDriver.errors.firstname) ||
                      error?.errors?.firstname ? (
                      <span className="text-sm font-medium text-red-500">
                        {formikUpdateDriver.errors.firstname ||
                          error?.errors?.firstname[0]}
                      </span>
                    ) : null}
                  </div>
                  <div>
                    <label
                      htmlFor="lastname"
                      className="block text-gray-700 dark:text-white font-medium mb-2"
                    >
                      Apellidos{" "}
                      <span className="text-md font-normal text-red-500">
                        *
                      </span>
                    </label>
                    <input
                      className={
                        "w-full font-normal px-4 py-4 bg-gray-100 rounded-xl transition duration-150 ease-out " +
                        ((formikUpdateDriver.touched.lastname &&
                          formikUpdateDriver.errors.lastname) ||
                          error?.errors?.name
                          ? " border-2 border-red-500"
                          : is_saving
                            ? "opacity-50 cursor-not-allowed"
                            : " border-2 border-white hover:border-gray-900 focus:border-gray-900")
                      }
                      type="text"
                      name="lastname"
                      id="lastname"
                      autoComplete="off"
                      onChange={(e) => {
                        formikUpdateDriver.handleChange(e);
                        if (error?.errors?.lastname) {
                          dispatch(resetErrors());
                        }
                      }}
                      disabled={is_saving}
                      value={formikUpdateDriver.values.lastname}
                    />
                    {(formikUpdateDriver.touched.lastname &&
                      formikUpdateDriver.errors.lastname) ||
                      error?.errors?.lastname ? (
                      <span className="text-sm font-medium text-red-500">
                        {formikUpdateDriver.errors.lastname ||
                          error?.errors?.lastname[0]}
                      </span>
                    ) : null}
                  </div>
                  <div>
                    <label
                      htmlFor="driver_license_expiration_date"
                      className="block text-gray-700 dark:text-white font-medium mb-2"
                    >
                      Fecha de expiración(Licencia de Conducir){" "}
                      <span className="text-md font-normal text-red-500">
                        *
                      </span>
                    </label>
                    <input
                      className={
                        "w-full font-normal px-4 py-4 bg-gray-100 rounded-xl transition duration-150 ease-out " +
                        ((formikUpdateDriver.touched
                          .driver_license_expiration_date &&
                          formikUpdateDriver.errors
                            .driver_license_expiration_date) ||
                          error?.errors?.name
                          ? " border-2 border-red-500"
                          : is_saving
                            ? "opacity-50 cursor-not-allowed"
                            : " border-2 border-white hover:border-gray-900 focus:border-gray-900")
                      }
                      type="date"
                      name="driver_license_expiration_date"
                      id="driver_license_expiration_date"
                      autoComplete="off"
                      onChange={(e) => {
                        formikUpdateDriver.handleChange(e);
                        if (error?.errors?.driver_license_expiration_date) {
                          dispatch(resetErrors());
                        }
                      }}
                      disabled={is_saving}
                      value={
                        formikUpdateDriver.values.driver_license_expiration_date
                      }
                    />
                    {(formikUpdateDriver.touched
                      .driver_license_expiration_date &&
                      formikUpdateDriver.errors
                        .driver_license_expiration_date) ||
                      error?.errors?.driver_license_expiration_date ? (
                      <span className="text-sm font-medium text-red-500">
                        {formikUpdateDriver.errors
                          .driver_license_expiration_date ||
                          error?.errors?.driver_license_expiration_date[0]}
                      </span>
                    ) : null}
                  </div>
                  <button
                    className="bg-solgas-primary text-white active:bg-solgas-secondary text-base font-semibold px-4 py-4 rounded-xl hover:shadow-lg outline-none focus:outline-none w-full"
                    style={{ transition: "all .15s ease" }}
                    type="submit"
                  >
                    Actualizar
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
                        <div className="px-4 py-3 hover:bg-gray-200 rounded-bl-xl rounded-br-xl">
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
                      Datos personales
                    </Link>
                  </li>
                </ul>
              </nav>
              <div className="flex justify-between items-center">
                <p className="mt-5 text-lg font-semibold leading-7 text-solgas-primary">
                  Datos personales
                </p>
                <button
                  onClick={showAddPersonalInformationModal}
                  className="focus:ring outline-none rounded-lg text-white bg-solgas-primary px-8 py-2 font-semibold active:scale-95 hover:opacity-90 flex gap-2 items-center"
                >
                  Agregar Datos Personales{" "}
                  <PlusCircleIcon className="w-6 h-6" />
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
                rowData={drivers}
                columnDefs={columnDefs}
                pagination={true}
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

export default People