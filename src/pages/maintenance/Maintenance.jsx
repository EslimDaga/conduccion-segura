import { host } from "../../constants";
import { Link } from "react-router-dom";
import { EyeIcon, XCircleIcon } from "@heroicons/react/solid";
import { AgGridReact } from "ag-grid-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMaintenanceById, getMaintenances } from "../../features/maintenanceSlice";
import ImageGallery from "react-image-gallery";

function renderItem(item) {
  return (
    <div className='image-gallery-image'>
      <img src={item.original} alt={item.description} />
      <div className='image-gallery-description'>{item.description}</div>
    </div>
  );
}

const Maintenance = () => {
  const gridRef = useRef();
  const dispatch = useDispatch();

  const [showModalViewMaintenance, setShowModalViewMaintenance] = useState(false);
  const [openTab, setOpenTab] = useState(1);
  const [images, setImages] = useState([]);

  const { maintenances, maintenance } = useSelector((state) => state.maintenances)

  const columnDefs = useMemo(() => {
    return [
      {
        field: "unit_name",
        filter: true,
        headerName: "Unidad",
        cellStyle: { textAlign: "center" },
      },
      {
        field: "driver_id_number",
        filter: true,
        headerName: "Número de documento",
        cellStyle: { textAlign: "center" },
      },
      {
        field: "driver_fullname",
        filter: true,
        headerName: "Nombre",
        cellStyle: { textAlign: "center" },
      },
      {
        field: "odometer",
        filter: true,
        headerName: "Odómetro",
        cellStyle: { textAlign: "center" },
        cellRenderer: ({ value }) => {
          return value + " km";
        },
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
                  openModalViewMaintenance(value);
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

  const openModalViewMaintenance = (id) => {
    dispatch(getMaintenanceById(id));
    setShowModalViewMaintenance(true);
  };

  const closeModalViewMaintenance = () => {
    setShowModalViewMaintenance(false);
    setImages([]);
  };

  useEffect(() => {
    dispatch(getMaintenances());
  }, []);

  useEffect(() => {
    if (maintenance?.images) {
      let images = maintenance.images.map((image) => {
        return {
          original: host + image.src,
          thumbnail: host + image.src,
          description: image.description,
        }
      });
      setImages(images);
    }
  }, [maintenance]);

  return (
    <>
      {showModalViewMaintenance && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 py-5 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl overflow-auto max-w-3xl w-full max-h-full">
            <div className="z-50 rounded-t-xl bg-white-primary flex items-start justify-between px-6 py-5 max-w-3xl w-full border-b-2 border-white-secondary dark:border-dark-secondary">
              <h3 className="text-gray-900 dark:text-gray-100 font-medium self-center">
                Mantenimiento
              </h3>
              <button
                onClick={closeModalViewMaintenance}
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
              <>
                <div className="flex flex-wrap">
                  <div className="w-full">
                    <ul
                      className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row"
                      role="tablist"
                    >
                      <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                        <a
                          className={
                            "text-sm font-bold px-5 py-3 shadow-lg rounded block leading-normal " +
                            (openTab === 1
                              ? "text-white bg-solgas-primary"
                              : "text-white-600 bg-white")
                          }
                          onClick={(e) => {
                            e.preventDefault();
                            setOpenTab(1);
                          }}
                          data-toggle="tab"
                          href="#link1"
                          role="tablist"
                        >
                          Información
                        </a>
                      </li>
                      <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                        <a
                          className={
                            "text-sm font-bold px-5 py-3 shadow-lg rounded block leading-normal " +
                            (openTab === 4
                              ? "text-white bg-solgas-primary"
                              : "text-white-600 bg-white")
                          }
                          onClick={(e) => {
                            e.preventDefault();
                            setOpenTab(4);
                          }}
                          data-toggle="tab"
                          href="#link4"
                          role="tablist"
                        >
                          Fotos
                        </a>
                      </li>
                    </ul>
                    <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
                      <div className="px-4 py-5 flex-auto">
                        <div className="tab-content tab-space">
                          <div
                            className={openTab === 1 ? "block" : "hidden"}
                            id="link1"
                          >
                            <div className="relative flex h-full flex-col overflow-hidden bg-white text-gray-600">
                              <div className="flex-auto p-6">
                                <div className="relative flex flex-col justify-center">
                                  <div className="absolute left-4 h-full border-r-2"></div>
                                  <div className="relative mb-4">
                                    <span className="absolute inline-flex h-6 w-6 items-center justify-center rounded-full bg-solgas-primary p-4 text-center text-base font-semibold text-white shadow">
                                      U
                                    </span>
                                    <div className="ml-12 w-auto py-2">
                                      <h6 className="text-sm font-semibold text-blue-900">
                                        {maintenance?.unit_name}
                                      </h6>
                                    </div>
                                  </div>
                                  <div className="relative mb-4">
                                    <span className="absolute inline-flex h-6 w-6 items-center justify-center rounded-full bg-solgas-primary p-4 text-center text-base font-semibold text-white shadow">
                                      D
                                    </span>
                                    <div className="ml-12 w-auto py-2">
                                      <h6 className="text-sm font-semibold text-blue-900">
                                        {maintenance?.driver_fullname}
                                      </h6>
                                    </div>
                                  </div>
                                  <div className="relative mb-4">
                                    <span className="absolute inline-flex h-6 w-6 items-center justify-center rounded-full bg-solgas-primary p-4 text-center text-base font-semibold text-white shadow">
                                      D
                                    </span>
                                    <div className="ml-12 w-auto py-2">
                                      <h6 className="text-sm font-semibold text-blue-900">
                                        {maintenance?.driver_id_number}
                                      </h6>
                                    </div>
                                  </div>
                                  <div className="relative mb-4">
                                    <span className="absolute inline-flex h-6 w-6 items-center justify-center rounded-full bg-solgas-primary p-4 text-center text-base font-semibold text-white shadow">
                                      D
                                    </span>
                                    <div className="ml-12 w-auto py-2">
                                      <h6 className="text-sm font-semibold text-blue-900">
                                        {maintenance?.description}
                                      </h6>
                                    </div>
                                  </div>
                                  <div className="relative mb-4">
                                    <span className="absolute inline-flex h-6 w-6 items-center justify-center rounded-full bg-solgas-primary p-4 text-center text-base font-semibold text-white shadow">
                                      O
                                    </span>
                                    <div className="ml-12 w-auto py-2">
                                      <h6 className="text-sm font-semibold text-blue-900">
                                        {maintenance?.odometer} km
                                      </h6>
                                    </div>
                                  </div>
                                  <div className="relative mb-4">
                                    <span className="absolute inline-flex h-6 w-6 items-center justify-center rounded-full bg-solgas-primary p-4 text-center text-base font-semibold text-white shadow">
                                      D
                                    </span>
                                    <div className="ml-12 w-auto py-2">
                                      <h6 className="text-sm font-semibold text-blue-900">
                                        {maintenance?.duration_time} segundos
                                      </h6>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div
                            className={openTab === 4 ? "block" : "hidden"}
                            id="link4"
                          >
                            <ImageGallery
                              items={images}
                              renderItem={renderItem}
                              showFullscreenButton={false}
                              showPlayButton={false}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            </div>
          </div>
        </div>
      )}
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
              rowData={maintenances}
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