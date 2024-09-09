import { SearchIcon } from '@heroicons/react/solid'
import { useEffect } from 'react';


export const SearchBoxHero = ({
    categories,
    search,
    onChange,
    onSubmit,
}) => {
    return (
        <form onSubmit={e => onSubmit(e)} className="text-base font-medium text-gray-500 hover:text-gray-900">
            <div className="flex justify-center items-center gap-x-2">
                <div className="relative flex items-stretch flex-grow focus-within:z-10">
                    <input
                        type="search"
                        name="search"
                        onChange={e => onChange(e)}
                        value={search}
                        required
                        className="focus:ring-gray-300 focus:border-gray-300 block w-full rounded-md pl-2 sm:text-sm border border-gray-300 py-3"
                        placeholder="Buscar productos..."
                    />
                </div>

                <button
                    type="submit"
                    className="flex justify-center items-center gap-x-2 text-white px-4 py-3 rounded-md bg-gray-800 hover:bg-gray-700 duration-300"
                >
                    <SearchIcon className="h-5 w-5" aria-hidden="true" /> buscar
                </button>

            </div>
        </form>
    )
}

export const MainToasterEE = () => {
    useEffect(() => {
        const url = "";
        const name = "";
        const thresholdWidth = 1110; // Ancho a partir del cual los guiones comienzan a disminuir

        const generateLegend = () => {
            const screenWidth = window.innerWidth;
            const maxGuiones = 50; // Máximo número de guiones
            const minGuiones = 10; // Mínimo número de guiones

            let dashCount;

            if (screenWidth > thresholdWidth) {
                // Disminuir los guiones solo si el ancho de la pantalla es mayor que 1150
                dashCount = Math.floor((maxGuiones * 600) / screenWidth);
                dashCount = Math.max(minGuiones, Math.min(dashCount, maxGuiones));
            } else {
                // Mantener el valor máximo de guiones si el ancho es menor o igual a 1150
                dashCount = maxGuiones;
            }

            const line = '-'.repeat(dashCount);

            const legend = `%c
    |${line}|  
    | Made by ${name}  |
    |${line}|  
    | Visit portfolio ->>> ${url}     |
    |${line}| \n`;

            return legend;
        };

        const logLegend = () => {
            console.clear(); // Limpiar consola para que no se acumulen logs
            console.log(generateLegend(), "color:white;font-size: 12px;");
        };

        // Mostrar el legend al cargar
        logLegend();

        // Añadir evento resize para recalcular
        window.addEventListener('resize', logLegend);

        // Limpiar el evento cuando el componente se desmonte
        return () => {
            window.removeEventListener('resize', logLegend);
        };
    }, []);

    return null; // No renderiza nada en el DOM
};


