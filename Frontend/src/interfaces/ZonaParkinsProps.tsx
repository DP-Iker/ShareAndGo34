// src/interfaces/ZonaParkinsProps.tsx
import type { LatLngTuple } from "leaflet";

export interface ZonaParking {
    id: number;
    nombre: string;
    foto: string;
    bounds: [LatLngTuple, LatLngTuple];
}
