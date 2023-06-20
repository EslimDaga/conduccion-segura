import { Link } from "react-router-dom";
import { EyeIcon } from "@heroicons/react/solid";
import { AgGridReact } from "ag-grid-react";
import { useMemo, useRef } from "react";

const Maintenance = () => {
  const gridRef = useRef();

  const columnDefs = useMemo(() => {
    return [
      {
        field: "unit_name",
        filter: true,
        headerName: "Unidad",
        cellStyle: { textAlign: "center" },
      },
      {
        field: "datetime",
        filter: true,
        headerName: "Fecha y hora",
        cellStyle: { textAlign: "center" },
      },
      {
        field: "latitud",
        filter: true,
        headerName: "Latitud",
        cellStyle: { textAlign: "center" },
      },
      {
        field: "longitud",
        filter: true,
        headerName: "Longitud",
        cellStyle: { textAlign: "center" },
      },
      {
        field: "odometer",
        filter: true,
        headerName: "Tiempo de duración",
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

  return (
    <>
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
                    to="/maintenance"
                    className="cursor-pointer text-sm font-semibold leading-5 text-gray-600 hover:text-gray-900"
                  >
                    Mantenimientos
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
              rowData={[]}
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
  )
}

export default Maintenance;