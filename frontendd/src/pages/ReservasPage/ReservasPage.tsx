import { type FC, type ReactElement, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { httpGetTok } from "../../utils/apiService";
import type { Reserva } from "../../interfaces/ReservaProps";
import { FondoPanelComponent } from "../../components/FondoPanelComponent/FondoPanelComponent";
import { TituloComponent } from "../../components/PanelComonent/TituloComponent";

export const mockReservas = [
    {
        id: "res1",
        vehiculo: "Toyota Corolla 2022",
        fechaInicio: "2025-06-01T10:00:00Z",
        fechaFin: "2025-06-05T10:00:00Z",
        estado: "activa",
    },
    {
        id: "res2",
        vehiculo: "Volkswagen Golf GTI",
        fechaInicio: "2025-05-15T09:00:00Z",
        fechaFin: "2025-05-18T18:00:00Z",
        estado: "finalizada",
    },
    {
        id: "res3",
        vehiculo: "Tesla Model 3",
        fechaInicio: "2025-07-10T12:00:00Z",
        fechaFin: "2025-07-15T12:00:00Z",
        estado: "pendiente",
    },
    {
        id: "res4",
        vehiculo: "BMW X5 Híbrido",
        fechaInicio: "2025-06-20T08:30:00Z",
        fechaFin: "2025-06-25T17:00:00Z",
        estado: "cancelada",
    },
];


export const ReservasPage: FC = (): ReactElement => {
    const [reservas, setReservas] = useState<Reserva[]>([]);
    const navigate = useNavigate();

    //   useEffect(() => {
    //     const fetchReservas = async () => {
    //       try {
    //         const data = await httpGetTok<Reserva[]>("/reservas/mis-reservas");
    //         if (data) setReservas(data);
    //       } catch (error) {
    //         console.error("Error al cargar reservas:", error);
    //       }
    //     };

    //     fetchReservas();
    //   }, []);

    useEffect(() => {
        setReservas(mockReservas);
    }, []);


    return (
        <FondoPanelComponent>
            <div className="relative min-h-screen  p-8 text-white">
            <TituloComponent titulo={"Mis Reservas"} />

                <div className="max-w-4xl mx-auto w-full mt-20">

                    {reservas.length === 0 ? (
                        <p className="text-gray-400">No tienes reservas activas.</p>
                    ) : (
                        <div className="space-y-4">
                            {reservas.map((reserva) => (
                                <div
                                    key={reserva.id}
                                    className="bg-white/5 backdrop-blur-md rounded-3xl p-4 shadow-md border border-white/10 cursor-pointer transition-transform duration-200 ease-in-out hover:scale-[1.02] active:scale-95"
                                    onClick={() => navigate(`/panel/reservas/${reserva.id}`)}
                                >
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <h2 className="text-lg font-semibold">{reserva.vehiculo}</h2>
                                            <p className="text-sm text-gray-400">
                                                Fecha Reserva:{" "}
                                                {new Date(reserva.fechaInicio).toLocaleDateString()}
                                            </p>
                                            <p
                                                className={`mt-1 text-sm font-medium ${reserva.estado === "activa"
                                                    ? "text-green-400"
                                                    : reserva.estado === "finalizada"
                                                        ? "text-gray-400"
                                                        : reserva.estado === "cancelada"
                                                            ? "text-red-400"
                                                            : "text-yellow-400"
                                                    }`}
                                            >
                                                Estado: {reserva.estado}
                                            </p>
                                        </div>
                                        {/* <button
                                            className="bg-[#10B981] hover:bg-[#059669] text-white px-4 py-2 rounded-lg text-sm font-semibold"
                                        >
                                            Ver detalle
                                        </button> */}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </FondoPanelComponent>
    );
};
