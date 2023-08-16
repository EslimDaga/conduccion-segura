import { Link } from "react-router-dom";
import { AgGridReact } from "ag-grid-react";
import { EyeIcon, XCircleIcon } from "@heroicons/react/solid/";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useRef, useState } from "react";
import { MapContainer, TileLayer, useMap, useMapEvents } from 'react-leaflet'
import { getInitialInspections, getInitialInspectionById } from "../../features/initialInspectionSlice";
import ImageGallery from 'react-image-gallery';
import "leaflet/dist/leaflet.css";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "react-image-gallery/styles/css/image-gallery.css";
import { host } from "../../constants";

function renderItem(item) {
  return (
    <div className='image-gallery-image'>
      <img src={item.original} alt={item.description} />
      <div className='image-gallery-description'>{item.description}</div>
    </div>
  );
}

const InitialInspections = () => {

  const gridRef = useRef();
  const dispatch = useDispatch();

  const [openTab, setOpenTab] = useState(1);
  const [position, setPosition] = useState([0, 0])
  const [images, setImages] = useState([])
  const [showModalViewInitialInspection, setShowModalViewInitialInspection] = useState(false);

  const {
    initialInspection,
    initialInspections,
  } = useSelector(state => ({
    ...state.initialInspections,
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
    setImages([])
  };

  function SetViewOnClick({ coords }) {
    const map = useMap();

    map.eachLayer((layer) => {
      if (layer.options.icon) {
        layer.remove();
      }
    });

    map.setView(coords, 19);

    const marker = new L.marker(coords);
    marker.addTo(map);

    marker.bindPopup(initialInspection?.unit_name)

    setTimeout(() => {
      map.invalidateSize()
    }, 0)
    return null;
  }

  useEffect(() => {
    dispatch(getInitialInspections());
  }, []);

  useEffect(() => {
    if (initialInspection) {
      setPosition([initialInspection.latitude, initialInspection.longitude]);
      initialInspection?.images?.map((image) => {

        let description = ""

        if (image.description === "image1") {
          description = "Odómetro"
        } else if (image.description === "image2") {
          description = "Selfie"
        } else if (image.description === "image3") {
          description = "Unidad"
        } else if (image.description === "image4") {
          description = "Cinturón de seguridad"
        }

        setImages(images => [...images, {
          original: host + image.src,
          thumbnail: host + image.src,
          description: description
        }]);
      })
    }
  }, [initialInspection]);

  return (
    <>
      {showModalViewInitialInspection && (
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
                          Preguntas
                        </a>
                      </li>
                      <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                        <a
                          className={
                            "text-sm font-bold px-5 py-3 shadow-lg rounded block leading-normal " +
                            (openTab === 3
                              ? "text-white bg-solgas-primary"
                              : "text-white-600 bg-white")
                          }
                          onClick={(e) => {
                            e.preventDefault();
                            setOpenTab(3);
                          }}
                          data-toggle="tab"
                          href="#link3"
                          role="tablist"
                        >
                          Mapa
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
                                        {initialInspection?.unit_name}
                                      </h6>
                                    </div>
                                  </div>
                                  <div className="relative mb-4">
                                    <span className="absolute inline-flex h-6 w-6 items-center justify-center rounded-full bg-solgas-primary p-4 text-center text-base font-semibold text-white shadow">
                                      D
                                    </span>
                                    <div className="ml-12 w-auto py-2">
                                      <h6 className="text-sm font-semibold text-blue-900">
                                        {initialInspection?.driver_id_number}
                                      </h6>
                                    </div>
                                  </div>
                                  <div className="relative mb-4">
                                    <span className="absolute inline-flex h-6 w-6 items-center justify-center rounded-full bg-solgas-primary p-4 text-center text-base font-semibold text-white shadow">
                                      N
                                    </span>
                                    <div className="ml-12 w-auto py-2">
                                      <h6 className="text-sm font-semibold text-blue-900">
                                        {initialInspection?.driver_fullname ||
                                          "Sin nombre"}
                                      </h6>
                                    </div>
                                  </div>
                                  <div className="relative mb-4">
                                    <span className="absolute inline-flex h-6 w-6 items-center justify-center rounded-full bg-solgas-primary p-4 text-center text-base font-semibold text-white shadow">
                                      L
                                    </span>
                                    <div className="ml-12 w-auto py-2">
                                      <h6 className="text-sm font-semibold text-blue-900">
                                        {initialInspection?.latitude}
                                      </h6>
                                    </div>
                                  </div>
                                  <div className="relative mb-4">
                                    <span className="absolute inline-flex h-6 w-6 items-center justify-center rounded-full bg-solgas-primary p-4 text-center text-base font-semibold text-white shadow">
                                      L
                                    </span>
                                    <div className="ml-12 w-auto py-2">
                                      <h6 className="text-sm font-semibold text-blue-900">
                                        {initialInspection?.longitude}
                                      </h6>
                                    </div>
                                  </div>
                                  <div className="relative mb-4">
                                    <span className="absolute inline-flex h-6 w-6 items-center justify-center rounded-full bg-solgas-primary p-4 text-center text-base font-semibold text-white shadow">
                                      T
                                    </span>
                                    <div className="ml-12 w-auto py-2">
                                      <h6 className="text-sm font-semibold text-blue-900">
                                        {initialInspection?.duration_time}{" "}
                                        segundos
                                      </h6>
                                    </div>
                                  </div>
                                  <div className="relative mb-4">
                                    <span className="absolute inline-flex h-6 w-6 items-center justify-center rounded-full bg-solgas-primary p-4 text-center text-base font-semibold text-white shadow">
                                      M
                                    </span>
                                    <div className="ml-12 w-auto py-2">
                                      <h6 className="text-sm font-semibold text-blue-900">
                                        {initialInspection?.modified}
                                      </h6>
                                    </div>
                                  </div>
                                  <div className="relative">
                                    <span className="absolute inline-flex h-6 w-6 items-center justify-center rounded-full bg-solgas-primary p-4 text-center text-base font-semibold text-white shadow">
                                      C
                                    </span>
                                    <div className="ml-12 w-auto py-2">
                                      <h6 className="text-sm font-semibold text-blue-900">
                                        {initialInspection?.created}
                                      </h6>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div
                            className={openTab === 2 ? "block" : "hidden"}
                            id="link2"
                          >
                            <div className="relative flex h-full flex-col overflow-hidden bg-white text-gray-600">
                              <div className="flex-auto p-6">
                                <div className="relative flex flex-col justify-center">
                                  <div className="absolute left-4 h-full border-r-2"></div>
                                  {initialInspection?.questions.map(
                                    (question, index) => (
                                      <div
                                        key={index}
                                        className="relative mb-4"
                                      >
                                        <span className="absolute inline-flex h-6 w-6 items-center justify-center rounded-full bg-solgas-primary p-4 text-center text-base font-semibold text-white shadow">
                                          {index + 1}
                                        </span>
                                        <div className="ml-12 w-auto pt-1">
                                          <h6 className="text-sm font-semibold text-blue-900">
                                            {question?.question}
                                          </h6>
                                          <p className="mt-1 text-xs text-gray-500">
                                            {question?.answer ? "Si" : "No"}
                                          </p>
                                        </div>
                                      </div>
                                    )
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div
                            className={openTab === 3 ? "block" : "hidden"}
                            id="link3"
                          >
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
                              <SetViewOnClick coords={position} />
                            </MapContainer>
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