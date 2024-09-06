import React from 'react'
import { useState, useEffect } from 'react'
// import { Dialog, DialogPanel } from '@headlessui/react'
// import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { createUser } from '../api/functions'

import Logo from '../assets/icons/logo.svg'

export default function Header() {
const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // State to handle the visibility of the pop-up form
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userData, setUserData] = useState({
    username: '',
    password: 'sparring123',
    email: '',
    firstName: '',
    lastName: '',
    // address: '',
    // date_of_birth: '',
    document: '',
    phone: '', 
    attributes: [{ utm_source: 'website-beta' }] 
  });


const navigation = [
  { name: 'Home', href: '#' },
  { name: 'Features', href: '#' },
  { name: 'Pricing', href: '#' },
  { name: 'Contact', href: '#' },
]


  // Function to toggle the modal visibility
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };


  useEffect(() => {
    setUserData(prevData => ({
      ...prevData,
      username: `${prevData.firstName}${prevData.lastName}`
    }));
  }, [userData.firstName, userData.lastName]);


   // Check the URL and set the utm_source based on conditions
   useEffect(() => {
    const url = window.location.href;

    // Check if URL contains "f&f" to set the correct utm_source
    if (url.includes("f&f")) {
      setUserData(prevData => ({
        ...prevData,
        attributes: {
          ...prevData.attributes, // Preserve other attributes
          utm_source: 'friends-free' // Set new value for utm_source
        }
      }));
    }
  }, []);


  // Function to reset the form and close the modal
  const resetFormAndCloseModal = () => {
    setUserData({
      username: '',
      password: 'sparring123',
      email: '',
      firstName: '',
      lastName: '',
      document: '',
      phone: '', 
      attributes: [{ utm_source: 'website-beta' }]
    });
    setIsModalOpen(false); // Close the modal
  };



  // Handle form input change
  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    if (window.location.hash === '#register') {
      setIsModalOpen(true);
    }
  }, []); // Run only once on component mount
  

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await createUser(userData); // Call createUser function
      console.log('User created successfully:', response);
      resetFormAndCloseModal();
      // You can redirect or show a success message here
    } catch (error) {
      console.error('Error creating user:', error);
      // Handle error, show an error message
    }
  };



  return (
    <header className="absolute inset-x-0 top-0 z-50">
        <nav aria-label="Global" className="flex items-center justify-between p-6 lg:px-8">
          <div className="flex lg:flex-1">
            <a href="#" className="-m-1.5 p-1.5">
              {/* <span className="sr-only">Your Company</span> */}
              <img
                alt="Sparring Logo"
                src={Logo}
                className="h-12 w-auto"
              />
            </a>
          </div>
          <div className="flex !hidden lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Open main menu</span>
              {/* <Bars3Icon aria-hidden="true" className="h-6 w-6" /> */}
            </button>
          </div>
          <div className="!hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <a key={item.name} href={item.href} className="text-sm font-medium leading-6 text-white font-body">
                {item.name}
              </a>
            ))}
          </div>
          <div className="lg:flex-1 lg:justify-end">
          <a onClick={toggleModal} href={`#register`} className="text-sm font-semibold leading-6 text-lightGreen cursor-pointer">
            Registrarme <span aria-hidden="true">&rarr;</span>
          </a>
          </div>
        </nav>


         {/* Modal Pop-up */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <h2 className="text-xl font-bold mb-4">Registrarme en lista de espera</h2>

            {/* Form */}
            <form onSubmit={handleSubmit}>
              {/* <div className="mb-4">
                <label className="block text-sm font-bold mb-2" htmlFor="username">Username</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={userData.username}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div> */}

              <div className="mb-4">
                <label className="block text-sm font-bold mb-2" htmlFor="email">Mail</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={userData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-bold mb-2" htmlFor="firstName">Nombre</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={userData.firstName}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-bold mb-2" htmlFor="lastName">Apellido</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={userData.lastName}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>

              {/* <div className="mb-4">
                <label className="block text-sm font-bold mb-2" htmlFor="address">Direc</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={userData.address}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div> */}

              {/* <div className="mb-4">
                <label className="block text-sm font-bold mb-2" htmlFor="date_of_birth">Fecha de nacimiento</label>
                <input
                  type="date"
                  id="date_of_birth"
                  name="date_of_birth"
                  value={userData.date_of_birth}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div> */}

              <div className="mb-4">
                <label className="block text-sm font-bold mb-2" htmlFor="document">DNI</label>
                <input
                  type="text"
                  id="document"
                  name="document"
                  value={userData.document}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-bold mb-2" htmlFor="phone">Teléfono</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={userData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>

              <div className="flex justify-between items-center">
                <button type="button" onClick={toggleModal} className="px-4 py-2 bg-red-500 text-white rounded-lg">Cerrar</button>
                <button type="submit" className="px-4 py-2 bg-darkGreen text-white rounded-lg">Enviar</button>
              </div>
            </form>
          </div>
        </div>
      )}
        {/* <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
          <div className="fixed inset-0 z-50" />
          <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <a href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">Your Company</span>
                <img
                  alt=""
                  src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                  className="h-8 w-auto"
                />
              </a>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon aria-hidden="true" className="h-6 w-6" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
                <div className="py-6">
                  <a
                    href="#"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    Log in
                  </a>
                </div>
              </div>
            </div>
          </DialogPanel>
        </Dialog> */}
      </header>
  )
}
