import {
  PencilAltIcon,
  PlusCircleIcon,
  TrashIcon,
  XCircleIcon,
} from "@heroicons/react/solid/";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { AgGridReact } from "ag-grid-react";
import { AG_GRID_LOCALE_ES } from "../../i18n/agGridLocale.es"
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useRef, useState } from "react";
import { createUnit, deleteUnit, getUnitById, getUnits, resetErrors, updateUnit } from "../../features/unitSlice";
import * as Yup from "yup";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

const Units = () => {

  const gridRef = useRef();

  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);

  const {
    units,
    unit,
    error,
    is_saving,
    loading_units
  } = useSelector(state => ({
    ...state.units,
  }));

  const columnDefs = useMemo(() => {
    return [
      {
        field: "name",
        filter: true,
        headerName: "Nombre",
        cellStyle: { textAlign: "center" },
      },
      {
        field: "description",
        filter: true,
        headerName: "Descripción",
        cellStyle: { textAlign: "center" },
      },
      {
        field: "last_odometer",
        filter: true,
        headerName: "Odómetro",
        cellStyle: { textAlign: "center" },
      },
      {
        field: "technical_review_expiration_date",
        filter: true,
        headerName: "Fecha de vencimiento de la revisión técnica",
        cellStyle: { textAlign: "center" },
      },
      {
        field: "soat_expiration_date",
        filter: true,
        headerName: "Fecha de vencimiento del SOAT",
        cellStyle: { textAlign: "center" },
      },
      {
        field: "insurance_expiration_date",
        filter: true,
        headerName: "Fecha de vencimiento del seguro",
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
                  showEditUnitModal(value);
                }}
                className="bg-solgas-primary hover:bg-solgas-secondary text-white font-bold py-2 px-4 rounded-lg"
              >
                <PencilAltIcon className="h-6 w-6" />
              </button>
              <button
                className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 rounded-lg"
                onClick={() => {
                  dispatch(deleteUnit(value));
                }}
              >
                <TrashIcon className="h-6 w-6" />
              </button>
            </div>
          );
        }
      }
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

  const showAddUnitModal = () => {
    setShowModal(true);
  }

  const showEditUnitModal = (id) => {
    setShowModalEdit(true);
    dispatch(getUnitById(id))
  }

  const closeAddUnitModal = () => {
    setShowModal(false);
    formikCreateUnit.resetForm();
    dispatch(resetErrors());
  }

  const closeEditUnitModal = () => {
    setShowModalEdit(false);
    formikUpdateUnit.resetForm();
    dispatch(resetErrors());
  }

  useEffect(() => {
    dispatch(getUnits());
  }, []);

  useEffect(() => {
    if (!is_saving) {
      closeAddUnitModal();
      closeEditUnitModal();
    }
  }, [units]);

  useEffect(() => {
    formikUpdateUnit.setValues({
      id: unit?.id || "",
      name: unit?.name || "",
      description: unit?.description || "",
      last_odometer: unit?.last_odometer || "",
      technical_review_expiration_date: unit?.technical_review_expiration_date || "",
      soat_expiration_date: unit?.soat_expiration_date || "",
      insurance_expiration_date: unit?.insurance_expiration_date || "",
    })
  }, [unit]);

  const formikCreateUnit = useFormik({
    initialValues: {
      id: "",
      name: "",
      description: "",
      last_odometer: 0,
      technical_review_expiration_date: "",
      soat_expiration_date: "",
      insurance_expiration_date: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required("El nombre es obligatorio")
        .max(10, "El nombre debe tener menos de 10 caracteres"),
      technical_review_expiration_date: Yup.date()
        .required("La fecha de vencimiento de la revisión técnica es obligatoria")
        .typeError("La fecha de vencimiento de la revisión técnica debe ser una fecha"),
      soat_expiration_date: Yup.date()
        .required("La fecha de vencimiento del SOAT es obligatoria")
        .typeError("La fecha de vencimiento del SOAT debe ser una fecha"),
      insurance_expiration_date: Yup.date()
        .required("La fecha de vencimiento del seguro es obligatoria")
        .typeError("La fecha de vencimiento del seguro debe ser una fecha"),
    }),
    onSubmit: values => {
      const data = {
        name: values.name,
        description: values.description,
        last_odometer: 0,
        technical_review_expiration_date: values.technical_review_expiration_date,
        soat_expiration_date: values.soat_expiration_date,
        insurance_expiration_date: values.insurance_expiration_date,
      }
      dispatch(createUnit(data));
    }
  });

  const formikUpdateUnit = useFormik({
    initialValues: {
      name: "",
      description: "",
      last_odometer: "",
      technical_review_expiration_date: "",
      soat_expiration_date: "",
      insurance_expiration_date: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required("El nombre es obligatorio")
        .max(10, "El nombre debe tener menos de 10 caracteres"),
      last_odometer: Yup.number()
        .required("El odómetro es obligatorio")
        .typeError("El odómetro debe ser un número"),
      technical_review_expiration_date: Yup.date()
        .required(
          "La fecha de vencimiento de la revisión técnica es obligatoria"
        )
        .typeError(
          "La fecha de vencimiento de la revisión técnica debe ser una fecha"
        ),
      soat_expiration_date: Yup.date()
        .required("La fecha de vencimiento del SOAT es obligatoria")
        .typeError("La fecha de vencimiento del SOAT debe ser una fecha"),

      insurance_expiration_date: Yup.date()
        .required("La fecha de vencimiento del seguro es obligatoria")
        .typeError("La fecha de vencimiento del seguro debe ser una fecha"),
    }),
    onSubmit: (values) => {
      dispatch(updateUnit(values));
    },
  });

  return (
    <>
      {showModal && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 py-5 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl overflow-auto max-w-3xl w-full max-h-full">
            <div className="z-50 rounded-t-xl bg-white-primary flex items-start justify-between px-6 py-5 max-w-3xl w-full border-b-2 border-white-secondary dark:border-dark-secondary">
              <h3 className="text-gray-900 dark:text-gray-100 font-medium self-center">
                Agregar Unidad
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
              <form onSubmit={formikCreateUnit.handleSubmit}>
                <div className="space-y-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-gray-700 dark:text-white font-medium mb-2"
                    >
                      Placa de la unidad{" "}
                      <span className="text-md font-normal text-red-500">
                        *
                      </span>
                    </label>
                    <input
                      className={
                        "w-full font-normal px-4 py-4 bg-gray-100 rounded-xl transition duration-150 ease-out " +
                        ((formikCreateUnit.touched.name &&
                          formikCreateUnit.errors.name) ||
                          error?.errors?.name
                          ? " border-2 border-red-500"
                          : is_saving
                            ? "opacity-50 cursor-not-allowed"
                            : " border-2 border-white hover:border-gray-900 focus:border-gray-900")
                      }
                      type="text"
                      name="name"
                      id="name"
                      autoComplete="off"
                      onChange={(e) => {
                        formikCreateUnit.handleChange(e);
                        if (error?.errors?.name) {
                          dispatch(resetErrors());
                        }
                      }}
                      disabled={is_saving}
                    />
                    {(formikCreateUnit.touched.name &&
                      formikCreateUnit.errors.name) ||
                      error?.errors?.name ? (
                      <span className="text-sm font-medium text-red-500">
                        {formikCreateUnit.errors.name || error?.errors?.name[0]}
                      </span>
                    ) : null}
                  </div>
                  <div>
                    <label
                      htmlFor="description"
                      className="block text-gray-700 dark:text-white font-medium mb-2"
                    >
                      Descripción
                    </label>
                    <input
                      className="w-full font-normal px-4 py-4 bg-gray-100 rounded-xl transition duration-150 ease-out  border-2 border-white hover:border-gray-900 focus:border-gray-900"
                      type="text"
                      name="description"
                      id="description"
                      autoComplete="off"
                      onChange={formikCreateUnit.handleChange}
                      disabled={is_saving}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="technical_review_expiration_date"
                      className="block text-gray-700 dark:text-white font-medium mb-2"
                    >
                      Fecha de vencimiento de la revisión técnica{" "}
                      <span className="text-md font-normal text-red-500">
                        *
                      </span>
                    </label>
                    <input
                      className={
                        "w-full font-normal px-4 py-4 bg-gray-100 rounded-xl transition duration-150 ease-out " +
                        (formikCreateUnit.touched
                          .technical_review_expiration_date &&
                          formikCreateUnit.errors.technical_review_expiration_date
                          ? " border-2 border-red-500"
                          : is_saving
                            ? "opacity-50 cursor-not-allowed"
                            : " border-2 border-white hover:border-gray-900 focus:border-gray-900")
                      }
                      type="date"
                      name="technical_review_expiration_date"
                      id="technical_review_expiration_date"
                      autoComplete="off"
                      onChange={formikCreateUnit.handleChange}
                      disabled={is_saving}
                    />
                    {formikCreateUnit.touched.technical_review_expiration_date &&
                      formikCreateUnit.errors.technical_review_expiration_date ? (
                      <span className="text-sm font-medium text-red-500">
                        {formikCreateUnit.errors.technical_review_expiration_date}
                      </span>
                    ) : null}
                  </div>
                  <div>
                    <label
                      htmlFor="soat_expiration_date"
                      className="block text-gray-700 dark:text-white font-medium mb-2"
                    >
                      Fecha de vencimiento del SOAT{" "}
                      <span className="text-md font-normal text-red-500">
                        *
                      </span>
                    </label>
                    <input
                      className={
                        "w-full font-normal px-4 py-4 bg-gray-100 rounded-xl transition duration-150 ease-out " +
                        (formikCreateUnit.touched
                          .soat_expiration_date &&
                          formikCreateUnit.errors.soat_expiration_date
                          ? " border-2 border-red-500"
                          : is_saving
                            ? "opacity-50 cursor-not-allowed"
                            : " border-2 border-white hover:border-gray-900 focus:border-gray-900")
                      }
                      type="date"
                      name="soat_expiration_date"
                      id="soat_expiration_date"
                      autoComplete="off"
                      onChange={formikCreateUnit.handleChange}
                      disabled={is_saving}
                    />
                    {formikCreateUnit.touched.soat_expiration_date &&
                      formikCreateUnit.errors.soat_expiration_date ? (
                      <span className="text-sm font-medium text-red-500">
                        {formikCreateUnit.errors.soat_expiration_date}
                      </span>
                    ) : null}
                  </div>
                  <div>
                    <label
                      htmlFor="insurance_expiration_date"
                      className="block text-gray-700 dark:text-white font-medium mb-2"
                    >
                      Fecha de vencimiento del seguro{" "}
                      <span className="text-md font-normal text-red-500">
                        *
                      </span>
                    </label>
                    <input
                      className={
                        "w-full font-normal px-4 py-4 bg-gray-100 rounded-xl transition duration-150 ease-out " +
                        (formikCreateUnit.touched
                          .insurance_expiration_date &&
                          formikCreateUnit.errors.insurance_expiration_date
                          ? " border-2 border-red-500"
                          : is_saving
                            ? "opacity-50 cursor-not-allowed"
                            : " border-2 border-white hover:border-gray-900 focus:border-gray-900")
                      }
                      type="date"
                      name="insurance_expiration_date"
                      id="insurance_expiration_date"
                      autoComplete="off"
                      onChange={formikCreateUnit.handleChange}
                      disabled={is_saving}
                    />
                    {formikCreateUnit.touched.insurance_expiration_date &&
                      formikCreateUnit.errors.insurance_expiration_date ? (
                      <span className="text-sm font-medium text-red-500">
                        {formikCreateUnit.errors.insurance_expiration_date}
                      </span>
                    ) : null}
                  </div>
                  <button
                    className="bg-solgas-primary text-white active:bg-solgas-secondary text-base font-semibold px-4 py-4 rounded-xl hover:shadow-lg outline-none focus:outline-none w-full"
                    style={{ transition: "all .15s ease" }}
                    type="submit"
                  >
                    Agregar
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
                Editar Unidad
              </h3>
              <button
                onClick={closeEditUnitModal}
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
              <form onSubmit={formikUpdateUnit.handleSubmit}>
                <div className="space-y-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-gray-700 dark:text-white font-medium mb-2"
                    >
                      Placa de la unidad{" "}
                      <span className="text-md font-normal text-red-500">
                        *
                      </span>
                    </label>
                    <input
                      className={
                        "w-full font-normal px-4 py-4 bg-gray-100 rounded-xl transition duration-150 ease-out " +
                        ((formikUpdateUnit.touched.name &&
                          formikUpdateUnit.errors.name) ||
                          error?.errors?.name
                          ? " border-2 border-red-500"
                          : is_saving
                            ? "opacity-50 cursor-not-allowed"
                            : " border-2 border-white hover:border-gray-900 focus:border-gray-900")
                      }
                      type="text"
                      name="name"
                      id="name"
                      autoComplete="off"
                      onChange={(e) => {
                        formikUpdateUnit.handleChange(e);
                        if (error?.errors?.name) {
                          dispatch(resetErrors());
                        }
                      }}
                      value={formikUpdateUnit.values.name}
                      disabled={is_saving}
                    />
                    {(formikUpdateUnit.touched.name &&
                      formikUpdateUnit.errors.name) ||
                      error?.errors?.name ? (
                      <span className="text-sm font-medium text-red-500">
                        {formikUpdateUnit.errors.name || error?.errors?.name[0]}
                      </span>
                    ) : null}
                  </div>
                  <div>
                    <label
                      htmlFor="description"
                      className="block text-gray-700 dark:text-white font-medium mb-2"
                    >
                      Descripción
                    </label>
                    <input
                      className="w-full font-normal px-4 py-4 bg-gray-100 rounded-xl transition duration-150 ease-out  border-2 border-white hover:border-gray-900 focus:border-gray-900"
                      type="text"
                      name="description"
                      id="description"
                      autoComplete="off"
                      onChange={formikUpdateUnit.handleChange}
                      value={formikUpdateUnit.values.description}
                      disabled={is_saving}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="technical_review_expiration_date"
                      className="block text-gray-700 dark:text-white font-medium mb-2"
                    >
                      Fecha de vencimiento de la revisión técnica{" "}
                      <span className="text-md font-normal text-red-500">
                        *
                      </span>
                    </label>
                    <input
                      className={
                        "w-full font-normal px-4 py-4 bg-gray-100 rounded-xl transition duration-150 ease-out " +
                        (formikUpdateUnit.touched
                          .technical_review_expiration_date &&
                          formikUpdateUnit.errors.technical_review_expiration_date
                          ? " border-2 border-red-500"
                          : is_saving
                            ? "opacity-50 cursor-not-allowed"
                            : " border-2 border-white hover:border-gray-900 focus:border-gray-900")
                      }
                      type="date"
                      name="technical_review_expiration_date"
                      id="technical_review_expiration_date"
                      autoComplete="off"
                      onChange={formikUpdateUnit.handleChange}
                      disabled={is_saving}
                      value={formikUpdateUnit.values.technical_review_expiration_date}
                    />
                    {formikUpdateUnit.touched.technical_review_expiration_date &&
                      formikUpdateUnit.errors.technical_review_expiration_date ? (
                      <span className="text-sm font-medium text-red-500">
                        {formikUpdateUnit.errors.technical_review_expiration_date}
                      </span>
                    ) : null}
                  </div>
                  <div>
                    <label
                      htmlFor="soat_expiration_date"
                      className="block text-gray-700 dark:text-white font-medium mb-2"
                    >
                      Fecha de vencimiento del SOAT{" "}
                      <span className="text-md font-normal text-red-500">
                        *
                      </span>
                    </label>
                    <input
                      className={
                        "w-full font-normal px-4 py-4 bg-gray-100 rounded-xl transition duration-150 ease-out " +
                        (formikUpdateUnit.touched
                          .soat_expiration_date &&
                          formikUpdateUnit.errors.soat_expiration_date
                          ? " border-2 border-red-500"
                          : is_saving
                            ? "opacity-50 cursor-not-allowed"
                            : " border-2 border-white hover:border-gray-900 focus:border-gray-900")
                      }
                      type="date"
                      name="soat_expiration_date"
                      id="soat_expiration_date"
                      autoComplete="off"
                      onChange={formikUpdateUnit.handleChange}
                      disabled={is_saving}
                      value={formikUpdateUnit.values.soat_expiration_date}
                    />
                    {formikUpdateUnit.touched.soat_expiration_date &&
                      formikUpdateUnit.errors.soat_expiration_date ? (
                      <span className="text-sm font-medium text-red-500">
                        {formikUpdateUnit.errors.soat_expiration_date}
                      </span>
                    ) : null}
                  </div>
                  <div>
                    <label
                      htmlFor="insurance_expiration_date"
                      className="block text-gray-700 dark:text-white font-medium mb-2"
                    >
                      Fecha de vencimiento del seguro{" "}
                      <span className="text-md font-normal text-red-500">
                        *
                      </span>
                    </label>
                    <input
                      className={
                        "w-full font-normal px-4 py-4 bg-gray-100 rounded-xl transition duration-150 ease-out " +
                        (formikUpdateUnit.touched
                          .insurance_expiration_date &&
                          formikUpdateUnit.errors.insurance_expiration_date
                          ? " border-2 border-red-500"
                          : is_saving
                            ? "opacity-50 cursor-not-allowed"
                            : " border-2 border-white hover:border-gray-900 focus:border-gray-900")
                      }
                      type="date"
                      name="insurance_expiration_date"
                      id="insurance_expiration_date"
                      autoComplete="off"
                      onChange={formikUpdateUnit.handleChange}
                      disabled={is_saving}
                      value={formikUpdateUnit.values.insurance_expiration_date}
                    />
                    {formikUpdateUnit.touched.insurance_expiration_date &&
                      formikUpdateUnit.errors.insurance_expiration_date ? (
                      <span className="text-sm font-medium text-red-500">
                        {formikUpdateUnit.errors.insurance_expiration_date}
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
                    to="/units"
                    title=""
                    className="cursor-pointer text-sm font-semibold leading-5 text-gray-600 hover:text-gray-900"
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
                class="box-border relative z-30 inline-flex items-center justify-center w-auto px-8 py-3 overflow-hidden font-bold text-white transition-all duration-300 bg-solgas-primary rounded-md cursor-pointer group ring-offset-2 ring-1 ring-solgas-secondary ring-offset-indigo-200 hover:ring-offset-solgas-primary ease focus:outline-none"
              >
                <span class="absolute bottom-0 right-0 w-8 h-20 -mb-8 -mr-5 transition-all duration-300 ease-out transform rotate-45 translate-x-1 bg-white opacity-10 group-hover:translate-x-0"></span>
                <span class="absolute top-0 left-0 w-20 h-8 -mt-1 -ml-12 transition-all duration-300 ease-out transform -rotate-45 -translate-x-1 bg-white opacity-10 group-hover:translate-x-0"></span>
                <span class="relative z-20 flex items-center text-sm">
                  Agregar unidad
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
              rowData={units}
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
    </>
  );
}

export default Units