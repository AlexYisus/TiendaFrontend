import { Link } from "react-router-dom"
import { PiSpinner } from "react-icons/pi";
import { FiShoppingCart } from "react-icons/fi";

export default function ProductsSold({
  data
}) {
  return (
    <div className="bg-white w-screen">
      <div className="w-full mx-auto py-16 px-4 sm:py-16 sm:px-6 lg:max-w-7xl lg:px-8 flex flex-col justify-center items-center">
        <div className="mt-12 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8 relative">
          {data ?
            data !== null &&
            data !== undefined &&
            data.map((product) => (
              <div key={product.id} className="group relative border border-black/10 overflow-hidden rounded-lg hover:shadow-md duration-300">
                <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 overflow-hidden group-hover:opacity-75 duration-300 lg:h-80 lg:aspect-none">
                  <img
                    src={process.env.REACT_APP_API_URL + product.get_thumbnail}
                    alt=""
                    className="w-full h-full object-center object-cover lg:w-full lg:h-full group-hover:scale-105 duration-300"
                  />
                </div>
                <div className="px-4 py-6 flex flex-col justify-center items-start border-t border-black/10 ">
                  <div>
                    <h3 className="text-lg text-black font-semibold">
                      <Link to={``}>
                        <span aria-hidden="true" className="absolute inset-0" />
                        {product.name}
                      </Link>
                    </h3>
                  </div>
                  <p className="text-xl font-bold text-[#ca8a04]">{/*product.price*/}</p>
                  <button className="mt-4 rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white bg-gray-800 group-hover:bg-gray-700 duration-300 w-full"><FiShoppingCart className="mr-2" /> Visualizar Catálogo</button>
                </div>
              </div>
            )) : (
              <>
                <div className="absolute overflow-hidden left-1/2 -translate-x-1/2 top-0 text-black">
                  <PiSpinner className="text-2xl animate-spin" />
                </div>
              </>
            )
          }
        </div>
      </div>
    </div>
  )
}