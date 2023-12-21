// import { useState } from "react";
// import ShoeList from "./ShoeList";

// const Home = () => {

//     const [ shoes, setNewShoes ] = useState([
//         { title: 'NIKE', brand: 'Airforce', id: 1},
//         { title: 'ADIDAS', brand: 'Classic', id: 2}
//     ]);

//     return (
//         <div className="home">
//             <ShoeList shoes={shoes} />
//         </div>
//     );
// }

// export default Home;

/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
import { Fragment, useState } from 'react'
import { Dialog, Disclosure, Menu, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon, FunnelIcon, MinusIcon, PlusIcon, Squares2X2Icon } from '@heroicons/react/20/solid'
import Shoe from './Shoe'



const sortOptions = [
  { name: 'Most Popular', href: '#', current: true },
  { name: 'Best Rating', href: '#', current: false },
  { name: 'Newest', href: '#', current: false },
  { name: 'Price: Low to High', href: '#', current: false },
  { name: 'Price: High to Low', href: '#', current: false },
]

// const shoes = [
//   {
//     _id: "100001",
//     img: "https://image.goat.com/transform/v1/attachments/product_template_pictures/images/048/340/054/original/712867_00.png.png?action=crop&width=500",
//     shoeName: "Nike Air Force 1",
//     price: "90.00",
//     category: "Basketball",
//   },
//   {
//     _id: "100002",
//     img: "https://image.goat.com/transform/v1/attachments/product_template_additional_pictures/images/060/049/951/original/804464_01.jpg.jpeg?action=crop&width=900",
//     shoeName: "Nike Free Run",
//     price: "76.00",
//     category: "Running",
//   },
//   {
//     _id: "100003",
//     img: "https://image.goat.com/transform/v1/attachments/product_template_additional_pictures/images/088/205/438/original/1179930_01.jpg.jpeg?action=crop&width=900",
//     shoeName: "Vans Old Skool",
//     price: "59.00",
//     category: "Casual",
//   },
//   {
//     _id: "100004",
//     img: "https://image.goat.com/transform/v1/attachments/product_template_pictures/images/094/121/931/original/ID2030.png.png?action=crop&width=900",
//     shoeName: "Adidas Stan Smith",
//     price: "108.00",
//     category: "Tennis",
//   },
//   {
//     _id: "100005",
//     img: "https://image.goat.com/transform/v1/attachments/product_template_additional_pictures/images/082/754/093/original/1081516_01.jpg.jpeg?action=crop&width=900",
//     shoeName: "Air Jordan V",
//     price: "210.00",
//     category: "Retro",
//   },
// ]
// const subCategories = [
//   { name: 'Totes', href: '#' },
//   { name: 'Backpacks', href: '#' },
//   { name: 'Travel Bags', href: '#' },
//   { name: 'Hip Bags', href: '#' },
//   { name: 'Laptop Sleeves', href: '#' },
// ]
const filters = [
  {
    id: 'brand',
    name: 'Brand',
    options: [
      { value: 'nike', label: 'Nike', checked: false },
      { value: 'adidas', label: 'Adidas', checked: false },
      { value: 'air_jordan', label: 'Air Jordan', checked: false },
      { value: 'yeezy', label: 'Yeezy', checked: false },
      { value: 'new_balance', label: 'New Balance', checked: false },
      { value: 'fila', label: 'Fila', checked: false },
    ],
  },
  {
    id: 'category',
    name: 'Category',
    options: [
      { value: 'running', label: "Running", checked: false },
      { value: 'basketball', label: "Basketball", checked: false },
      { value: 'tennis', label: "Tennis", checked: false },
      { value: 'skateboarding', label: "Skateboarding", checked: false },
      { value: 'soccer', label: "Soccer", checked: false },
      { value: 'gym_training', label: "Gym/Training", checked: false },
      { value: 'casual', label: "Casual", checked: false },
      { value: 'retro', label: "Retro", checked: false },
      { value: 'luxury', label: "Luxury", checked: false },
      { value: 'trail', label: "Trail", checked: false },
      { value: 'eco_friendly', label: "Eco-Friendly", checked: false },
    ],
  },

  //   "Running Shoes",
  //   "Basketball Shoes",
  //   "Tennis Shoes",
  //   "Skateboarding Shoes",
  //   "Soccer Shoes",
  //   "Gym and Training Shoes",
  //   "Casual Sneakers",
  //   "Retro Sneakers",
  //   "Luxury Sneakers",
  //   "Trail Running Shoes",
  //   "Eco-Friendly Sneakers",


  {
    id: 'price',
    name: 'Price',
    options: [
      { value: 'under_100', label: '< $100', checked: false },
      { value: '100_199', label: '$100 - $199', checked: false },
      { value: '200_299', label: '$200 - $299', checked: false },
      { value: '300+', label: '$300 and over', checked: false },
    ],
  },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Home({ shoes }) {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  return (
    <div className="bg-white">
      <div>
        {/* Mobile filter dialog */}
        <Transition.Root show={mobileFiltersOpen} as={Fragment}>
          <Dialog as="div" className="relative z-40 lg:hidden" onClose={setMobileFiltersOpen}>
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 z-40 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                  <div className="flex items-center justify-between px-4">
                    <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                    <button
                      type="button"
                      className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                      onClick={() => setMobileFiltersOpen(false)}
                    >
                      <span className="sr-only">Close menu</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>

                  {/* Filters */}
                  <form className="mt-4 border-t border-gray-200">
                    {/* <h3 className="sr-only">Categories</h3>
                    <ul role="list" className="px-2 py-3 font-medium text-gray-900">
                      {subCategories.map((category) => (
                        <li key={category.name}>
                          <a href={category.href} className="block px-2 py-3">
                            {category.name}
                          </a>
                        </li>
                      ))}
                    </ul> */}

                    {filters.map((section) => (
                      <Disclosure as="div" key={section.id} className="border-t border-gray-200 px-4 py-6">
                        {({ open }) => (
                          <>
                            <h3 className="-mx-2 -my-3 flow-root">
                              <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                                <span className="font-medium text-gray-900">{section.name}</span>
                                <span className="ml-6 flex items-center">
                                  {open ? (
                                    <MinusIcon className="h-5 w-5" aria-hidden="true" />
                                  ) : (
                                    <PlusIcon className="h-5 w-5" aria-hidden="true" />
                                  )}
                                </span>
                              </Disclosure.Button>
                            </h3>
                            <Disclosure.Panel className="pt-6">
                              <div className="space-y-6">
                                {section.options.map((option, optionIdx) => (
                                  <div key={option.value} className="flex items-center">
                                    <input
                                      id={`filter-mobile-${section.id}-${optionIdx}`}
                                      name={`${section.id}[]`}
                                      defaultValue={option.value}
                                      type="checkbox"
                                      defaultChecked={option.checked}
                                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                    />
                                    <label
                                      htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                      className="ml-3 min-w-0 flex-1 text-gray-500"
                                    >
                                      {option.label}
                                    </label>
                                  </div>
                                ))}
                              </div>
                            </Disclosure.Panel>
                          </>
                        )}
                      </Disclosure>
                    ))}
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">Our Products</h1>

            <div className="flex items-center">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                    Sort
                    <ChevronDownIcon
                      className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
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
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      {sortOptions.map((option) => (
                        <Menu.Item key={option.name}>
                          {({ active }) => (
                            <a
                              href={option.href}
                              className={classNames(
                                option.current ? 'font-medium text-gray-900' : 'text-gray-500',
                                active ? 'bg-gray-100' : '',
                                'block px-4 py-2 text-sm'
                              )}
                            >
                              {option.name}
                            </a>
                          )}
                        </Menu.Item>
                      ))}
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>

              <button type="button" className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7">
                <span className="sr-only">View grid</span>
                <Squares2X2Icon className="h-5 w-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <span className="sr-only">Filters</span>
                <FunnelIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pb-24 pt-6">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
              {/* Filters */}
              <form className="hidden lg:block">
                {/* <h3 className="sr-only">Categories</h3>
                <ul role="list" className="space-y-4 border-b border-gray-200 pb-6 text-sm font-medium text-gray-900">
                  {subCategories.map((category) => (
                    <li key={category.name}>
                      <a href={category.href}>{category.name}</a>
                    </li>
                  ))}
                </ul> */}

                {filters.map((section) => (
                  <Disclosure as="div" key={section.id} className="border-b border-gray-200 py-6">
                    {({ open }) => (
                      <>
                        <h3 className="-my-3 flow-root">
                          <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                            <span className="font-medium text-gray-900">{section.name}</span>
                            <span className="ml-6 flex items-center">
                              {open ? (
                                <MinusIcon className="h-5 w-5" aria-hidden="true" />
                              ) : (
                                <PlusIcon className="h-5 w-5" aria-hidden="true" />
                              )}
                            </span>
                          </Disclosure.Button>
                        </h3>
                        <Disclosure.Panel className="pt-6">
                          <div className="space-y-4">
                            {section.options.map((option, optionIdx) => (
                              <div key={option.value} className="flex items-center">
                                <input
                                  id={`filter-${section.id}-${optionIdx}`}
                                  name={`${section.id}[]`}
                                  defaultValue={option.value}
                                  type="checkbox"
                                  defaultChecked={option.checked}
                                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                />
                                <label
                                  htmlFor={`filter-${section.id}-${optionIdx}`}
                                  className="ml-3 text-sm text-gray-600"
                                >
                                  {option.label}
                                </label>
                              </div>
                            ))}
                          </div>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                ))}
              </form>

              {/* Product grid */}
              <div className="lg:col-span-3">
                <div className="container mx-auto my-auto">
                  <div className="grid md:grid-cols-2 sm:grid-cols-1 lg:grid-cols-4 gap-4">
                    {shoes.map((shoe, index) => (
                      <Shoe
                        key={index}
                        _id={shoe.id}
                        img={shoe.picture}
                        shoeName={shoe.name}
                        price={shoe.price}
                        category={shoe.category}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}
