import { type FC } from "react";
import type { CardProductProps } from "../../interfaces/CardProductProps";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export const CardcocheComponent: FC<CardProductProps> = ({ coche, index }) => {
  const { t } = useTranslation();

  return (
    <Link to="/catalog/carDetail" state={coche.id} key={index}>
      <div className="bg-[#1F2937] shadow-lg rounded-2xl p-4 w-full max-w-sm">
        {coche.imagen ? (
          <img
            src={coche.imagen}
            alt={`${coche.marca} ${coche.modelo}`}
            className="w-full h-40 object-cover rounded-xl mb-4"
          />
        ) : (
          <div className="w-full h-40 bg-gray-700 rounded-xl mb-4 flex items-center justify-center text-gray-400">
            {t("card.sinImagen")}
          </div>
        )}
        <h2 className="text-xl font-bold mb-1 text-[#C4B5FD]">
          {coche.marca} {coche.modelo}
        </h2>
        <p className="text-gray-300 mb-1">
          {t("card.ciudad")}:{" "}
          <span className="font-semibold text-white">{coche.localidad}</span>
        </p>
        <p className="text-gray-300 mb-1">
          {t("card.autonomia")}:{" "}
          <span className="font-semibold text-white">{coche.autonomia} km</span>
        </p>
      </div>
    </Link>
  );
};
