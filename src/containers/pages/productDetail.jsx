import { connect } from "react-redux";
import Layout from "../../hocs/Layout";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import {
  get_product,
  get_related_products,
  downloadPDF, // Importamos la acción
} from "../../redux/actions/products";

const ProductDetail = ({
  get_product,
  get_related_products,
  product,
}) => {
  const navigate = useNavigate();
  const { productId } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
    get_product(productId);
    get_related_products(productId);
  }, [productId]);

  return (
    <Layout>
      <div className="bg-white">
        <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
            {/* Product Image */}
            <img
              src={product && product.photo}
              alt={product && product.name}
              className="rounded-lg"
            />

            {/* Product info */}
            <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
              <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
                {product && product.name}
              </h1>

              <div className="mt-6">
                <div
                  className="text-base text-gray-700 space-y-6"
                  dangerouslySetInnerHTML={{
                    __html: product && product.description,
                  }}
                />
              </div>

              {/* Botón para descargar el PDF */}
              <div className="mt-4">
                <button
                  onClick={() => downloadPDF(productId)} // Llamamos a la acción
                  className="max-w-xs flex-1 bg-yellow-500 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-yellow-600 focus:outline-none"
                >
                  Descargar Información en PDF
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

const mapStateToProps = (state) => ({
  product: state.Products.product,
});

export default connect(mapStateToProps, {
  get_product,
  get_related_products,
  downloadPDF, // Conectamos la acción
})(ProductDetail);
