import Layout from '../../hocs/Layout'
import { connect } from 'react-redux'
import { list_orders } from '../../redux/actions/orders'
import {
  get_items,
  get_total,
  get_item_total
} from "../../redux/actions/cart";
import { useEffect } from 'react';
import { Navigate } from 'react-router';
import DashboardLink from '../../components/dashboard/DashboardLink';
import { Fragment, useState } from 'react'
import { Dialog, Menu, Transition } from '@headlessui/react'
import {
  BellIcon,
  CalendarIcon,
  ChartBarIcon,
  FolderIcon,
  HomeIcon,
  InboxIcon,
  MenuAlt2Icon,
  UsersIcon,
  XIcon,
  PaperClipIcon
} from '@heroicons/react/outline'
import { SearchIcon } from '@heroicons/react/solid'
import { Link } from 'react-router-dom';

import Dashboard from './Dashboard';
const navigation = [
  { name: 'Dashboard', href: '#', icon: HomeIcon, current: true },
  { name: 'Team', href: '#', icon: UsersIcon, current: false },
  { name: 'Projects', href: '#', icon: FolderIcon, current: false },
  { name: 'Calendar', href: '#', icon: CalendarIcon, current: false },
  { name: 'Documents', href: '#', icon: InboxIcon, current: false },
  { name: 'Reports', href: '#', icon: ChartBarIcon, current: false },
]
const userNavigation = [
  { name: 'Your Profile', href: '#' },
  { name: 'Settings', href: '#' },
  { name: 'Sign out', href: '#' },
]

const products = [
  {
    id: 1,
    name: 'Distant Mountains Artwork Tee',
    price: '$36.00',
    description: 'You awake in a new, mysterious land. Mist hangs low along the distant mountains. What does it mean?',
    address: ['Floyd Miles', '7363 Cynthia Pass', 'Toronto, ON N3Y 4H8'],
    email: 'f•••@example.com',
    phone: '1•••••••••40',
    href: '#',
    status: 'Processing',
    step: 1,
    date: 'March 24, 2021',
    datetime: '2021-03-24',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/confirmation-page-04-product-01.jpg',
    imageAlt: 'Off-white t-shirt with circular dot illustration on the front of mountain ridges that fade.',
  },
  // More products...
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const DashboardPayments = ({
  list_orders,
  get_items,
  get_total,
  get_item_total,
  orders,
  isAuthenticated,
  user
}) => {

  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    get_items()
    get_total()
    get_item_total()
    list_orders()
  }, [])

  if (!isAuthenticated)
    return <Navigate to="/" />

  return (
    <>
      <div>
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog as="div" className="fixed inset-0 flex z-40 md:hidden" onClose={setSidebarOpen}>
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
            </Transition.Child>
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <div className="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-white">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute top-0 right-0 -mr-12 pt-2">
                    <button
                      type="button"
                      className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <span className="sr-only">Close sidebar</span>
                      <XIcon className="h-6 w-6 text-white" aria-hidden="true" />
                    </button>
                  </div>
                </Transition.Child>
                <div className="flex-shrink-0 flex items-center px-4">
                  <Link to="/">
                    <img
                      className="h-8 w-auto cursor-pointer"
                      src="https://tailwindui.com/img/logos/workflow-logo-indigo-600-mark-gray-800-text.svg"
                      alt="Workflow"
                    />
                  </Link>
                </div>
                <div className="mt-5 flex-1 h-0 overflow-y-auto">
                  <nav className="px-2 space-y-1">
                    <DashboardLink />
                  </nav>
                </div>
              </div>
            </Transition.Child>
            <div className="flex-shrink-0 w-14" aria-hidden="true">
              
            </div>
          </Dialog>
        </Transition.Root>

        
        <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
          
          <div className="flex flex-col flex-grow border-r border-gray-200 pt-5 bg-white overflow-y-auto">
            <div className="flex items-center flex-shrink-0 px-4">

              <Link
                to="/"
                className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Regresar
              </Link>



            </div>
            <div className="mt-5 flex-grow flex flex-col">
              <nav className="flex-1 px-2 pb-4 space-y-1">
                <DashboardLink />
              </nav>
            </div>
          </div>
        </div>
        <div className="md:pl-64 flex flex-col flex-1">
          <div className="sticky top-0 z-10 flex-shrink-0 flex h-16 bg-white shadow">


            <div className="flex-1 px-4 flex justify-between">

              <div className="ml-4 flex items-center md:ml-6">

              </div>
            </div>
          </div>

          <main className="flex-1">
            <div className="py-6">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* We've used 3xl here, but feel free to try other max-widths based on your needs */}
                <div className="max-w-3xl mx-auto">

                  <div className="bg-white">
                    <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 sm:py-24 lg:px-8">


                      <div className="mt-8">

                        <div className="space-y-12">
                          {orders.map((product) => (

                            <>
                              <h2 className="sr-only">Products purchased</h2>
                              <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">Order Details</h1>

                              <div className="text-sm border-b border-gray-200 mt-2 pb-5 sm:flex sm:justify-between">
                                <dl className="flex">
                                  <dt className="text-gray-500">Transaction ID: &nbsp;</dt>
                                  <dd className="font-medium text-gray-900">{product.transaction_id}</dd>
                                  <dt>
                                    <span className="sr-only">Date</span>
                                    <span className="text-gray-400 mx-2" aria-hidden="true">
                                      &middot;
                                    </span>
                                  </dt>
                                  <dd className="font-medium text-gray-900">

                                  </dd>
                                </dl>
                                <div className="mt-4 sm:mt-0">

                                </div>
                              </div>
                              <div
                                key={product.id}
                                className="grid grid-cols-1 text-sm sm:grid-rows-1 sm:grid-cols-12 sm:gap-x-6 md:gap-x-8 lg:gap-x-8"
                              >


                                <div className="mt-6 sm:col-span-7 sm:mt-0 md:row-end-1">
                                  <h3 className="text-lg font-medium text-gray-900">
                                    <Link to={`/product/${product.id}`}>{product.name}</Link>
                                  </h3>
                                  <p className="font-medium text-gray-900 mt-1">Transaction ID: {product.transaction_id}</p>
                                  <p className="text-gray-500 mt-3">{product.description}</p>
                                </div>
                                <div className="sm:col-span-12 md:col-span-7">
                                  <dl className="grid grid-cols-1 gap-y-8 border-b py-8 border-gray-200 sm:grid-cols-2 sm:gap-x-6 sm:py-6 md:py-10">
                                    <div>
                                      <dt className="font-medium text-gray-900">Dirección de Entrega</dt>
                                      <dd className="mt-3 text-gray-500">
                                        <span className="block">{product.address_line_1}</span>
                                        <span className="block">{product.address_line_2}</span>
                                      </dd>
                                    </div>
                                    <div>
                                      <dt className="font-medium text-gray-900">Envió</dt>
                                      <dd className="mt-3 text-gray-500 space-y-3">
                                        <p>$ {product.shipping_price}</p>
                                        <p>$ {product.amount} Costo Total</p>

                                      </dd>
                                    </div>
                                  </dl>
                                  <p className="font-medium text-gray-900 mt-6 md:mt-10">
                                    Status: {product.status}
                                  </p>
                                  <div className="mt-6">
                                    <div className="bg-gray-200 rounded-full overflow-hidden">
                                      <div
                                        className="h-2 bg-indigo-600 rounded-full"
                                        style={{ width: `calc((${product.step} * 2 + 1) / 8 * 100%)` }}
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  )
}

const mapStateToProps = state => ({
  orders: state.Orders.orders,
  isAuthenticated: state.Auth.isAuthenticated,
  user: state.Auth.user
})

export default connect(mapStateToProps, {
  list_orders,
  get_items,
  get_total,
  get_item_total
})(DashboardPayments)