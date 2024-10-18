import { MdOutlineElectricBolt } from "react-icons/md";
import { FaRegPaperPlane } from "react-icons/fa";
import { FaSitemap } from "react-icons/fa6";
import logo_elefer from '../../assets/img/logo-ef.png'

export default function Footer() {
  return (
    <footer className="bg-[#005eff] w-full pt-16 pb-8 px-12 max-md:px-6" aria-labelledby="footer-heading">
      <div className="w-full flex flex-col justify-center items-center">
        <div className="w-full flex justify-between items-start gap-x-6 max-md:flex-col max-md:gap-y-12">
          <div className="bg-white h-24 w-24 rounded-full flex justify-center items-center">
            <img
              className="h-12 w-auto object-cover"
              src={logo_elefer}
              alt="Logo"
            />
          </div>
          <div className="text-white">
            <h1 className="text-md font-semibold mb-4 text-white flex justify-start items-center gap-x-2"><FaRegPaperPlane />
              Contáctanos</h1>
            <ul className="space-y-3">
              <li><a href="mailto:alextaraguay20@gmail.com" className="hover:text-white duration-300">alextaraguay20@gmail.com</a></li>
              <li><a href="tel:+593987654321" className="hover:text-white duration-300">+ 593 992 953 397</a></li>
              <li className="uppercase">Latacunga 050102 - Ecuador</li>
            </ul>
          </div>
          <div className="text-white">
            <h1 className="text-md font-semibold mb-4 text-white flex justify-start items-center gap-x-2"><FaSitemap />
              Páginas</h1>
            <ul className="space-y-3">
              <li className="hover:text-white duration-300"><a href="/signup">Regístrate</a></li>
              <li className="hover:text-white duration-300"><a href="/shop">Productos</a></li>
              <li className="hover:text-white duration-300"><a href="/cart">Carrito</a></li>
            </ul>
          </div>
          <div className="text-white max-w-xs">
            <h1 className="text-md font-semibold mb-4 text-white flex justify-start items-center gap-x-2"><MdOutlineElectricBolt />
              ElectroFerretería</h1>
            <p>
              Av. Napo 4-44 y Juan Abel Echeverría
            </p>
          </div>
        </div>
        <div className="mt-16 max-md:mt-12 border-t border-white pt-8 md:flex md:items-center md:justify-center w-full">
          <p className="text-base text-white md:mt-0 md:border-1 text-center">
            &copy; 2024 ElectroFerretería.
          </p>
        </div>
      </div>
    </footer>
  )
}