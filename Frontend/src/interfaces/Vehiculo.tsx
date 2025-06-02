export interface DatosVehiculo {
  id: number;
  marca: string;
  modelo: string;
  imagen: string | null;
  kilometraje: number;
  ultimaRevision: string;
  autonomia: number;
  estado: string;
  latitud: number;
  longitud: number;
}

export interface UbicacionVehiculo {
  id: number;
  latitud: number;
  longitud: number;
}

export interface Vehiculo {
  id: number;
  marca: string;
  modelo: string;
  imagen: string | null;
  kilometraje: number;
  ultimaRevision: string;
  autonomia: number;
  estado: "DISPONIBLE" | "EN_USO" | "RESERVADO" | "EN_MANTENIMIENTO";
  latitud: number;
  longitud: number;
  localidad: string;
  puertas: "TRES" | "CINCO";
  tipo: "TURISMO" | "SUV" | "BIPLAZA" | "MONOVOLUMEN";
  esAccesible: boolean;
}

export const Vehiculo: Vehiculo = {
  id: 0,
  marca: "",
  modelo: "",
  imagen: "",
  kilometraje: 0,
  ultimaRevision: "",
  autonomia: 0,
  estado: "DISPONIBLE",
  latitud: 0,
  longitud: 0,
  localidad: "",
  puertas: "CINCO",
  tipo: "TURISMO",
  esAccesible: false,
};

export type FiltroVehiculo =
  | "marca"
  | "modelo"
  | "estado"
  | "localidad"
  | "esAccesible"
  | "autonomiaMin"
  | "autonomiaMax"
  | "tipo";
