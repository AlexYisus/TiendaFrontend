import { SearchIcon } from '@heroicons/react/solid'


const SearchBoxHero = ({
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
                        className="focus:ring-gray-900 focus:border-gray-900 block w-full rounded-md pl-2 sm:text-sm border-gray-300 py-3"
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

export default SearchBoxHero;