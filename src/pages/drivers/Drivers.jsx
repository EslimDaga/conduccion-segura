import {
  PencilAltIcon,
  PlusCircleIcon,
  TrashIcon,
  XCircleIcon,
} from "@heroicons/react/solid/";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { AgGridReact } from "ag-grid-react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  createDriver,
  deleteDriver,
  getDriverById,
  getDrivers,
  updateDriver,
} from "../../features/driverSlice";
import * as Yup from "yup";
import Swal from "sweetalert2";
import "ag-grid-enterprise";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { AG_GRID_LOCALE_ES } from "../../i18n/agGridLocale.es";

const People = () => {
  const gridRef = useRef();
  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);

  const { drivers, driver, error, is_saving, loading_drivers, loading_driver } =
    useSelector((state) => ({
      ...state.drivers,
    }));

  const columnDefs = useMemo(() => {
    return [
      {
        field: "id_number",
        filter: true,
        headerName: "Número de documento",
        cellStyle: { textAlign: "center" },
      },
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
                  Swal.fire({
                    title: "¿Estás seguro?",
                    text: "¡No podrás revertir esto!",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#d33",
                    cancelButtonColor: "#3085d6",
                    confirmButtonText: "Sí, eliminar",
                    cancelButtonText: "Cancelar",
                  }).then((result) => {
                    if (result.isConfirmed) {
                      dispatch(deleteDriver(value));
                    }
                  });
                }}
              >
                <TrashIcon className="h-6 w-6" />
              </button>
            </div>
          );
        },
      },
    ];
  });

  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      minWidth: 150,
      filter: true,
    };
  });

  const localeText = useMemo(() => {
    return AG_GRID_LOCALE_ES;
  }, []);

  const showAddPersonalInformationModal = () => {
    setShowModal(true);
  };

  const showEditPersonalInformationModal = (id) => {
    setShowModalEdit(true);
    dispatch(getDriverById(id));
  };

  const closeAddPersonalInformationModal = () => {
    setShowModal(false);
  };

  const closeEditPersonalInformationModal = () => {
    setShowModalEdit(false);
  };

  const formikCreateDriver = useFormik({
    initialValues: {
      id_number: "",
      firstname: "",
      lastname: "",
      driver_license_expiration_date: "",
    },
    validationSchema: Yup.object({
      id_number: Yup.string()
        .required("El número de identificación es requerido")
        .matches(
          /^[0-9]+$/,
          "El número de identificación solo puede contener números"
        ),
      firstname: Yup.string().required("El nombre es requerido"),
      lastname: Yup.string().required("El apellido es requerido"),
      driver_license_expiration_date: Yup.string().required(
        "La fecha de expiración de la licencia es requerida"
      ),
    }),
    onSubmit: (values) => {
      dispatch(createDriver(values));
    },
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
      id_number: Yup.string().required(
        "El número de identificación es requerido"
      ),
      firstname: Yup.string().required("El nombre es requerido"),
      lastname: Yup.string().required("El apellido es requerido"),
      driver_license_expiration_date: Yup.string().required(
        "La fecha de expiración de la licencia es requerida"
      ),
    }),
    onSubmit: (values) => {
      dispatch(updateDriver(values));
    },
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
      driver_license_expiration_date:
        driver?.driver_license_expiration_date || "",
    });
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
                      Número de documento{" "}
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
                      Número de documento{" "}
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
                    to="/drivers"
                    title=""
                    className="cursor-pointer text-sm font-semibold leading-5 text-gray-600 hover:text-gray-900"
                  >
                    Conductores
                  </Link>
                </li>
              </ul>
            </nav>
            <div className="flex justify-between items-center">
              <p className="mt-5 text-lg font-semibold leading-7 text-solgas-primary">
                Conductores
              </p>
              <button
                onClick={showAddPersonalInformationModal}
                className="box-border relative z-30 inline-flex items-center justify-center w-auto px-8 py-3 overflow-hidden font-bold text-white transition-all duration-300 bg-solgas-primary rounded-md cursor-pointer group ring-offset-2 ring-1 ring-solgas-secondary ring-offset-indigo-200 hover:ring-offset-solgas-primary ease focus:outline-none"
              >
                <span className="absolute bottom-0 right-0 w-8 h-20 -mb-8 -mr-5 transition-all duration-300 ease-out transform rotate-45 translate-x-1 bg-white opacity-10 group-hover:translate-x-0"></span>
                <span className="absolute top-0 left-0 w-20 h-8 -mt-1 -ml-12 transition-all duration-300 ease-out transform -rotate-45 -translate-x-1 bg-white opacity-10 group-hover:translate-x-0"></span>
                <span className="relative z-20 flex items-center text-sm">
                  Agregar Conductores
                  <PlusCircleIcon className="h-5 w-5 ml-2" />
                </span>
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
              localeText={localeText}
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
    </>
  );
};

export default People;
