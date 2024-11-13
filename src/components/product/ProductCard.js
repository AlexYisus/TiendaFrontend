import { Link } from "react-router-dom"
import { FiShoppingCart } from "react-icons/fi";

const ProductCard = ({ product }) => {
  return (
    <div key={product.id} className="group relative m-2 border border-black/10 rounded-lg overflow-hidden hover:shadow-md duration-300">
      <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none duration-300">
        <img
          src={process.env.REACT_APP_API_URL + product.photo}
          alt=""
          className="w-full h-full object-center object-cover lg:w-full lg:h-full group-hover:scale-105 duration-300"
        />
      </div>
      <div className="flex flex-col justify-center items-center border-t border-black/10 py-4 px-6">
        <div>
          <h3 className="text-base font-semibold text-gray-900">
            <Link to={`/product/${product.id}`}>
              <span aria-hidden="true" className="absolute inset-0" />
              {product.name}
            </Link>
          </h3>
        </div>
        <p className="text-sm font-medium text-gray-700">${/*product.price*/}</p>
        <button className="mt-4 rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white bg-gray-800 group-hover:bg-gray-700 duration-300"><FiShoppingCart className="mr-2" /> Añadir al carrito</button>
      </div>
    </div>
  )
}

export default ProductCard