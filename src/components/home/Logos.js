import dewalt from "../../assets/img/logos/dewalt.png";
import stanley from "../../assets/img/logos/stanley.png";
import truper from "../../assets/img/logos/truper.webp";
import qsb from "../../assets/img/logos/qsb.png";
import norton from "../../assets/img/logos/norton.svg";
import fandeli from "../../assets/img/logos/fandeli.png";
import fv from "../../assets/img/logos/fv.png"
import veto from "../../assets/img/logos/veto.png"

export default function Logos() {
    const logos = [fv, stanley, veto, qsb, norton, fandeli]; // Aquí puedes agregar más imágenes

    return (
        <div className="w-screen flex flex-col justify-center items-center mb-12">
            <div className="max-md:px-12">
                <h2 className="text-[30px] font-bold tracking-tight text-gray-900 my-12 text-center">Trabajamos con las mejores marcas</h2>
            </div>
            <div className="grid grid-cols-3 w-[80%] max-md:w-[90%] h-full">
                {logos.map((logo, index) => (
                    <div key={index} className="border w-full h-36 max-md:h-24 flex justify-center items-center">
                        <img
                            src={logo}
                            alt={`logo-${index}`}
                            className="w-[10vw] max-md:w-[18vw] object-center object-cover"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
