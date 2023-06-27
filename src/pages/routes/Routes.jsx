import { host } from "../../constants";
import { Link } from "react-router-dom";
import { AgGridReact } from "ag-grid-react";
import { EyeIcon, XCircleIcon } from "@heroicons/react/solid/";
import { getRoutes, getRouteById } from "../../features/routeSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useRef, useState } from "react";
import { MapContainer, TileLayer, useMap, useMapEvents } from 'react-leaflet'
import { AntPath, antPath } from 'leaflet-ant-path';
import "leaflet/dist/leaflet.css";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "react-image-gallery/styles/css/image-gallery.css";

const Routes = () => {

  const gridRef = useRef();
  const dispatch = useDispatch();

  const [openTab, setOpenTab] = useState(1);
  const [position, setPosition] = useState([0, 0])
  const [positions, setPositions] = useState([])
  const [images, setImages] = useState([])
  const [showModalViewRoute, setShowModalViewRoute] = useState(false);

  const {
    route,
    routes,
  } = useSelector(state => ({
    ...state.routes,
  }));

  const columnDefs = useMemo(() => {
    return [
      {
        field: "unit_name",
        filter: true,
        headerName: "Unidad",
        cellStyle: { textAlign: "center" },
      },
      {
        field: "source_address",
        filter: true,
        headerName: "Dirección de Origen",
        cellStyle: { textAlign: "center" },
      },
      {
        field: "finish_address",
        filter: true,
        headerName: "Dirección de Fin",
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
                  openModalViewRoute(value);
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

  const openModalViewRoute = (id) => {
    dispatch(getRouteById(id));
    setShowModalViewRoute(true);
  };

  const closeModalViewRoute = () => {
    setShowModalViewRoute(false);
    setPositions([])
  };

  function SetViewOnClick({ coords }) {
    const map = useMap();

    if (coords.length > 0) {
      const first_position = [coords[0][0], coords[0][1]]
      const first_position_marker = L.marker(first_position).addTo(map);

      const last_position = [coords[coords.length - 1][0], coords[coords.length - 1][1]]
      const last_position_marker = L.marker(last_position).addTo(map);

      route?.stops.map((stop) => {
        const stop_position = [stop.latitude, stop.longitude]
        const stop_position_marker = L.marker(stop_position).addTo(map);

        stop_position_marker.bindPopup(
          `
          ${stop?.address}
        `
        );
      })

      route?.incidents.map((incident) => {
        const incident_position = [incident.latitude, incident.longitude]
        const incident_position_marker = L.marker(incident_position).addTo(map);

        incident_position_marker.bindPopup(
          `
          ${incident?.address}
        `
        );
      })

      first_position_marker.bindPopup(
        `
        ${route?.source_datetime}
      `
      );

      last_position_marker.bindPopup(
        `
        ${route?.finish_datetime}
      `
      );

      const path = antPath(positions, {
        "delay": 800,
        "dashArray": [
          10,
          20
        ],
        "weight": 4,
        "color": "#0000FF",
        "pulseColor": "#FFFFFF",
        "paused": false,
        "reverse": false,
        "hardwareAccelerated": true
      }).addTo(map);

      map.fitBounds(path.getBounds());
    }

    setTimeout(() => {
      map.invalidateSize()
    }, 0)
    return null;
  }

  useEffect(() => {
    dispatch(getRoutes())
  }, []);

  useEffect(() => {
    if (route?.positions) {
      route?.positions.map((position) => {
        const data = [position.latitude, position.longitude]
        setPositions(positions => [...positions, data])
      })
    }
  }, [route]);

  return (
    <>
      {showModalViewRoute && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 py-5 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl overflow-auto max-w-3xl w-full max-h-full">
            <div className="z-50 rounded-t-xl bg-white-primary flex items-start justify-between px-6 py-5 max-w-3xl w-full border-b-2 border-white-secondary dark:border-dark-secondary">
              <h3 className="text-gray-900 dark:text-gray-100 font-medium self-center">
                Ruta
              </h3>
              <button
                onClick={closeModalViewRoute}
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
            <div className="flex flex-wrap">
              <div className="w-full">
                <ul
                  className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row px-6"
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
                      Mapa
                    </a>
                  </li>
                  <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                    <a
                      className={
                        "text-sm font-bold px-5 py-3 shadow-lg rounded block leading-normal " +
                        (openTab === 2
                          ? "text-white bg-solgas-primary"
                          : "text-white-600 bg-white")
                      }
                      onClick={(e) => {
                        e.preventDefault();
                        setOpenTab(2);
                      }}
                      data-toggle="tab"
                      href="#link2"
                      role="tablist"
                    >
                      Detalles de la ruta
                    </a>
                  </li>
                </ul>
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full shadow-lg rounded">
                  <div className="px-4 py-0 flex-auto">
                    <div className="tab-content tab-space">
                      <div
                        className={openTab === 1 ? "block" : "hidden"}
                        id="link1"
                      >
                        <div className="relative flex h-full flex-col overflow-hidden bg-white text-gray-600">
                          <div className="flex-auto p-6">
                            <div className="relative flex flex-col justify-center">
                              <MapContainer
                                center={position}
                                zoom={13}
                                scrollWheelZoom={true}
                                className="w-full h-96"
                              >
                                <TileLayer
                                  attribution='&copy; <a href="https://maps.google.com/">Google Maps</a>'
                                  url="http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
                                  subdomains={["mt0", "mt1", "mt2", "mt3"]}
                                />
                                <SetViewOnClick coords={positions} />
                              </MapContainer>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        className={openTab === 2 ? "block" : "hidden"}
                        id="link2"
                      >
                        <div className="relative flex h-full flex-col overflow-hidden bg-white text-gray-600">
                          <div className="flex-auto">
                            <div className="relative flex flex-col justify-center">
                              <div className="">
                                <div className="flex-1 rounded-lg">
                                  <h4 className="text-gray-900 font-bold">
                                    Detalles de la ruta
                                  </h4>
                                  <div className="relative px-4">
                                    <div className="absolute h-full border border-dashed border-opacity-20 border-secondary"></div>
                                    <div className="flex items-center w-full my-6 -ml-1.5">
                                      <div className="w-1/12 z-10">
                                        <div className="w-3.5 h-3.5 bg-solgas-primary rounded-full"></div>
                                      </div>
                                      <div className="w-11/12">
                                        <p className="text-sm font-medium">
                                          Fecha y Hora de Origen
                                        </p>
                                        <p className="text-xs text-gray-500">
                                          {route?.source_datetime}
                                        </p>
                                      </div>
                                    </div>
                                    <div className="flex items-center w-full my-6 -ml-1.5">
                                      <div className="w-1/12 z-10">
                                        <div className="w-3.5 h-3.5 bg-solgas-primary rounded-full"></div>
                                      </div>
                                      <div className="w-11/12">
                                        <p className="text-sm font-medium">
                                          Latitud de Origen
                                        </p>
                                        <p className="text-xs text-gray-500">
                                          {route?.source_latitude}
                                        </p>
                                      </div>
                                    </div>
                                    <div className="flex items-center w-full my-6 -ml-1.5">
                                      <div className="w-1/12 z-10">
                                        <div className="w-3.5 h-3.5 bg-solgas-primary rounded-full"></div>
                                      </div>
                                      <div className="w-11/12">
                                        <p className="text-sm font-medium">
                                          Longitud de Origen
                                        </p>
                                        <p className="text-xs text-gray-500">
                                          {route?.source_latitude}
                                        </p>
                                      </div>
                                    </div>
                                    <div className="flex items-center w-full my-6 -ml-1.5">
                                      <div className="w-1/12 z-10">
                                        <div className="w-3.5 h-3.5 bg-solgas-primary rounded-full"></div>
                                      </div>
                                      <div className="w-11/12">
                                        <p className="text-sm font-medium">
                                          Dirección de Origen
                                        </p>
                                        <p className="text-xs text-gray-500">
                                          {route?.source_address}
                                        </p>
                                      </div>
                                    </div>
                                    <div className="flex items-center w-full my-6 -ml-1.5">
                                      <div className="w-1/12 z-10">
                                        <div className="w-3.5 h-3.5 bg-solgas-primary rounded-full"></div>
                                      </div>
                                      <div className="w-11/12">
                                        <p className="text-sm font-medium">
                                          Latitud del Destino
                                        </p>
                                        <p className="text-xs text-gray-500">
                                          {route?.destination_latitude}
                                        </p>
                                      </div>
                                    </div>
                                    <div className="flex items-center w-full my-6 -ml-1.5">
                                      <div className="w-1/12 z-10">
                                        <div className="w-3.5 h-3.5 bg-solgas-primary rounded-full"></div>
                                      </div>
                                      <div className="w-11/12">
                                        <p className="text-sm font-medium">
                                          Longitud del Destino
                                        </p>
                                        <p className="text-xs text-gray-500">
                                          {route?.destination_longitude}
                                        </p>
                                      </div>
                                    </div>
                                    <div className="flex items-center w-full my-6 -ml-1.5">
                                      <div className="w-1/12 z-10">
                                        <div className="w-3.5 h-3.5 bg-solgas-primary rounded-full"></div>
                                      </div>
                                      <div className="w-11/12">
                                        <p className="text-sm font-medium">
                                          Dirección del Destino
                                        </p>
                                        <p className="text-xs text-gray-500">
                                          {route?.destination_address}
                                        </p>
                                      </div>
                                    </div>
                                    <div className="flex items-center w-full my-6 -ml-1.5">
                                      <div className="w-1/12 z-10">
                                        <div className="w-3.5 h-3.5 bg-solgas-primary rounded-full"></div>
                                      </div>
                                      <div className="w-11/12">
                                        <p className="text-sm font-medium">
                                          Fecha y Hora del Final
                                        </p>
                                        <p className="text-xs text-gray-500">
                                          {route?.finish_datetime}
                                        </p>
                                      </div>
                                    </div>
                                    <div className="flex items-center w-full my-6 -ml-1.5">
                                      <div className="w-1/12 z-10">
                                        <div className="w-3.5 h-3.5 bg-solgas-primary rounded-full"></div>
                                      </div>
                                      <div className="w-11/12">
                                        <p className="text-sm font-medium">
                                          Latitud del Final
                                        </p>
                                        <p className="text-xs text-gray-500">
                                          {route?.finish_latitude}
                                        </p>
                                      </div>
                                    </div>
                                    <div className="flex items-center w-full my-6 -ml-1.5">
                                      <div className="w-1/12 z-10">
                                        <div className="w-3.5 h-3.5 bg-solgas-primary rounded-full"></div>
                                      </div>
                                      <div className="w-11/12">
                                        <p className="text-sm font-medium">
                                          Longitud del Final
                                        </p>
                                        <p className="text-xs text-gray-500">
                                          {route?.finish_longitude}
                                        </p>
                                      </div>
                                    </div>
                                    <div className="flex items-center w-full my-6 -ml-1.5">
                                      <div className="w-1/12 z-10">
                                        <div className="w-3.5 h-3.5 bg-solgas-primary rounded-full"></div>
                                      </div>
                                      <div className="w-11/12">
                                        <p className="text-sm font-medium">
                                          Dirección del Final
                                        </p>
                                        <p className="text-xs text-gray-500">
                                          {route?.finish_address}
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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
                    to="/initial-inspections"
                    title=""
                    className="cursor-pointer text-sm font-semibold leading-5 text-gray-600 hover:text-gray-900"
                  >
                    Rutas
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
              rowData={routes}
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

export default Routes;