import type { FC } from "react";
import { useNavigate } from "react-router-dom";
import type { VolverProps } from "../../interfaces/PanelProps";
import { useTranslation } from "react-i18next"; // 🟣 i18n

export const VolverComonent: FC<VolverProps> = ({ url }) => {
    const navigate = useNavigate();
    const { t } = useTranslation(); // 🟣 hook de traducción

    return (
        <button
            type="button"
            onClick={() => navigate(url)}
            className="text-purple-400 hover:text-purple-300 text-lg flex items-center gap-1 cursor-pointer"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            {t("volver.boton")} {/* 🔁 Texto traducido */}
        </button>
    );
};
