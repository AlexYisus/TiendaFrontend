import axios from "axios";
import { connect } from "react-redux";
import Layout from "../../hocs/Layout";
import { useParams, useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  get_product,
  get_related_products
} from "../../redux/actions/products";
import { useEffect, useState } from "react";
import { HeartIcon } from "@heroicons/react/outline";
import ImageGallery from "../../components/product/ImageGallery";
import {
  get_items,
  add_item,
  get_total,
  get_item_total
} from "../../redux/actions/cart";
import { PiSpinner } from "react-icons/pi";

const ProductDetail = ({
  get_product,
  get_related_products,
  product,
  get_items,
  add_item,
  get_total,
  get_item_total
}) => {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const addToCart = async () => {
    try {
      if (
        product &&
        product !== null &&
        product !== undefined &&
        product.quantity > 0
      ) {
        setLoading(true);
        await add_item(product);
        await get_items();
        await get_total();
        await get_item_total();
        setLoading(false);
        navigate("/cart");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const downloadPDF = async () => {
    if (!product || !product.id) return;

    try {
      const response = await axios.get(
        `http://localhost:8000/api/products/${product.id}/download-pdf/`,
        {
          responseType: "blob", // Manejar el archivo como un blob
        }
      );

      // Crear una URL para el archivo y disparar la descarga
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "product-info.pdf"); // Nombre del archivo
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error("Error descargando el archivo PDF:", error);
    }
  };

  const params = useParams();
  const productId = params.productId;

  useEffect(() => {
    window.scrollTo(0, 0);
    get_product(productId);
    get_related_products(productId);
  }, []);

  return (
    <Layout>
      <div className="bg-white">
        <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
          
            <ImageGallery photo={product && product.photo} />

            {/* Product info */}
            <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
              <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
                {product && product.name}
              </h1>

              <div className="mt-3">
                <h2 className="sr-only">información del producto</h2>
              </div>
              <div className="mt-6">
                <h3 className="sr-only">Descripción</h3>

                <div
                  className="text-base text-gray-700 space-y-6"
                  dangerouslySetInnerHTML={{
                    __html: product && product.description,
                  }}
                />
              </div>
              <div>

                <div className="mt-6">
                  <div className="mt-10 flex sm:flex-col1">
                     
                  </div>
                  {/* Botón para descargar el PDF */}
                  <div className="mt-4">
                    <button
                      onClick={downloadPDF}
                      className="max-w-xs flex-1 bg-[#f59e0b] border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-[#d97706] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-yellow-500 sm:w-full"
                    >
                      Descargar Información en PDF
                    </button>
                  </div>
                </div>

                <section aria-labelledby="details-heading" className="mt-12">
                  <h2 id="details-heading" className="sr-only">
                    Detalles adicionales
                  </h2>
                </section>
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
  get_items,
  add_item,
  get_total,
  get_item_total,
})(ProductDetail);
