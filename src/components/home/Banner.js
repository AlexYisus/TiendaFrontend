import { Link } from "react-router-dom";
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router';
import { connect } from 'react-redux';
import { logout } from '../../redux/actions/auth';
import { get_categories } from '../../redux/actions/categories';
import { get_search_products } from '../../redux/actions/products';
import { SearchBoxHero } from "../navigation/SearchBoxHero";
import { Carousel } from 'react-responsive-carousel'; // Importa el carrusel
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Importa los estilos del carrusel
import { GiDrill, GiHammerNails, GiNails, GiScrew, GiScrewdriver } from "react-icons/gi";
import Parallax from 'parallax-js';
import img1 from '../../assets/img/logo-ef.png'
import img2 from '../../assets/img/img2.jpg'
import img3 from '../../assets/img/img3.jpg'
function Example({
  isAuthenticated,
  user,
  logout,
  get_categories,
  categories,
  get_search_products,
  total_items
}) {

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
  }, []);

  useEffect(() => {
    get_categories();
  }, [get_categories]);

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    get_search_products(search, category_id);
    setRender(!render);
  };

  if (render) {
    return <Navigate to='/search' />;
  }

  if (redirect) {
    window.location.reload(false);
    return <Navigate to='/' />;
  }

  return (
    <section className="w-screen flex justify-center items-center h-[90vh] py-12 md:py-24 lg:py-32 xl:py-48 bg-cover bg-center relative">
      {}
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
            <h1 className="text-4xl font-bold tracking-tighter sm:text-2xl md:text-3xl lg:text-5xl/none text-[#005eff] drop-shadow-lg">
              Bienvenido a ElectroFerretería CCAJ
            </h1>
            <p className="mx-auto max-w-[700px] text-black text-xl md:text-4xl drop-shadow mt-4">
              tu tienda de confianza
            </p>
            <p className="mx-auto max-w-[700px] text-[#ffa100] text-xl md:text-4xl drop-shadow mt-4">
              Las mejores herramientas y materiales
            </p>
            <p className="mx-auto max-w-[700px] text-black text-xl md:text-2xl drop-shadow mt-4">
              ahora a un clic de distancia
            </p>
            
            <div className="mt-12 flex justify-center space-x-8 text-black">
              <div className="text-center">
                <p className="text-4xl font-bold">Calidad</p>
                <p className="text-sm">En cada producto</p>
              </div>
              <div className="text-center"></div>
              <div className="text-center">
                <p className="text-4xl font-bold">Garantía</p>
                <p className="text-sm">100% Asegurada</p>
              </div>
            </div>

            <div className="w-full max-w-2xl space-y-2 mt-6">
              <SearchBoxHero
                search={search}
                onChange={onChange}
                onSubmit={onSubmit}
                categories={categories}
              />
            </div>

          </div>
        </div>
      </div>
      <div className="w-full max-w-2xl mt-8">
              <Carousel showThumbs={false} autoPlay infiniteLoop>
                <div>
                  <img src={img1} alt="Imagen 1" />
                 
                </div>
                <div>
                  <img src={img2} alt="Imagen 2" />
                  
                </div>
                <div>
                  <img src={img3} alt="Imagen 3" />
                  
                </div>
              </Carousel>
            </div>
    </section>
  );
}

const mapStateToProps = state => ({
  isAuthenticated: state.Auth.isAuthenticated,
  user: state.Auth.user,
  categories: state.Categories.categories,
  total_items: state.Cart.total_items
});

export default connect(mapStateToProps, {
  logout,
  get_categories,
  get_search_products
})(Example);