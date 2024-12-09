import { Link } from "react-router-dom";
import { PiSpinner } from "react-icons/pi";
import ProductCard from "./ProductCard"; // Asegúrate de importar el componente ProductCard

export default function ProductsSold({ data }) {
  return (
    <div className="bg-white w-screen">
      <div className="w-full mx-auto py-16 px-4 sm:py-16 sm:px-6 lg:max-w-7xl lg:px-8 flex flex-col justify-center items-center">
        <div className="px-12">
          <h2 className="text-[30px] text-center font-bold tracking-tight text-gray-900">Lo más popular</h2>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8 relative">
          {data ? (
            data.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <div className="absolute overflow-hidden left-1/2 -translate-x-1/2 top-0 text-black">
              <PiSpinner className="text-2xl animate-spin" />
            </div>
          )}
        </div>

        <Link to="/shop" className="mt-12 bg-gray-800 text-white py-4 px-12 rounded-full hover:bg-gray-600 duration-300">
          Ver más
        </Link>
      </div>
    </div>
  );
}
