import { SearchIcon } from '@heroicons/react/solid'

const SearchBox = ({
  categories,
  search,
  onChange,
  onSubmit,
}) => {
  return (
    <div>
      <form onSubmit={e => onSubmit(e)} className="search-box">
        <div className='flex justify-center items-center search-input'>
          <div className="h-full ">
            <select
              onChange={e => onChange(e)}
              name='category_id'
              className='h-full bg-[#f3f4f6] rounded-md text-base px-2 mr-2'
            >
              <option value={0}>Todo</option>
              {
                categories &&
                categories !== null &&
                categories !== undefined &&
                categories.map((category, index) => (
                  <option key={index} value={category.id}>
                    {category.name}
                  </option>
                ))
              }

            </select>
          </div>

          <div className="relative flex items-stretch flex-grow focus-within:z-10 h-full">
            <input
              type="search"
              name="search"
              onChange={e => onChange(e)}
              value={search}
              required
              className="focus:ring-indigo-500 focus:border-indigo-500 block w-full rounded-md px-4 text-base bg-[#f3f4f6] h-full search-box placeholder:text-gray-500"
              placeholder="¿Qué buscas hoy?"
            />
          </div>
        </div>
        <button type="submit" className="search-btn">
          <SearchIcon className="h-7 w-7 text-black" aria-hidden="true" />
        </button>
      </form>
    </div>
  )
}

export default SearchBox