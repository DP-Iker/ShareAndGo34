import { useTranslation } from "react-i18next";
import type { FC } from "react";
import { GeneredFilterComponent } from "../GeneredFilterComponent/GeneredFilterComponent";
import type {
    FilterCategory,
    FilterOption,
} from "../../interfaces/GeneredFilterComponentProp";
import type { Vehiculo } from "../../interfaces/Vehiculo";
import type { FiltrersCatalogProps } from "../../interfaces/FiltrersCatalogProps";

export const FiltrersCatalogComponent: FC<FiltrersCatalogProps> = ({
    onFilterChange,
    vehiculos,
    vertical,
    onSubmit,
    filtros,
}) => {
    const { t } = useTranslation();

    const filtrosDinamicos = (vehiculos: Vehiculo[]): FilterCategory[] => [
        {
            label: t("catalog.filters.brand"),
            name: "marca",
            options: obtenerOpcionesUnicas(vehiculos, "marca"),
        },
        {
            label: t("catalog.filters.model"),
            name: "modelo",
            options: obtenerOpcionesUnicas(vehiculos, "modelo"),
        },
        {
            label: t("catalog.filters.type"),
            name: "tipo",
            options: obtenerOpcionesUnicas(vehiculos, "tipo"),
        },
        {
            label: t("catalog.filters.status"),
            name: "estado",
            options: obtenerOpcionesUnicas(vehiculos, "estado"),
        },
        {
            label: t("catalog.filters.location"),
            name: "localidad",
            options: obtenerOpcionesUnicas(vehiculos, "localidad"),
        },
        {
            label: t("catalog.filters.accessibility"),
            name: "esAccesible",
            options: [
                { label: t("catalog.filters.yes"), value: "true" },
                { label: t("catalog.filters.no"), value: "false" },
            ],
        },
    ];

    const filtrosDinamicosVertical = (vehiculos: Vehiculo[]): FilterCategory[] => [
        {
            label: t("catalog.filters.type"),
            name: "tipo",
            options: obtenerOpcionesUnicas(vehiculos, "tipo"),
        },
        {
            label: t("catalog.filters.status"),
            name: "estado",
            options: obtenerOpcionesUnicas(vehiculos, "estado"),
        },
        {
            label: t("catalog.filters.location"),
            name: "localidad",
            options: obtenerOpcionesUnicas(vehiculos, "localidad"),
        },
    ];

    function obtenerOpcionesUnicas<T>(data: T[], campo: keyof T): FilterOption[] {
        const valores = data.map((v) => String(v[campo]));
        const unicos = Array.from(new Set(valores));
        return unicos.map((valor) => ({
            label: valor,
            value: valor,
        }));
    }

    const categorias: FilterCategory[] = vertical
        ? filtrosDinamicosVertical(vehiculos.content)
        : filtrosDinamicos(vehiculos.content);

    return (
        <div className="p-6 space-y-6">
            <div className="p-10 space-y-6">
                <div className={vertical ? "flex flex-col gap-6 items-start" : "flex flex-wrap gap-6 justify-center"}>
                    <div className="flex flex-wrap gap-4">
                        {categorias.map((filter, index) => (
                            <GeneredFilterComponent
                                key={index}
                                index={index}
                                filter={filter}
                                onFilterChange={onFilterChange}
                                valorActual={filtros[filter.name]}
                            />
                        ))}
                    </div>

                    {!vertical && (
                        <div className="flex items-end">
                            <button
                                onClick={onSubmit}
                                className="mb-1 h-8 px-4 bg-white/80 text-gray-900 text-sm font-medium rounded-full shadow-sm hover:bg-white transition duration-200"
                            >
                                {t("catalog.filters.search")}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
