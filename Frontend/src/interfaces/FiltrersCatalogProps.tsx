import type { PageProps } from "./PageProps";
import type { FiltroVehiculo, Vehiculo } from "./Vehiculo";

export interface FiltrersCatalogProps {
  onFilterChange: (
    clave: FiltroVehiculo,
    valor: string | number | boolean
  ) => void;
  vehiculos: PageProps<Vehiculo>;
  vertical: boolean;
  onSubmit: () => void;
  filtros: Partial<Record<FiltroVehiculo, string | number | boolean>>;
}
