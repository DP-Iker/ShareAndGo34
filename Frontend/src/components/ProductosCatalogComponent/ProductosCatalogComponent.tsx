import { type FC } from "react";
import { CardcocheComponent } from "../CardProductComponent/CardProductComponent";
import type { ProductosCatalogProps } from "../../interfaces/ProductosCatalogProps";

export const ProductosCatalogComponent: FC<ProductosCatalogProps> = ({
  vehiculos,
}) => {
  return (
    // <>
    //   <div className="flex justify-between items-center mb-2">
    //     <p className="text-sm text-gray-800 font-medium">
    //       {vehiculos.totalElements} Products
    //     </p>
    //     <p className="text-sm text-gray-700 hover:underline cursor-pointer">
    //       Cambiar vista
    //     </p>
    //   </div>

    //   <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
    //     {vehiculos.content.map((product, index) => (
    //       // product.estado == "DISPONIBLE" && (
    //       <Link to="/catalog/carDetail" state={product} key={index}>
    //         <CardcocheComponent
    //           key={index}
    //           coche={product}
    //           index={index}
    //         />
    //       </Link>
    //       // )
    //     ))}
    //   </div>
    // </>

    <>
      <div className="flex justify-between items-center mb-4 px-4">
        <p className="text-sm text-gray-300 font-semibold">
          {vehiculos.totalElements} Products
        </p>
        <p className="text-sm text-gray-400 hover:text-white hover:underline cursor-pointer transition">
          Cambiar vista
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 px-4">
        {vehiculos.content.map((product, index) => (
          <CardcocheComponent coche={product} index={index} />
        ))}
      </div>
    </>
  );
};
