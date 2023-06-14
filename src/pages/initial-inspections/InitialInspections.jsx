import { Link } from "react-router-dom";
import { EyeIcon, XCircleIcon } from "@heroicons/react/solid/";
import { AgGridReact } from "ag-grid-react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useRef, useState } from "react";
import { getInitialInspections, getInitialInspectionById } from "../../features/initialInspectionSlice";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

const InitialInspections = () => {

  const gridRef = useRef();
  const dispatch = useDispatch();

  const [showModalViewInitialInspection, setShowModalViewInitialInspection] = useState(false);

  const {
    initialInspections,
    initialInspection
  } = useSelector(state => ({
    ...state.initialInspections,
  }));

  const columnDefs = useMemo(() => {
    return [
      {
        field: "driver_id_number",
        filter: true,
        headerName: "Documento de identidad",
        cellStyle: { textAlign: "center" },
      },
      {
        field: "driver_fullname",
        filter: true,
        headerName: "Nombre Completo",
        cellStyle: { textAlign: "center" },
      },
      {
        field: "latitude",
        filter: true,
        headerName: "Latitud",
        cellStyle: { textAlign: "center" },
      },
      {
        field: "longitude",
        filter: true,
        headerName: "Longitud",
        cellStyle: { textAlign: "center" },
      },
      {
        field: "duration_time",
        filter: true,
        headerName: "Tiempo de duración",
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
                  openModalViewInitialInspection(value);
                }}
                className="bg-solgas-primary hover:bg-solgas-secondary text-white font-bold py-2 px-4 rounded-lg"
              >
                <EyeIcon className="h-6 w-6" />
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

  const openModalViewInitialInspection = (id) => {
    dispatch(getInitialInspectionById(id));
    setShowModalViewInitialInspection(true);
  };

  const closeModalViewInitialInspection = () => {
    setShowModalViewInitialInspection(false);
  };

  useEffect(() => {
    dispatch(getInitialInspections());
  }, []);

  return (
    <>
      {
        showModalViewInitialInspection && (
          <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 py-5 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl overflow-auto max-w-3xl w-full max-h-full">
              <div className="z-50 rounded-t-xl bg-white-primary flex items-start justify-between px-6 py-5 max-w-3xl w-full border-b-2 border-white-secondary dark:border-dark-secondary">
                <h3 className="text-gray-900 dark:text-gray-100 font-medium self-center">
                  Inspección inicial
                </h3>
                <button
                  onClick={closeModalViewInitialInspection}
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
                {initialInspection?.driver_fullname}
              </div>
            </div>
          </div>
        )
      }
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
                    to="/initial-inspections"
                    title=""
                    className="cursor-pointer text-sm font-semibold leading-5 text-gray-600 hover:text-gray-900"
                  >
                    Inspecciones iniciales
                  </Link>
                </li>
              </ul>
            </nav>
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
              rowData={initialInspections}
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
    </>
  );
}

export default InitialInspections;