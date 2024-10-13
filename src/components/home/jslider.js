import img1 from '../../assets/img/logo-ef.png'
import img2 from '../../assets/img/img2.jpg'
import img3 from '../../assets/img/img3.jpg'
import { Carousel } from 'react-responsive-carousel'; // Importa el carrusel
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Importa los estilos del carrusel

export default function jslider ({
    date
}){
    return(
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
    )
}