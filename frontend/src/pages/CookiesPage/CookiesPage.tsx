import React from "react";
import { useTranslation } from "react-i18next";

const CookiesPage: React.FC = () => {
    const { t } = useTranslation();

    return (
        <main className="p-6 max-w-3xl mx-auto text-justify text-sm leading-relaxed">
            <h1 className="text-3xl font-bold mb-4 text-center">
                {t("cookies.titulo")}
            </h1>

            <p>{t("cookies.intro")}</p>

            <h2 className="text-xl font-semibold mt-6 mb-2">{t("cookies.queSon")}</h2>
            <p>{t("cookies.queSonTexto")}</p>

            <h2 className="text-xl font-semibold mt-6 mb-2">{t("cookies.tipos")}</h2>
            <ul className="list-disc pl-6">
                <li>{t("cookies.tipoTecnicas")}</li>
                <li>{t("cookies.tipoAnalisis")}</li>
                <li>{t("cookies.tipoPersonalizacion")}</li>
            </ul>

            <h2 className="text-xl font-semibold mt-6 mb-2">
                {t("cookies.comoDesactivar")}
            </h2>
            <p>{t("cookies.comoDesactivarTexto")}</p>

            <h2 className="text-xl font-semibold mt-6 mb-2">
                {t("cookies.consentimiento")}
            </h2>
            <p>{t("cookies.consentimientoTexto")}</p>

            <p className="mt-6 text-center text-gray-500 text-xs">
                {t("cookies.ultimaActualizacion")}
            </p>
        </main>
    );
};

export default CookiesPage;
