import type { FC } from "react";
import { useNavigate } from "react-router-dom";

export const NoticiasComponent: FC = () => {
  const noticiasMock = [
    {
      id: 1,
      titulo: "Coche compartido",
      imagen: "./parking_layout_img.png",
      descripcion: "El uso del car sharing crece un 25% en ciudades españolas.",
    },
    {
      id: 2,
      titulo: "Movilidad sostenible",
      imagen: "./parking_layout_img.png",
      descripcion: "Barcelona amplía su flota de vehículos eléctricos compartidos.",
    },
    {
      id: 3,
      titulo: "Tecnología",
      imagen: "./parking_layout_img.png",
      descripcion: "Nueva app de car sharing con reservas instantáneas y GPS mejorado.",
    },
    {
      id: 4,
      titulo: "Economía",
      imagen: "./parking_layout_img.png",
      descripcion: "Los usuarios ahorran hasta 200€ al mes usando coches compartidos.",
    },
    {
      id: 5,
      titulo: "Sostenibilidad",
      imagen: "./parking_layout_img.png",
      descripcion: "El car sharing reduce 1 tonelada de CO₂ por usuario al año.",
    }
  ];
  const navigate = useNavigate();
  const verNoticia = (noticia: typeof noticiasMock[0]) => {
    navigate("/noticia", { state: noticia });
  };
  return (
    <div className="px-4">
      <div className="flex justify-center items-center gap-4 flex-wrap">
        {noticiasMock.map((item) => (
          <div
            key={item.id}
            onClick={() => verNoticia(item)}
            className="cursor-pointer w-48 flex-shrink-0 bg-gray-100 rounded-lg p-4 text-center shadow hover:shadow-md transition"
          >
            <img
              src={item.imagen}
              alt={item.titulo}
              className="w-full h-24 object-cover rounded mb-2"
            />
            <p className="text-sm font-semibold text-gray-700">{item.titulo}</p>
            <p className="text-xs text-gray-500">{item.descripcion}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
