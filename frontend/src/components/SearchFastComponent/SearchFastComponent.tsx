import { useEffect, useState, type FC, type ReactElement } from "react";
import { SearchFast } from "../../interfaces/SearchFast";
import type { HomePageProps } from "../../interfaces/HomePageProps";
import { httpGet } from "../../utils/apiService";
import { useTranslation } from "react-i18next";
import { useRef } from "react";

export const SearchFastComponent: FC<HomePageProps> = ({
  onClickOptionsPerfil,
  onLoginClick,
}): ReactElement => {
  const { t } = useTranslation();
  const [optionsSelected, setOptionsSelected] = useState<Array<string>>([
    t("search.types.turismos"),
  ]);
  const searchFast: SearchFast = SearchFast();
  const [location, setLocation] = useState<string>("");
  const [optionsLocation, setOptionsLocation] = useState<Array<string>>([]);
  const [mostrarDesplegable, setMostrarDesplegable] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      const data = await httpGet<Array<string>>("/vehiculos/localidades");
      if (data) {
        setOptionsLocation(data);
      }
    };
    fetch();
  }, []);

  const tipos = [
    { label: t("search.types.turismos"), icon: "/turismo.png" },
    { label: t("search.types.suv"), icon: "/suv.png" },
    { label: t("search.types.monovolumen"), icon: "/monovolumen.png" },
    { label: t("search.types.microcoche"), icon: "/MicroCoche.webp" },
  ];

  const addOrDeleteOption = (carType: string) => {
    setOptionsSelected((prevOptions) => {
      if (prevOptions.includes(carType)) {
        return prevOptions.filter((option) => option !== carType);
      } else {
        return [...prevOptions, carType];
      }
    });
  };

  const onClickOutEmergent = () => {
    onLoginClick();
    onClickOptionsPerfil();
  };

  const onSubmit = () => {
    searchFast.types = optionsSelected;
    searchFast.locate = location;
  };

  const manejarSeleccionUbicacion = (ubicacion: string) => {
    setLocation(ubicacion);
    setMostrarDesplegable(false);
  };


  const botonRef = useRef<HTMLButtonElement | null>(null);

  const manejarClickUbicacion = () => {
    detectarUbicacion();

    // Reiniciar animación
    if (botonRef.current) {
      botonRef.current.classList.remove("pulse-click");
      void botonRef.current.offsetWidth; // Forzar reflow
      botonRef.current.classList.add("pulse-click");
    }
  };

  const detectarUbicacion = () => {
    if (!navigator.geolocation) {
      alert(t("search.errors.geolocationNotSupported"));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;

        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
          );
          const data = await response.json();
          const direccionCompleta = data.display_name || "";
          if (direccionCompleta) setLocation(direccionCompleta);
        } catch (err) {
          console.error("Error al obtener la dirección:", err);
        }
      },
      (err) => {
        alert(t("search.errors.locationPermissionDenied"));
        console.error("Error obteniendo ubicación:", err);
      }
    );
  };
  // const detectarUbicacion = () => {
  //   if (!navigator.geolocation) {
  //     alert(t("search.errors.geolocationNotSupported"));
  //     return;
  //   }

  //   navigator.geolocation.getCurrentPosition(
  //     async (pos) => {
  //       const { latitude, longitude } = pos.coords;

  //       try {
  //         const response = await fetch(
  //           `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
  //         );
  //         const data = await response.json();
  //         const ciudad =
  //           data.address?.city ||
  //           data.address?.town ||
  //           data.address?.village ||
  //           "";
  //         if (ciudad) setLocation(ciudad);
  //       } catch (err) {
  //         console.error("Error al obtener ciudad:", err);
  //       }
  //     },
  //     (err) => {
  //       alert(t("search.errors.locationPermissionDenied"));
  //       console.error("Error obteniendo ubicación:", err);
  //     }
  //   );
  // };

  return (
    <div
      className="flex items-center justify-center px-4 py-12 min-h-[calc(100vh-300px)]"
      onClick={onClickOutEmergent}
    >
      <div className="w-full max-w-screen-lg text-white text-center space-y-8">
        <h1 className="text-4xl font-bold text-[#C4B5FD]">
          {t("search.title")}
        </h1>

        <div className="flex flex-wrap justify-center gap-3">
          {tipos.map(({ label, icon }) => (
            <button
              key={label}
              onClick={() => addOrDeleteOption(label)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all border ${optionsSelected.includes(label)
                ? "bg-[#A7F3D0] text-[#111827] border-transparent shadow-md"
                : "bg-transparent border-gray-500 hover:bg-[#374151]"
                }`}
            >
              <img src={icon} alt={label} className="w-6 h-6" />
              <span className="text-sm font-medium">{label}</span>
            </button>
          ))}
        </div>

        <div className="relative inline-block w-full max-w-2xl mx-auto">
          <div className="flex items-center w-full max-w-2xl mx-auto">
            <button
              ref={botonRef}
              onClick={manejarClickUbicacion}
              className="w-6.5 h-5.5 flex items-center justify-center mr-2 rounded-full border border-black bg-red-600 hover:bg-red-900 text-white font-bold transition-all"
              title={t("search.useCurrentLocation")}
            >
            </button>

            <div className="flex items-center border border-gray-600 bg-[#1F2937] rounded-l-full px-4 py-3 w-full">

              <svg
                className="w-5 h-5 text-gray-400 mr-2"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M21 21l-4.35-4.35M10 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16z" />
              </svg>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                onFocus={() => setMostrarDesplegable(true)}
                onBlur={() => setTimeout(() => setMostrarDesplegable(false), 100)}
                placeholder={t("search.placeholder")}
                className="bg-transparent text-white w-full focus:outline-none placeholder-gray-400"
              />
            </div>

            <button
              onClick={onSubmit}
              className="bg-white/80 text-gray-900 font-semibold px-6 py-3 rounded-r-full shadow-sm hover:bg-white transition duration-200 backdrop-blur-md border-t border-b border-r border-gray-600"
            >
              {t("search.button")}
            </button>
          </div>

          {mostrarDesplegable && (
            <ul className="absolute left-0 mt-1 w-full max-h-60 overflow-y-auto rounded-lg bg-[#1F2937] border border-gray-600 shadow-xl backdrop-blur-sm ring-1 ring-black/10 z-20">
              {optionsLocation.map((ubicacion) => (
                <li
                  key={ubicacion}
                  onClick={() => manejarSeleccionUbicacion(ubicacion)}
                  className="px-4 py-2 text-sm text-gray-100 hover:bg-[#4B5563] hover:text-white cursor-pointer transition-colors duration-150 rounded-md mx-1 my-1 whitespace-nowrap overflow-hidden text-ellipsis"
                  title={ubicacion}
                >
                  {ubicacion}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};
