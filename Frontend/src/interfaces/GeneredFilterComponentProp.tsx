import type { FiltroVehiculo } from "./Vehiculo";

export interface FilterOption {
    label: string;
    value: string;
}


export type FilterCategory = {
    label: string;
    name: FiltroVehiculo;
    options: FilterOption[];
}


export interface FiltersProps {
    index: number;
    filter: FilterCategory;
    onFilterChange: (clave: FiltroVehiculo, valor: string | number | boolean) => void;
    valorActual?: string | number | boolean;
}
