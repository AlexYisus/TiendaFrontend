  import { Link } from "react-router-dom";
// import bg_tools from "../../assets/img/bg-tools.jpg";
// import { get_search_products } from "../../redux/actions/products";
// import { useState } from "react";

// export default function Example() {
//   const [render, setRender] = useState(false);
//   const [formData, setFormData] = useState({
//     category_id: 0,
//     search: ''
//   });
//   const { category_id, search } = formData;
//   const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

//   const onSubmit = e => {
//     e.preventDefault();
//     get_search_products(search, category_id);
//     setRender(!render);
//   }

//   return (
//     // <div className="relative bg-white overflow-hidden">
//     //   <div className="pt-16 pb-80 sm:pt-24 sm:pb-40 lg:pt-40 lg:pb-48">
//     //     <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 sm:static">
//     //       <div className="sm:max-w-lg">
//     //         <h1 className="text-4xl font font-extrabold tracking-tight text-gray-900 sm:text-6xl">
//     //           ElectroFerretería
//     //         </h1>
//     //         <p className="mt-4 text-xl text-gray-500">
//     //           Empresa dedicada a la venta de Material para la construcción de sus hogares
//     //         </p>
//     //       </div>
//     //       <div>
//     //         <div className="mt-10">
//     //           {/* Decorative image grid */}
//     //           <div
//     //             aria-hidden="true"
//     //             className="pointer-events-none lg:absolute lg:inset-y-0 lg:max-w-7xl lg:mx-auto lg:w-full"
//     //           >
//     //             <div className="absolute transform sm:left-1/2 sm:top-0 sm:translate-x-8 lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-8">
//     //               <div className="flex items-center space-x-10 lg:space-x-8">
//     //                 <div className="flex-shrink-0 grid grid-cols-1 gap-y-1000 lg:gap-y-8">

//     //                 <div className="w-44 h-64 rounded-lg overflow-hidden sm:opacity-0 lg:opacity-100">
//     //                   <img
//     //                     src="https://electroferreteria.s3.us-east-2.amazonaws.com/Lijas.jpg"
//     //                     alt=""
//     //                     className="w-full h-full object-center object-cover"
//     //                   />
//     //                 </div>
//     //                 <div className="w-44 h-64 rounded-lg overflow-hidden">
//     //                   <img
//     //                     src="https://electroferreteria.s3.us-east-2.amazonaws.com/Disco+de+corte.jpg"
//     //                     alt=""
//     //                     className="w-full h-full object-center object-cover"
//     //                   />
//     //                 </div>
//     //               </div>
//     //               <div className="flex-shrink-0 grid grid-cols-1 gap-y-6 lg:gap-y-8">
//     //                 <div className="w-44 h-64 rounded-lg overflow-hidden">
//     //                   <img
//     //                     src="https://electroferreteria.s3.us-east-2.amazonaws.com/Cortafrio.jpg"
//     //                     alt=""
//     //                     className="w-full h-full object-center object-cover"
//     //                   />
//     //                 </div>
//     //                 <div className="w-44 h-64 rounded-lg overflow-hidden">
//     //                   <img
//     //                     src="https://electroferreteria.s3.us-east-2.amazonaws.com/Martillo.jpg"
//     //                     alt=""
//     //                     className="w-full h-full object-center object-cover"
//     //                   />
//     //                 </div>
//     //                 <div className="w-44 h-64 rounded-lg overflow-hidden">
//     //                   <img
//     //                     src="https://electroferreteria.s3.us-east-2.amazonaws.com/manguera-negra.jpg"
//     //                     alt=""
//     //                     className="w-full h-full object-center object-cover"
//     //                   />
//     //                 </div>
//     //               </div>
//     //               <div className="flex-shrink-0 grid grid-cols-1 gap-y-6 lg:gap-y-8">
//     //                 <div className="w-44 h-64 rounded-lg overflow-hidden">
//     //                   <img
//     //                     src="https://electroferreteria.s3.us-east-2.amazonaws.com/Tubos+plastigama.jpg"
//     //                     alt=""
//     //                     className="w-full h-full object-center object-cover"
//     //                   />
//     //                 </div>
//     //                 <div className="w-44 h-64 rounded-lg overflow-hidden">
//     //                   <img
//     //                     src="https://electroferreteria.s3.us-east-2.amazonaws.com/Empaste+Interior.jpg"
//     //                     alt=""
//     //                     className="w-full h-full object-center object-cover"
//     //                   />
//     //                 </div>
//     //                 </div>
//     //               </div>
//     //             </div>
//     //           </div>
//     //           <Link to="/Shop"

//     //             className="inline-block text-center bg-indigo-600 border border-transparent rounded-md py-3 px-8 font-medium text-white hover:bg-indigo-700"
//     //           >
//     //             Ver Productos
//     //           </Link>
//     //         </div>
//     //       </div>
//     //     </div>
//     //   </div>
//     // </div>
//     <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-cover bg-center" style={{ backgroundImage: 'url("/placeholder.svg?height=600&width=1200")' }}>
//       <img src={bg_tools} alt="Banner" className="absolute inset-0 object-cover w-full h-full" />
//       <div className="container px-4 md:px-6">
//         <div className="flex flex-col items-center space-y-4 text-center">
//           <div className="space-y-2">
//             <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none text-white drop-shadow-lg">
//               Bienvenido a ElectroFerretería
//             </h1>
//             <p className="mx-auto max-w-[700px] text-white text-xl md:text-2xl drop-shadow">
//               Las mejores herramientas y materiales para tus proyectos, ahora a un clic de distancia
//             </p>
//           </div>
//           <div className="w-full max-w-sm space-y-2">
//             <SearchBoxHero
//               search={search}
//               onChange={onChange}
//               onSubmit={onSubmit}
//               categories={categories}
//             />
//           </div>
//         </div>
//       </div>
//     </section>
//   )
// }

import { useEffect, useState } from 'react'
import { Navigate } from 'react-router'

import { connect } from 'react-redux'
import { logout } from '../../redux/actions/auth'
import { get_categories } from '../../redux/actions/categories'
import { get_search_products } from '../../redux/actions/products';
import { SearchBoxHero } from "../navigation/SearchBoxHero";
// import bg_tools from "../../assets/img/bg-tools.jpg";
// import Spline from '@splinetool/react-spline';
import { GiDrill, GiHammerNails, GiNails, GiScrew, GiScrewdriver } from "react-icons/gi";
import Parallax from 'parallax-js'

function Example({
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
    var scene = document.getElementById('scene');
    var parallaxInstance = new Parallax(scene);
  }, [])

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

  if (redirect) {
    window.location.reload(false)
    return <Navigate to='/' />;
  }

  return (

    <section className="w-screen flex justify-center items-center h-[90vh] py-12 md:py-24 lg:py-32 xl:py-48 bg-cover bg-center relative">
      {/* <img src={bg_tools} alt="Banner" className="absolute inset-0 object-cover w-full h-full brightness-50 -z-10" /> */}
      <div className="absolute top-0 left-0 w-full h-full opacity-60 max-md:opacity-30 -z-10 flex justify-between items-end text-6xl max-md:text-3xl px-12 max-md:px-3">
        <div className='relative h-full w-full' id="scene">
          <GiDrill className='text-[#1f2859] absolute !top-1/4' data-depth="0.1" />
          <GiHammerNails className='text-[#f29203] absolute !top-[40%] !left-[10%]' data-depth="-0.1" />
          <GiScrewdriver className='text-[#1f2859] absolute !top-[60%]' data-depth="-0.1" />
          <GiScrew className='text-[#f29203] !top-[75%] !left-[10%]' data-depth="0.2"/>
          <GiNails className='text-[#1f2859] absolute !top-[90%]' data-depth="0.1"/>

          <GiHammerNails className='text-[#1f2859] absolute !top-1/4 !left-auto !right-0' data-depth="-0.1"  />
          <GiDrill className='text-[#f29203] absolute !top-[40%] !left-auto !right-[10%]' data-depth="-0.2" />
          <GiScrewdriver className='text-[#1f2859] absolute !top-[60%] !left-auto !right-0' data-depth="0.1" />
          <GiNails className='text-[#f29203] !top-[75%] !left-auto !right-[10%]' data-depth="-0.1" />
          <GiScrew className='text-[#1f2859] absolute !top-[90%] !left-auto !right-0' data-depth="0.1" />
        </div>
      </div>
      <div className="container flex justify-center items-center px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">

          <div className="flex flex-col justify-center items-center">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-2xl md:text-3xl lg:text-5xl/none text-black drop-shadow-lg">
              Bienvenido a ElectroFerretería CCAJ tu tienda de confianza
            </h1>
            <p className="mx-auto max-w-[700px] text-black text-xl md:text-2xl drop-shadow mt-4">
              Las mejores herramientas y materiales para tus proyectos, ahora a un clic de distancia
            </p>
            <div className="w-full max-w-2xl space-y-2 mt-6">
              <SearchBoxHero
                search={search}
                onChange={onChange}
                onSubmit={onSubmit}
                categories={categories}
              />
            </div>
            <div className="mt-12 flex justify-center space-x-8 text-black">
              <div className="text-center">
              <p className="text-4xl font-bold">Calidad</p>
              <p className="text-sm">En cada producto</p>
              </div>
              <div className="text-center">
                
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold">Garantía</p>
                <p className="text-sm">100% Asegurada</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

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
})(Example)