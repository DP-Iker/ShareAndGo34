import type { FC } from "react";
import { Link } from "react-router-dom";

export const CochesPromoComponent: FC = () => {

  
  const products = [
    {
      id: 1,
      name: "Ford Mustang",
      description: "Coupe, Red, 2022",
      price: 35000,
      imageUrl: "https://picsum.photos/id/133/1500/1000",
      calificaciones: [4, 5, 4, 4, 5],
      caracteristicas: ["V8 Engine", "Convertible", "Bluetooth", "Apple CarPlay", "Leather Seats"],
      reviews: [
        { comentario: "Increíble potencia y estilo.", valoracion: 5 },
        { comentario: "Muy divertido de manejar, pero consume mucha gasolina.", valoracion: 4 },
        { comentario: "Los asientos traseros son algo pequeños.", valoracion: 4 },
      ],
    },
    {
      id: 2,
      name: "Tesla Model 3",
      description: "Sedan, White, 2023",
      price: 42000,
      imageUrl: "https://picsum.photos/id/133/185/128",
      calificaciones: [5, 5, 5, 4, 5],
      caracteristicas: ["Electric", "Autopilot", "Touchscreen", "Glass Roof", "Minimalistic Interior"],
      reviews: [
        { comentario: "Tecnología de punta y gran eficiencia.", valoracion: 5 },
        { comentario: "Autopilot es genial, aunque no perfecto.", valoracion: 4 },
        { comentario: "Experiencia futurista al conducir.", valoracion: 5 },
      ],
    },
    {
      id: 3,
      name: "BMW X5",
      description: "SUV, Black, 2021",
      price: 58000,
      imageUrl: "https://picsum.photos/id/133/185/128",
      calificaciones: [4, 4, 4, 5, 5],
      caracteristicas: ["All-wheel Drive", "Luxury Interior", "Sunroof", "Heated Seats", "Apple CarPlay"],
      reviews: [
        { comentario: "Muy cómodo y elegante.", valoracion: 5 },
        { comentario: "Excelente para viajes largos.", valoracion: 4 },
      ],
    },
    {
      id: 4,
      name: "Audi A4",
      description: "Sedan, Blue, 2020",
      price: 33000,
      imageUrl: "https://picsum.photos/id/133/185/128",
      calificaciones: [4, 4, 3, 4, 4],
      caracteristicas: ["Turbocharged", "Leather Seats", "Heated Steering Wheel", "Sunroof", "Bluetooth"],
      reviews: [
        { comentario: "Buen desempeño, pero algo caro para lo que ofrece.", valoracion: 3 },
        { comentario: "Interior muy bien acabado.", valoracion: 4 },
        { comentario: "Diseño elegante y clásico.", valoracion: 4 },
      ],
    },
    
  ];
      

  return (
    <>

    {/* <div className="px-4">
        <h2 className="text-2xl font-semibold mb-4">Coches Populares</h2>
  
        <div className="flex flex-wrap justify-center gap-6">
        {products.map((product, index) => (
          <Link to="/catalog/carDetail" state={product}>
          <div
            key={index}
            className="bg-gray-50 p-4 rounded-lg shadow hover:shadow-md transition"
          >
            <div className="h-32 bg-gray-200 mb-4 rounded flex items-center justify-center">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="object-cover h-full w-full"

              />
            </div>
            
            <h3 className="font-semibold text-sm">{product.name}</h3>
            <p className="text-xs text-gray-500">{product.description}</p>
            
            <p className="mt-2 font-bold">{product.price} €</p>
          </div>
          </Link>
        ))}
        </div>
    </div> */}

<div className="px-4 py-10 ">
  <h2 className="text-2xl font-semibold mb-6" style={{ color: '#C4B5FD' }}>
    Coches Populares
  </h2>

  <div className="flex flex-wrap justify-center gap-6">
    {products.map((product, index) => (
      <Link to="/catalog/carDetail" state={product} key={index}>
        <div className="p-4 rounded-lg shadow-lg transition-shadow duration-300 w-64" style={{ backgroundColor: '#1F2937' }}>
          <div
            className="h-40 mb-4 rounded overflow-hidden flex items-center justify-center"
            style={{ backgroundColor: '#374151' }}
          >
            <img
              src={product.imageUrl}
              alt={product.name}
              className="object-cover h-full w-full hover:scale-105 transition-transform duration-300"
            />
          </div>

          <h3 className="font-semibold text-base" style={{ color: '#FBCFE8' }}>
            {product.name}
          </h3>
          <p className="text-sm text-gray-300 line-clamp-2">{product.description}</p>

          <p className="mt-2 font-bold" style={{ color: '#A7F3D0' }}>
            {product.price} €
          </p>
        </div>
      </Link>
    ))}
  </div>
</div>

    </>
  );
};
