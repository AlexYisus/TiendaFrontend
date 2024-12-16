import { FiShoppingCart } from "react-icons/fi"
import { PiSpinner } from "react-icons/pi"
import { Link } from "react-router-dom"
import img1 from '../../assets/img/img1.jpg'
import img2 from '../../assets/img/img2.jpg'
import img3 from '../../assets/img/img3.jpg'
import img4 from '../../assets/img/logo-ef.png'
import { Carousel } from 'react-responsive-carousel'; // Importa el carrusel
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Importa los estilos del carrusel

export default function ProductsArrival({
  data
}) {
  return (
    <div className="bg-white w-screen pt-12">
      <div className="w-full mx-auto pt-16 px-4 lg:max-w-7xl lg:px-8 flex flex-col justify-center items-center">
            
        <h2 className="text-[30px] font-bold tracking-tight text-gray-900">Catálogos de nuestros productos</h2>

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
                      <Link to={`product/`}>
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

        <Link to="/" className="mt-12 bg-gray-800 text-white py-4 px-12 rounded-full hover:bg-gray-600 duration-300">Ver más</Link>
      </div>
    </div>
  )
}