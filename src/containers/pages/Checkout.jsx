{/*import Layout from "../../hocs/Layout";
import { Navigate } from "react-router-dom";
import { connect } from "react-redux";
import CartItem from '../../components/cart/CartItem'
import { update_item, remove_item } from '../../redux/actions/cart'
import { useEffect, useState } from 'react'
import { get_shipping_options } from '../../redux/actions/shipping'
import Shipping from "../../redux/reducers/shipping";
import { Link } from "react-router-dom";
import {
  refresh
} from '../../redux/actions/auth';

import {
  get_payment_total,
  get_client_token,
  process_payment
} from '../../redux/actions/payment';
import { countries } from '../../helpers/fixedCountries'
import DropIn from 'braintree-web-drop-in-react';
import ShippingForm from '../../components/checkout/ShippingForm'
import { PiSpinner } from "react-icons/pi";
import { FaCircleXmark } from "react-icons/fa6";
import { MdErrorOutline } from "react-icons/md";

const Checkout = ({
  isAuthenticated,
  items,
  update_item,
  remove_item,
  get_shipping_options,
  shipping,
  refresh,
  get_payment_total,
  get_client_token,
  process_payment,
  user,
  total_items,
  clientToken,
  made_payment,
  loading,
  original_price,
  total_amount,
  total_compare_amount,
  estimated_tax,
  shipping_cost,
}) => {

  const [formData, setFormData] = useState({
    full_name: '',
    address_line_1: '',
    address_line_2: '',
    city: '',
    state_province_region: '',
    postal_zip_code: '',
    telephone_number: '',
    shipping_id: 0,
  });

  const [error, setError] = useState('');
  const [scroll, setScroll] = useState(false);

  const [data, setData] = useState({
    instance: {}
  });

  const {
    full_name,
    address_line_1,
    address_line_2,
    city,
    state_province_region,
    postal_zip_code,
    country_region,
    telephone_number,
    shipping_id,
  } = formData;

  const closeHandleError = () => { setError(''); setScroll(false); }
  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const buy = async e => {
    e.preventDefault();
    let nonce = await data.instance.requestPaymentMethod();
    if (shipping_id === 0) { setError('Por favor seleccione un método de envío'); setScroll(true); return; }
    process_payment(
      nonce,
      shipping_id,
      full_name,
      address_line_1,
      address_line_2,
      city,
      state_province_region,
      postal_zip_code,
      country_region,
      telephone_number
    );
  }

  useEffect(() => {
    window.scrollTo(0, 0)
    get_shipping_options()
  }, [])

  useEffect(() => {
    get_client_token();
  }, [user]);

  useEffect(() => {
    get_payment_total(shipping_id, '');
  }, [shipping_id]);


  const [render, setRender] = useState(false);

  if (!isAuthenticated)
    return <Navigate to='/' />

  const showItems = () => {
    return (
      <div>
        {
          items &&
          items !== null &&
          items !== undefined &&
          items.length !== 0 &&
          items.map((item, index) => {
            let count = item.count;
            return (
              <div key={index}>
                <CartItem
                  item={item}
                  count={count}
                  update_item={update_item}
                  remove_item={remove_item}
                  render={render}
                  setRender={setRender}

                />
              </div>
            );
          })
        }
      </div>
    )
  }

  const renderShipping = () => {
    if (shipping && shipping !== null && shipping !== undefined) {
      return (
        <div className='mb-5'>
          {
            shipping.map((shipping_option, index) => (
              <div key={index}>
                <input
                  onChange={e => onChange(e)}
                  value={shipping_option.id}
                  name='shipping_id'
                  type='radio'
                  required
                />
                <label className='ml-4'>
                  {shipping_option.name} - ${shipping_option.price} ({shipping_option.time_to_delivery})
                </label>
              </div>
            ))
          }
        </div>
      );
    }
  };
  // console.log("clientToken:", clientToken)
  const renderPaymentInfo = () => {
    if (!clientToken) {
      if (!isAuthenticated) {
        <Link
          to="/login"
          className="w-full bg-gray-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-gray-500"
        >
          Login
        </Link>
      } else {
        <button
          className="w-full bg-indigo-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500"
        >

        </button>
      }
    } else {
      return (
        <>
          {clientToken && (
            <DropIn
              options={{
                authorization: clientToken,
              }}
              onInstance={instance => (data.instance = instance)}
            />
          )}
          {!clientToken && <button
            className="w-full bg-indigo-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500" disabled
          >
            <PiSpinner className="text-2xl animate-spin" />
          </button>}
          <div className="mt-6">
            {loading ? <button
              className="w-full bg-indigo-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500 flex justify-center items-center" disabled={loading}
            >
              <PiSpinner className="text-2xl animate-spin" />
            </button> :
              <button
                type="submit"
                className="w-full bg-green-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-green-500"
              >
                Realizar Pedido
              </button>}
          </div>
        </>
      )
    }
  }

  if (made_payment)
    return <Navigate to='/thankyou' />;

  return (
    <Layout>
      {error && <div className="bg-red-500 text-white p-8 fixed top-0 left-0 w-screen z-[999] flex justify-between items-center">
        <span className="flex justify-center items-center gap-x-2"><MdErrorOutline />{error}</span>
        <button onClick={closeHandleError}><FaCircleXmark className="h-6 w-6 text-white" /></button>
      </div>}
      <div className="bg-white">
        <div className="max-w-2xl mx-auto pt-16 pb-24 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">Verificación de compra</h1>
          <div className="mt-12 lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start xl:gap-x-16">
            <section aria-labelledby="cart-heading" className="lg:col-span-7">
              <h2 id="cart-heading" className="sr-only">
                Productos en su carrito de compras
              </h2>

              <ul className="border-t border-b border-gray-200 divide-y divide-gray-200">
                {showItems()}
              </ul>
            </section>

            {/* Order summary 
            <ShippingForm
              full_name={full_name}
              address_line_1={address_line_1}
              address_line_2={address_line_2}
              city={city}
              state_province_region={state_province_region}
              postal_zip_code={postal_zip_code}
              countries={countries}
              telephone_number={telephone_number}
              onChange={onChange}
              buy={buy}
              user={user}
              renderShipping={renderShipping}
              total_amount={total_amount}
              total_compare_amount={total_compare_amount}
              estimated_tax={estimated_tax}
              shipping_cost={shipping_cost}
              shipping_id={shipping_id}
              shipping={shipping}
              renderPaymentInfo={renderPaymentInfo}
              scrollTo={scroll}
            />
          </div>
        </div>
      </div>
    </Layout>
  )
}

const mapStateToProps = state => ({
  isAuthenticated: state.Auth.isAuthenticated,
  user: state.Auth.user,
  items: state.Cart.items,
  total_items: state.Cart.total_items,
  shipping: state.Shipping.shipping,
  clientToken: state.Payment.clientToken,
  made_payment: state.Payment.made_payment,
  loading: state.Payment.loading,
  original_price: state.Payment.original_price,
  total_after_coupon: state.Payment.total_after_coupon,
  total_amount: state.Payment.total_amount,
  total_compare_amount: state.Payment.total_compare_amount,
  estimated_tax: state.Payment.estimated_tax,
  shipping_cost: state.Payment.shipping_cost,
})

export default connect(mapStateToProps, {
  update_item,
  remove_item,
  get_shipping_options,
  refresh,
  get_payment_total,
  get_client_token,
  process_payment,
})(Checkout)*/}