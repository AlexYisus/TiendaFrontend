import { Tab } from '@headlessui/react'
import { PiSpinner } from 'react-icons/pi'

const product = {
  name: 'Zip Tote Basket',
  price: '$140',
  rating: 4,
  images: [
    {
      id: 1,
      name: 'Angled view',
      src: 'https://tailwindui.com/img/ecommerce-images/product-page-03-product-01.jpg',
      alt: 'Angled front view with bag zipped and handles upright.',
    },
    // More images...
  ],
  colors: [
    { name: 'Washed Black', bgColor: 'bg-gray-700', selectedColor: 'ring-gray-700' },
    { name: 'White', bgColor: 'bg-white', selectedColor: 'ring-gray-400' },
    { name: 'Washed Gray', bgColor: 'bg-gray-500', selectedColor: 'ring-gray-500' },
  ],
  description: `
      <p>The Zip Tote Basket is the perfect midpoint between shopping tote and comfy backpack. With convertible straps, you can hand carry, should sling, or backpack this convenient and spacious bag. The zip top and durable canvas construction keeps your goods protected for all-day use.</p>
    `,
  details: [
    {
      name: 'Features',
      items: [
        'Multiple strap configurations',
        'Spacious interior with top zip',
        'Leather handle and tabs',
        'Interior dividers',
        'Stainless strap loops',
        'Double stitched construction',
        'Water-resistant',
      ],
    },
    // More sections...
  ],
}

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const ImageGallery = ({ photo }) => {

  return (
    <>
      {/* Image gallery */}
      <Tab.Group as="div" className="flex flex-col-reverse">
        {/* Image selector */}
        <div className="hidden mt-6 w-full max-w-2xl mx-auto sm:block lg:max-w-none">
          <Tab.List className="grid grid-cols-4 gap-6 relative">


            <Tab

              className="relative h-24 bg-white rounded-md flex items-center justify-center text-sm font-medium uppercase text-gray-900 cursor-pointer hover:bg-gray-50 focus:outline-none focus:ring focus:ring-offset-4 focus:ring-opacity-50"
            >
              {({ selected }) => (
                <>
                  {
                    photo ? (
                      <>
                        <span className="absolute inset-0 rounded-md overflow-hidden">
                          <img src={process.env.REACT_APP_API_URL + photo} alt="" className="w-full h-full object-center object-cover" />
                        </span>
                        <span
                          className={classNames(
                            selected ? 'ring-indigo-500' : 'ring-transparent',
                            'absolute inset-0 rounded-md ring-2 ring-offset-2 pointer-events-none'
                          )}
                          aria-hidden="true"
                        />
                      </>
                    ) : (
                      <div className="absolute overflow-hidden left-1/2 -translate-x-1/2 top-0 text-black">
                        <PiSpinner className="text-[40px] animate-spin" />
                      </div>
                    )
                  }
                </>
              )}
            </Tab>


          </Tab.List>
        </div>

        <Tab.Panels className="w-full aspect-w-1 aspect-h-1 relative">
          {product && photo ? product.images.map((image) => (
            <Tab.Panel key={image.id}>
              <img
                src={process.env.REACT_APP_API_URL + photo}
                alt=""
                className="w-full h-full object-center object-cover sm:rounded-lg"
              />
            </Tab.Panel>
          )) : (<div className="absolute overflow-hidden left-1/2 -translate-x-1/2 top-0 text-black">
            <PiSpinner className="text-[40px] animate-spin" />
          </div>)}
        </Tab.Panels>
      </Tab.Group>
    </>
  )
}

export default ImageGallery