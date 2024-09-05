import { Fragment, useEffect, useState } from 'react'
import { Menu, Popover, Transition } from '@headlessui/react'
import { NavLink, Link } from 'react-router-dom'
import { Navigate } from 'react-router'
import { IoBagOutline } from "react-icons/io5";

import {
  // BookmarkAltIcon,
  // BriefcaseIcon,
  // ChartBarIcon,
  // CheckCircleIcon,
  // CursorClickIcon,
  // DesktopComputerIcon,
  // GlobeAltIcon,
  // InformationCircleIcon,
  MenuIcon,
  // NewspaperIcon,
  // OfficeBuildingIcon,
  // PhoneIcon,
  // PlayIcon,
  // ShieldCheckIcon,
  // UserGroupIcon,
  // ViewGridIcon,
  XIcon,
} from '@heroicons/react/outline'
import { connect } from 'react-redux'
import { logout } from '../../redux/actions/auth'
import { get_categories } from '../../redux/actions/categories'
import { get_search_products } from '../../redux/actions/products';
import SearchBox from './SearchBox'

// const solutions = [
//   {
//     name: 'Analytics',
//     description: 'Get a better understanding of where your traffic is coming from.',
//     href: '#',
//     icon: ChartBarIcon,
//   },
//   {
//     name: 'Engagement',
//     description: 'Speak directly to your customers in a more meaningful way.',
//     href: '#',
//     icon: CursorClickIcon,
//   },
//   { name: 'Security', description: "Your customers' data will be safe and secure.", href: '#', icon: ShieldCheckIcon },
//   {
//     name: 'Integrations',
//     description: "Connect with third-party tools that you're already using.",
//     href: '#',
//     icon: ViewGridIcon,
//   },
// ]
// const callsToAction = [
//   { name: 'Watch Demo', href: '#', icon: PlayIcon },
//   { name: 'View All Products', href: '#', icon: CheckCircleIcon },
//   { name: 'Contact Sales', href: '#', icon: PhoneIcon },
// ]
// const company = [
//   { name: 'About', href: '#', icon: InformationCircleIcon },
//   { name: 'Customers', href: '#', icon: OfficeBuildingIcon },
//   { name: 'Press', href: '#', icon: NewspaperIcon },
//   { name: 'Careers', href: '#', icon: BriefcaseIcon },
//   { name: 'Privacy', href: '#', icon: ShieldCheckIcon },
// ]
// const resources = [
//   { name: 'Community', href: '#', icon: UserGroupIcon },
//   { name: 'Partners', href: '#', icon: GlobeAltIcon },
//   { name: 'Guides', href: '#', icon: BookmarkAltIcon },
//   { name: 'Webinars', href: '#', icon: DesktopComputerIcon },
// ]
// const blogPosts = [
//   {
//     id: 1,
//     name: 'Boost your conversion rate',
//     href: '#',
//     preview: 'Eget ullamcorper ac ut vulputate fames nec mattis pellentesque elementum. Viverra tempor id mus.',
//     imageUrl:
//       'https://images.unsplash.com/photo-1558478551-1a378f63328e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2849&q=80',
//   },
//   {
//     id: 2,
//     name: 'How to use search engine optimization to drive traffic to your site',
//     href: '#',
//     preview: 'Eget ullamcorper ac ut vulputate fames nec mattis pellentesque elementum. Viverra tempor id mus.',
//     imageUrl:
//       'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2300&q=80',
//   },
// ]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

function Navbar({
  isAuthenticated,
  user,
  logout,
  get_categories,
  categories,
  get_search_products,
  total_items
}) {

  // eslint-disable-next-line
  const [redirect, setRedirect] = useState(false);

  const [render, setRender] = useState(false);
  const [formData, setFormData] = useState({
    category_id: 0,
    search: ''
  });
  const { category_id, search } = formData;

  useEffect(() => {
    get_categories()
  }, [get_categories])

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    get_search_products(search, category_id);
    setRender(!render);
  }

  if (render) {
    return <Navigate to='/search' />;
  }

  const logoutHandler = () => {
    logout()
    setRedirect(true);
  }

  if (redirect) {
    window.location.reload(false)
    return <Navigate to='/' />;
  }

  const authLinks = (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex justify-center w-full rounded-full  text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
          <span className="inline-block h-10 w-10 rounded-full overflow-hidden bg-gray-100">
            <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </span>
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <Link
                  to="/dashboard"
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm'
                  )}
                >
                  Dashboard
                </Link>
              )}
            </Menu.Item>


            <form method="POST" action="#">
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={logoutHandler}
                    className={classNames(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block w-full text-left px-4 py-2 text-sm'
                    )}
                  >
                    Cerrar Sesión
                  </button>
                )}
              </Menu.Item>
            </form>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )

  const guestLinks = (
    <Fragment>
      <Link to="/login" className="text-base font-medium text-gray-500 hover:text-gray-900 ml-4">
        Iniciar Sesión
      </Link>
      <Link
        to="/signup"
        className="ml-4 inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
      >
        Registrarse
      </Link>
    </Fragment>
  )

  return (

    <Popover className="relative bg-white">
      <div className="absolute inset-0  z-30 pointer-events-none" aria-hidden="true" />
      <div className="relative h-12 w-screen"></div>
      <div className="fixed w-screen top-0 left-0 z-20 bg-white">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-4 py-5 sm:px-6 sm:py-4 lg:px-8 md:justify-start md:space-x-10">
          <div>
            <Link to="/" className="flex">
              <span className="sr-only">Workflow</span>
              <img
                className="h-8 w-auto sm:h-10"
                src="https://electroferreteria.s3.us-east-2.amazonaws.com/MARKETING+CCAJ2-14.png"
                alt=""
              />
            </Link>
          </div>
          <div className="-mr-2 -my-2 md:hidden">

            <Link to="/cart" className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
              <span className="sr-only">Open menu</span>
              <IoBagOutline className="h-6 w-6 text-black" aria-hidden="true" />
              <span className="text-xs absolute bottom-0 mb-3 ml-4 bg-red-500 text-white font-semibold rounded-full p-1 text-center h-6 w-6 flex justify-center items-center">{total_items}</span>
            </Link>
            <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
              <span className="sr-only">Open menu</span>
              <MenuIcon className="h-6 w-6" aria-hidden="true" />
            </Popover.Button>
          </div>
          <div className="hidden md:flex-1 md:flex md:items-center md:justify-between">
            <Popover.Group as="nav" className="flex space-x-10">

            </Popover.Group>
            <div className="flex items-center md:ml-12">
              {window.location.pathname === '/search' ? <></> : <SearchBox
                search={search}
                onChange={onChange}
                onSubmit={onSubmit}
                categories={categories}
              />}
              <NavLink to="/shop" className={window.location.pathname === '/search' ? ' text-base font-medium text-black hover:text-gray-500' : 'text-base font-medium text-black hover:text-gray-500 mr-4'}>
                Tienda
              </NavLink>
              <Link to="/cart">
                <IoBagOutline className="h-8 w-8 cursor-pointer text-black mr-4" />
                <span className="text-xs absolute bottom-0 mb-4 ml-4 bg-red-500 text-white font-semibold rounded-full p-1 text-center h-6 w-6 flex justify-center items-center">{total_items}</span>
              </Link>
              {
                isAuthenticated ? authLinks : guestLinks
              }
            </div>
          </div>
        </div>
      </div>
      <Transition
        as={Fragment}
        enter="duration-200 ease-out"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="duration-100 ease-in"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <Popover.Panel
          focus
          className="absolute z-30 top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"
        >
          <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
            <div className="pt-5 pb-6 px-5 sm:pb-8">
              <div className="flex items-center justify-between">
                <div>
                  <img
                    className="h-8 w-auto"
                    src="https://electroferreteria.s3.us-east-2.amazonaws.com/MARKETING+CCAJ2-14.png"
                    alt=""
                  />
                </div>
                <div className="-mr-2">
                  <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                    <span className="sr-only">Close menu</span>
                    <XIcon className="h-6 w-6" aria-hidden="true" />
                  </Popover.Button>
                </div>
              </div>
              <div className="mt-6 sm:mt-8">
              </div>
            </div>
            <div className="py-6 px-5">

              <div className="mt-6">
                {isAuthenticated ? <Link
                  to="/dashboard"
                  className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  Iniciar Sesión
                </Link> :
                  <a
                    href="/signup"
                    className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                  >
                    Registrarse
                  </a>}


                <p className="mt-6 text-center text-base font-medium text-gray-500">
                  Ya tienes cuenta?{' '}


                  <a href="/login" className="text-indigo-600 hover:text-indigo-500">
                    Iniciar Sesión
                  </a>
                </p>
              </div>
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>

  )
}

const mapStateToProps = state => ({
  isAuthenticated: state.Auth.isAuthenticated,
  user: state.Auth.user,
  categories: state.Categories.categories,
  total_items: state.Cart.total_items
})

export default connect(mapStateToProps, {
  logout,
  get_categories,
  get_search_products
})(Navbar)