import type { PageProps } from "./PageProps";
import type { Vehiculo } from "./Vehiculo";

export interface ProductosCatalogProps {
    vehiculos: PageProps<Vehiculo>;
}