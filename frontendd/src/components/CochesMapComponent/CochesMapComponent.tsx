import {
  MapContainer,
  TileLayer,
  Marker,
  Rectangle,
  Tooltip,
} from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import L, { Map as LeafletMap, type LatLngTuple } from "leaflet";
import type { MarkerCluster } from "leaflet";
import "leaflet/dist/leaflet.css";
import type { ZonaParking } from "../../interfaces/ZonaParkinsProps";
import { useEffect, useRef, useState, type FC } from "react";
import type { Vehiculo, DatosVehiculo } from "../../interfaces/Vehiculo";
import { FiltrersCatalogComponent } from "../FiltrersCatalogComponent/FiltrersCatalogComponent";
import { httpGet } from "../../utils/apiService";
import type { ParkingFilterComponentProp } from "../../interfaces/ParkingFilterComponentProp";
import { LegendComponent } from "../../components/LegendComponent/LegendComponent";
import { useTranslation } from "react-i18next";



export const ParkingFilterComponent: FC<ParkingFilterComponentProp> = ({
  mostrar,
  onToggle,
}) => {

  const { t } = useTranslation();

  return (
    
    <div className="w-full">
      <label
        htmlFor="toggle-parkings"
        className="w-[250px] flex items-center gap-3 bg-[#111827] px-4 py-3 rounded-xl text-white cursor-pointer hover:bg-[#1f2937] transition"
      >
        <input
          type="checkbox"
          id="toggle-parkings"
          checked={mostrar}
          onChange={onToggle}
          className="form-checkbox h-5 w-5 text-green-500 accent-green-500 rounded focus:ring-0"
        />
        <span className="text-sm font-semibold">{t("map.showParkings")}</span>
      </label>
    </div>
  );
};

const crearIconoCoche = (esSeleccionado: boolean) => {
  const color = esSeleccionado ? "#4ade80" : "#3b82f6";
  const extraStyle = esSeleccionado ? "animation: bounce 0.6s ease;" : "";

  return L.divIcon({
    className: "",
    html: `
      <div style="${extraStyle}">
        <svg width="40" height="45" viewBox="0 0 40 45" xmlns="http://www.w3.org/2000/svg">
          <g transform="translate(0,0)">
            <path d="M20 0C9 0 0 9 0 20c0 11 10 21 20 25 10-4 20-14 20-25C40 9 31 0 20 0z" fill="${color}" />
            <circle cx="20" cy="20" r="15" fill="white"/>
            <path d="M13 25v-2l1-4c.2-1 1-2 2-2h8c1 0 2 .7 2 2l1 4v2h-1a1 1 0 1 1-2 0h-8a1 1 0 1 1-2 0h-1zm3-6h8l-.5-2h-7l-.5 2z" fill="${color}" />
          </g>
        </svg>
      </div>
    `,
    iconSize: [40, 45],
    iconAnchor: [20, 45],
  });
};

const crearIconoParking = (esSeleccionado: boolean) => {
  const color = esSeleccionado ? "#4ade80" : "#10b981";
  const sombra = esSeleccionado ? "filter: drop-shadow(0 0 6px #4ade80);" : "";

  const extraStyle = esSeleccionado
    ? "animation: bounce 0.6s ease; transform: translate(-50%, -50%) scale(1.1);"
    : "transform: translate(-50%, -50%) scale(1);";
  //el extraStyle no esta comillado, revisar mas adelante
  return L.divIcon({
    className: "",
    html: `
    <div style=${extraStyle} ${sombra}">   
          <svg width="40" height="45" viewBox="0 0 40 45" xmlns="http://www.w3.org/2000/svg">
          <circle cx="15" cy="15" r="14" fill="${color}" />
          <text 
            x="40%" 
            y="35%" 
            text-anchor="middle" 
            dominant-baseline="central"
            fill="white" 
            font-size="20px" 
            font-family="Arial, sans-serif">
            P
          </text>
        </svg>
      </div>
    `,
    iconSize: [30, 30],
    iconAnchor: [15, 30],
  });
};

const ciudades = [
  { nombre: "Tarragona", coords: [41.1189, 1.2445] as LatLngTuple },
  { nombre: "Salou", coords: [41.0766, 1.1416] as LatLngTuple },
  { nombre: "Vila_seca", coords: [41.1056, 1.1571] as LatLngTuple },
  { nombre: "Reus", coords: [41.1543, 1.1086] as LatLngTuple },
  { nombre: "Cambrils", coords: [41.0748, 1.0522] as LatLngTuple },
];

// export interface ZonaParking {
//   id: number;
//   nombre: string;
//   foto: string;
//   bounds: [LatLngTuple, LatLngTuple];
// }

// export const zonasParking: {
//   id: number;
//   nombre: string;
//   foto: string;
//   bounds: [LatLngTuple, LatLngTuple];
// }[] = [
export const zonasParking: ZonaParking[] = [
  // Tarragona
  {
    id: 1,
    nombre: "Parking Estación Tarragona",
    foto: "/parking_layout_img.png",
    bounds: [
      [41.118, 1.242],
      [41.1192, 1.245],
    ],
  },
  {
    id: 2,
    nombre: "Parking Rambla Nova",
    foto: "/parking-rambla.jpg",
    bounds: [
      [41.116, 1.249],
      [41.117, 1.251],
    ],
  },

  // Salou
  {
    id: 3,
    nombre: "Parking Centro Salou",
    foto: "/parking-centro.jpg",
    bounds: [
      [41.075, 1.139],
      [41.0763, 1.142],
    ],
  },
  {
    id: 4,
    nombre: "Parking Playa Ponent",
    foto: "/parking-salou-playa.jpg",
    bounds: [
      [41.0715, 1.134],
      [41.0725, 1.137],
    ],
  },

  // Cambrils
  {
    id: 5,
    nombre: "Parking Playa Cambrils",
    foto: "/parking-cambrils-playa.jpg",
    bounds: [
      [41.0645, 1.057],
      [41.0655, 1.06],
    ],
  },
  {
    id: 6,
    nombre: "Parking Centro Cambrils",
    foto: "/parking-cambrils-centro.jpg",
    bounds: [
      [41.071, 1.052],
      [41.0722, 1.054],
    ],
  },

  // Vila-seca
  {
    id: 7,
    nombre: "Parking Vila-seca Centro",
    foto: "/parking-vilaseca.jpg",
    bounds: [
      [41.107, 1.144],
      [41.108, 1.146],
    ],
  },
  {
    id: 8,
    nombre: "Parking Estación Vila-seca",
    foto: "/parking-estacion-vilaseca.jpg",
    bounds: [
      [41.1035, 1.143],
      [41.1045, 1.145],
    ],
  },

  // Reus
  {
    id: 9,
    nombre: "Parking Centro Reus",
    foto: "/parking-reus.jpg",
    bounds: [
      [41.1565, 1.108],
      [41.1575, 1.111],
    ],
  },
  {
    id: 10,
    nombre: "Parking Hospital Reus",
    foto: "/parking-hospital-reus.jpg",
    bounds: [
      [41.147, 1.117],
      [41.148, 1.12],
    ],
  },
];

const CochesMapComponent = () => {
  const { t } = useTranslation();
  const [vehiculos, setVehiculos] = useState<Vehiculo[]>([]);
  const [vehiculosFiltrados, setVehiculosFiltrados] = useState<Vehiculo[]>([]);
  const [filtrosActivos, setFiltrosActivos] = useState<
    Record<string, string | number | boolean>
  >({});
  const [vehiculoSeleccionado, setVehiculoSeleccionado] =
    useState<DatosVehiculo | null>(null);
  const [mostrarTarjeta, setMostrarTarjeta] = useState(false);
  // const [parkingSeleccionado, setParkingSeleccionado] = useState<typeof zonasParking[0] | null>(null);
  const [parkingSeleccionado, setParkingSeleccionado] =
    useState<ZonaParking | null>(null);
  const [mostrarParkings, setMostrarParkings] = useState(true);

  const [posicionInicialMapa, setPosicionInicialMapa] = useState<LatLngTuple>([
    41.1189, 1.2445,
  ]);
  const [posicionUsuario, setPosicionUsuario] = useState<LatLngTuple | null>(
    null
  );
  const [direccionDetectada, setDireccionDetectada] = useState<string | null>(
    null
  );
  const [mostrarUbicacionUsuario, setMostrarUbicacionUsuario] = useState(false);
  const mapRef = useRef<LeafletMap | null>(null);

  const centrarMapa = (coords: LatLngTuple, zoom: number = 13) => {
    if (mapRef.current) {
      mapRef.current.flyTo(coords, zoom, { duration: 2 });
    }
  };

  const volverAVistaCiudad = () => {
    const destino = posicionInicialMapa || ciudades[0].coords;
    centrarMapa(destino, 13);
  };

  useEffect(() => {
    async function peticionVehiculos() {
      const response = await httpGet<Vehiculo[]>(`/vehiculos/ubicaciones`);

      if (response) {
        console.log(response);
        setVehiculos(response);
        setVehiculosFiltrados(response);
      } else {
        console.error("Error al cargar vehículos");
      }
    }

    peticionVehiculos();
  }, []);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const coords: LatLngTuple = [pos.coords.latitude, pos.coords.longitude];
        setPosicionUsuario(coords);

        const ciudadCercana = ciudades.reduce((prev, curr) => {
          const distPrev = Math.hypot(
            prev.coords[0] - coords[0],
            prev.coords[1] - coords[1]
          );
          const distCurr = Math.hypot(
            curr.coords[0] - coords[0],
            curr.coords[1] - coords[1]
          );
          return distCurr < distPrev ? curr : prev;
        });

        setPosicionInicialMapa(ciudadCercana.coords);
        setMostrarUbicacionUsuario(true);

        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${coords[0]}&lon=${coords[1]}&format=json`
          );
          const data = await res.json();
          setDireccionDetectada(data.display_name);
        } catch (err) {
          console.warn("Error al obtener la dirección:", err);
        }
      },
      () => {
        console.warn("No se pudo detectar la ubicación. Se usará Tarragona.");
        setPosicionInicialMapa(ciudades[0].coords);
      }
    );
  }, []);

  // Fly cuando ya hay mapa y posición
  useEffect(() => {
    if (mapRef.current && posicionInicialMapa) {
      centrarMapa(posicionInicialMapa);
    }
  }, [posicionInicialMapa]);

  useEffect(() => {
    // if (mostrarUbicacionUsuario) {
    //   const timer = setTimeout(() => {
    //     setMostrarUbicacionUsuario(false);    // Ocultar marcador del usuario tras 10s
    //   }, 10000);
    //   return () => clearTimeout(timer);
    // }
  }, [mostrarUbicacionUsuario]);

  const actualizarFiltro = (
    clave: string,
    valor: string | number | boolean
  ) => {
    const nuevosFiltros = { ...filtrosActivos, [clave]: valor };
    if (valor === "" || valor === null) delete nuevosFiltros[clave];
    setFiltrosActivos(nuevosFiltros);

    const contenidoFiltrado = vehiculos.filter((vehiculo) => {
      return Object.entries(nuevosFiltros).every(([clave, valor]) => {
        const propiedad = vehiculo[clave as keyof Vehiculo];
        switch (clave) {
          case "estado":
          case "tipo":
          case "localidad":
            return typeof propiedad === "string"
              ? propiedad
                .toLowerCase()
                .includes((valor as string).toLowerCase())
              : false;
          case "esAccesible":
            return (
              vehiculo.esAccesible === (valor === true || valor === "true")
            );
          default:
            return true;
        }
      });
    });

    setVehiculosFiltrados(contenidoFiltrado);

    if (clave === "localidad") {
      const normalizar = (t: string) => t.toLowerCase().replace(/[\s-_]/g, "");
      const ciudad = ciudades.find(
        (c) => normalizar(c.nombre) === normalizar(valor as string)
      );
      if (ciudad) {
        centrarMapa(ciudad.coords, 13);
      }
    } else {
      // Si no hay filtro de ciudad activo, y se aplicó otro filtro, ajustamos a todas las zonas
      const hayFiltroCiudad = Object.keys(nuevosFiltros).includes("localidad");

      if (!hayFiltroCiudad && contenidoFiltrado.length > 0) {
        // Cerrar tarjeta si hay alguna
        setVehiculoSeleccionado(null);
        setMostrarTarjeta(false);
        const bounds = L.latLngBounds(
          contenidoFiltrado.map((v) => [v.latitud, v.longitud])
        );
        if (mapRef.current) {
          mapRef.current.flyToBounds(bounds, {
            padding: [80, 80],
            duration: 2,
          });
        }
      }
    }
  };

  const handleClickVehiculo = async (id: number, coords: LatLngTuple) => {
    setMostrarTarjeta(false);
    setVehiculoSeleccionado(null);
    centrarMapa(coords, 17);

  try {
    const data = await httpGet<DatosVehiculo>(`/vehiculos/${id}`);
    setTimeout(() => {
      setVehiculoSeleccionado(data);
      setMostrarTarjeta(true);
    }, 400);
  } catch (err) {
    console.error("Error al obtener vehículo:", err);
  }
};

  return (
    <div className="pl-10 relative flex flex-col lg:flex-row gap-4 px-4 py-4 min-h-screen overflow-visible  ">
      <div className="w-full lg:w-3/4 h-[500px] lg:h-auto ">
        <div className="text-sm text-gray-700 font-semibold min-h-[1.5rem] py-2">
          {direccionDetectada ? (
            <>
              📍 {t("map.youAreHere")}{" "}
              <span className="text-blue-600">{direccionDetectada}</span>
            </>
          ) : posicionUsuario ? (
            <span className="animate-pulse text-gray-500">
              📡 {t("map.detectingLocation")}
            </span>
          ) : null}
        </div>

        <MapContainer
          className=" w-full h-[calc(100vh-9rem)] rounded-xl min-h-[300px] z-10"
          center={posicionInicialMapa}
          zoom={13}
          minZoom={6}
          maxZoom={17}
          scrollWheelZoom={true}
          maxBounds={[
            [44, -10],
            [35.5, 5],
          ]}
          maxBoundsViscosity={1.0}
          ref={(ref) => {
            if (ref && !mapRef.current) {
              mapRef.current = ref;
            }
          }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            noWrap={true}
          />
          {mostrarParkings &&
            zonasParking.map((zona) => (
              <Rectangle
                key={zona.id}
                bounds={zona.bounds}
                pathOptions={{ color: "green", weight: 2, fillOpacity: 0.2 }}
                eventHandlers={{
                  click: () => {
                    setParkingSeleccionado(zona);
                    setVehiculoSeleccionado(null);
                    setMostrarTarjeta(false);
                    setTimeout(() => setMostrarTarjeta(true), 500);
                  },
                }}
              >
                <Tooltip direction="top" offset={[0, 10]} opacity={1}>
                  {zona.nombre}
                </Tooltip>
              </Rectangle>
            ))}
          {mostrarParkings &&
            zonasParking.map((zona) => (
              <Marker
                key={`marker-${zona.id}`}
                position={[
                  (zona.bounds[0][0] + zona.bounds[1][0]) / 2,
                  (zona.bounds[0][1] + zona.bounds[1][1]) / 2,
                ]}
                icon={crearIconoParking(parkingSeleccionado?.id === zona.id)}
                eventHandlers={{
                  click: () => {
                    setParkingSeleccionado(zona);
                    setVehiculoSeleccionado(null);
                    setMostrarTarjeta(false);
                    setTimeout(() => setMostrarTarjeta(true), 500);

                    if (mapRef.current) {
                      mapRef.current.fitBounds(zona.bounds, {
                        padding: [40, 40],
                        duration: 1.5,
                      });
                    }
                  },
                }}
              />
            ))}

          <MarkerClusterGroup
            chunkedLoading
            spiderfyOnMaxZoom
            zoomToBoundsOnClick
            showCoverageOnHover={false}
            iconCreateFunction={(cluster: MarkerCluster) => {
              const count = cluster.getChildCount();
              return L.divIcon({
                html: `
                  <div style="position: relative; display: flex; align-items: center; justify-content: center;">
                    <div style="position: absolute; top: -20px; background: #3b82f6; color: white; font-size: 13px; font-weight: bold; padding: 2px 6px; border-radius: 20px; box-shadow: 0 1px 4px rgba(0,0,0,0.4);">${count}</div>
                    <svg width="40" height="45" viewBox="0 0 40 45" xmlns="http://www.w3.org/2000/svg">
                      <g transform="translate(0,0)">
                        <path d="M20 0C9 0 0 9 0 20c0 11 10 21 20 25 10-4 20-14 20-25C40 9 31 0 20 0z" fill="#3b82f6" />
                        <circle cx="20" cy="20" r="15" fill="white"/>
                        <path d="M13 25v-2l1-4c.2-1 1-2 2-2h8c1 0 2 .7 2 2l1 4v2h-1a1 1 0 1 1-2 0h-8a1 1 0 1 1-2 0h-1zm3-6h8l-.5-2h-7l-.5 2z" fill="#3b82f6" />
                      </g>
                    </svg>
                  </div>
                `,
                className: "",
                iconSize: [40, 45],
                iconAnchor: [20, 45],
              });
            }}
          >
            {vehiculosFiltrados.map((vehiculo) => (
              <Marker
                key={vehiculo.id}
                position={[vehiculo.latitud, vehiculo.longitud]}
                icon={crearIconoCoche(
                  Number(vehiculoSeleccionado?.id) === vehiculo.id
                )}
                eventHandlers={{
                  click: () =>
                    handleClickVehiculo(vehiculo.id, [
                      vehiculo.latitud,
                      vehiculo.longitud,
                    ]),
                }}
              />
            ))}
          </MarkerClusterGroup>

          {mostrarUbicacionUsuario && posicionUsuario && (
            <Marker
              position={posicionUsuario}
              icon={L.divIcon({
                className: "",
                html: `
                  <div style="transform: translate(-50%, -50%);">
                    <svg width="24" height="24" fill="#10b981" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="12" cy="12" r="10" fill="#10b981" />
                      <circle cx="12" cy="12" r="4" fill="white" />
                    </svg>
                  </div>
                `,
                iconSize: [24, 24],
                iconAnchor: [12, 12],
              })}
            />
          )}
        </MapContainer>

        {mostrarTarjeta && vehiculoSeleccionado && (
          <div className="fixed bottom-6 left-8 bg-white p-4 rounded-xl shadow-xl w-80 animate-fadein z-[11]">
            <button
              onClick={() => {
                setVehiculoSeleccionado(null);
                setMostrarTarjeta(false);
                volverAVistaCiudad();
              }}
              className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-lg"
            >
              ✕
            </button>
            {vehiculoSeleccionado.imagen && (
              <img
                src={vehiculoSeleccionado.imagen}
                alt={`${vehiculoSeleccionado.marca} ${vehiculoSeleccionado.modelo}`}
                className="w-full h-36 object-cover rounded mb-4"
              />
            )}
            <h2 className="text-xl font-bold mb-1">
              {vehiculoSeleccionado.marca} {vehiculoSeleccionado.modelo}
            </h2>
            <p className="text-sm text-gray-500 mb-2">
              🔋 {vehiculoSeleccionado.autonomia} km · 📅{" "}
              {t("map.lastRevision")}: {vehiculoSeleccionado.ultimaRevision}
            </p>
            <div className="border-t border-gray-200 pt-2 text-sm">
              <p className="text-gray-600">
                🚗 {t("map.status")}: {vehiculoSeleccionado.estado}
              </p>
              <p className="text-gray-600">
                📍 Lat: {vehiculoSeleccionado.latitud}, Lng:{" "}
                {vehiculoSeleccionado.longitud}
              </p>
            </div>
            <button className="mt-4 w-full bg-green-600 text-white font-bold py-2 rounded hover:bg-green-700 transition">
              {t("map.moreDetails")}
            </button>
          </div>
        )}

        {mostrarTarjeta && parkingSeleccionado && (
          <div className="fixed bottom-6 left-8 bg-white p-4 rounded-xl shadow-xl w-80 animate-fadein z-[11]">
            <button
              onClick={() => {
                setParkingSeleccionado(null);
                setMostrarTarjeta(false);
              }}
              className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-lg"
            >
              ✕
            </button>
            <img
              src={parkingSeleccionado.foto}
              alt={parkingSeleccionado.nombre}
              className="w-full h-36 object-cover rounded mb-4"
            />
            <h2 className="text-xl font-bold mb-1">
              {parkingSeleccionado.nombre}
            </h2>
            <p className="text-sm text-gray-500 mb-2">
              🅿️ {t("map.parkingZone")}
            </p>
            <div className="border-t border-gray-200 pt-2 text-sm">
              <p className="text-gray-600">📍 {t("map.sampleAddress")}</p>
            </div>
            <button className="mt-4 w-full bg-blue-500 text-white font-bold py-2 rounded hover:bg-blue-600 transition">
              {t("map.viewNearby")}
            </button>
          </div>
        )}
      </div>

      <div className="w-full lg:w-1/4  p-4 h-fit top-4">
        <FiltrersCatalogComponent
          vehiculos={{
            content: vehiculos,
            totalPages: 1,
            totalElements: vehiculos.length,
            numberOfElements: vehiculos.length,
            size: vehiculos.length,
            number: 0,
            first: true,
            last: true,
            empty: vehiculos.length === 0,
            sort: { empty: true, sorted: false, unsorted: true },
            pageable: {
              sort: { empty: true, sorted: false, unsorted: true },
              offset: 0,
              pageNumber: 0,
              pageSize: vehiculos.length,
              unpaged: true,
              paged: false,
            },
          }}
          onFilterChange={actualizarFiltro}
          vertical={true}
          onSubmit={() => console.log()}
          filtros={filtrosActivos}
        />
        <div className="p-10 space-y-6r">
          <ParkingFilterComponent
            mostrar={mostrarParkings}
            onToggle={() => setMostrarParkings(!mostrarParkings)}
          />
          <div className="mt-4">
            <LegendComponent />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CochesMapComponent;
