import { Link } from "react-router-dom";
import { getUnits } from "../../features/unitSlice";
import { useFormik } from "formik";
import { AgGridReact } from "ag-grid-react";
import { searchInspections } from "../../features/searchInspectionSlice";
import { AG_GRID_LOCALE_ES } from "../../i18n/agGridLocale.es";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useRef } from "react";
import * as Yup from "yup";

const SearchInspections = () => {

  const gridRef = useRef();
  const dispatch = useDispatch();

  const {
    units,
  } = useSelector((state) => state.units);

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

  const formikSearchInspections = useFormik({
    initialValues: {
      initial_datetime: "",
      final_datetime: "",
      unit_name: "",
    },
    validationSchema: Yup.object({
      initial_datetime: Yup.date().required("Campo requerido"),
      final_datetime: Yup.date().required("Campo requerido"),
      unit_name: Yup.string().required("Campo requerido"),
    }),
    onSubmit: (values) => {
      const { initial_datetime, final_datetime, unit_name } = values;
      const initial_datetime_format = initial_datetime.replace("T", " ");
      const final_datetime_format = final_datetime.replace("T", " ");

      const params = {
        initial_datetime: initial_datetime_format + ":00",
        final_datetime: final_datetime_format + ":00",
        unit_name: values.unit_name,
      }

      dispatch(searchInspections(params))
    },
  });

  useEffect(() => {
    dispatch(getUnits());
  }, []);

  return (
    <main className="h-screen pt-20">
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
                  to="/search-inspections"
                  title=""
                  className="cursor-pointer text-sm font-semibold leading-5 text-gray-600 hover:text-gray-900"
                >
                  Busqueda de inspecciones
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      <div className="p-6">
        <form onSubmit={formikSearchInspections.handleSubmit}>
          <div className="flex items-end gap-4">
            <div className="w-60">
              <label
                htmlFor="initial_datetime"
                className="block text-gray-700 dark:text-white font-medium mb-2"
              >
                Fecha inicial{" "}
                <span className="text-md font-normal text-red-500">*</span>
              </label>
              <input
                className={
                  "w-full font-normal px-4 py-4 bg-gray-100 rounded-xl transition duration-150 ease-out " +
                  (formikSearchInspections.touched.initial_datetime &&
                    formikSearchInspections.errors.initial_datetime
                    ? " border-2 border-red-500"
                    : false
                      ? "opacity-50 cursor-not-allowed"
                      : " border-0 border-white hover:border-gray-900 focus:border-gray-900")
                }
                type="datetime-local"
                name="initial_datetime"
                id="initial_datetime"
                autoComplete="off"
                onChange={formikSearchInspections.handleChange}
              />
            </div>
            <div className="w-60">
              <label
                htmlFor="final_datetime"
                className="block text-gray-700 dark:text-white font-medium mb-2"
              >
                Fecha final{" "}
                <span className="text-md font-normal text-red-500">*</span>
              </label>
              <input
                className={
                  "w-full font-normal px-4 py-4 bg-gray-100 rounded-xl transition duration-150 ease-out " +
                  (formikSearchInspections.touched.final_datetime &&
                    formikSearchInspections.errors.final_datetime
                    ? " border-2 border-red-500"
                    : false
                      ? "opacity-50 cursor-not-allowed"
                      : " border-0 border-white hover:border-gray-900 focus:border-gray-900")
                }
                type="datetime-local"
                name="final_datetime"
                id="final_datetime"
                autoComplete="off"
                onChange={formikSearchInspections.handleChange}
              />
            </div>
            <div className="w-60">
              <label
                htmlFor="unit_name"
                className="block text-gray-700 dark:text-white font-medium mb-2"
              >
                Unidad{" "}
                <span className="text-md font-normal text-red-500">*</span>
              </label>
              <select
                name="unit_name"
                id="unit_name"
                onChange={formikSearchInspections.handleChange}
                className={
                  "w-full font-normal px-4 py-4 bg-gray-100 rounded-xl transition duration-150 ease-out " +
                  (formikSearchInspections.touched.unit_name &&
                    formikSearchInspections.errors.unit_name
                    ? " border-2 border-red-500"
                    : false
                      ? "opacity-50 cursor-not-allowed"
                      : " border-0 border-white hover:border-gray-900 focus:border-gray-900")
                }
              >
                <option value="">Selecciona una unidad</option>
                {units.map((unit) => (
                  <option key={unit.id} value={unit.name}>
                    {unit.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-24">
              <button
                type="submit"
                className="w-full font-normal px-4 py-4 bg-solgas-primary text-white rounded-xl transition duration-150 ease-out"
              >
                Buscar
              </button>
            </div>
          </div>
        </form>
        <div className="pt-6">
          <div
            className="ag-theme-alpine w-full h-screen rounded-xl"
            style={{
              boxShadow: "0px 20px 68px 21px rgba(0,0,0,0.1)",
              height: "calc(100vh - 320px)",
            }}
          >
            <AgGridReact
              ref={gridRef}
              rowData={[]}
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
      </div>
    </main>
  );
}

export default SearchInspections;