import React, { useState, useEffect } from 'react';
import Logo from '../assets/icons/logo.svg';

export default function Header({ showLoading }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigation = [
    { name: 'Home', href: '#' },
    { name: 'Features', href: '#' },
    { name: 'Pricing', href: '#' },
    { name: 'Contact', href: '#' },
  ];

  const checkHashForRegister = () => {
    if (window.location.hash === '#register') {
      showLoading();
    }}


    useEffect(() => {
      // Check the hash when the component mounts
      checkHashForRegister();
  
      // Listen for hash changes
      window.addEventListener('hashchange', checkHashForRegister);
  
      // Clean up the event listener on component unmount
      return () => {
        window.removeEventListener('hashchange', checkHashForRegister);
      };
    }, []);

  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <nav aria-label="Global" className="flex items-center justify-between p-6 lg:px-8">
        <div className="flex lg:flex-1">
          <a href="#" className="-m-1.5 p-1.5">
            <img alt="Sparring Logo" src={Logo} className="h-12 w-auto" />
          </a>
        </div>
        <div className="lg:justify-end">
          {/* Modified Registrarme Link to handle Android and iOS */}
          <a
            onClick={(e) => {
              e.preventDefault(); // Prevent default anchor behavior
              if (/android/i.test(navigator.userAgent)) {
                showLoading(); // Call showLoading for Android
              } else {
                window.location.href = 'https://apps.apple.com/us/app/sparring-descubr%C3%AD-jugadores/id6554008323';
              }
            }}
            href="#register"
            className="text-md font-semibold leading-6 text-lightGreen cursor-pointer"
          >
            {/android/i.test(navigator.userAgent) ? 'Registrarme' : 'Descargar'} <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
        <div className="!hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <a key={item.name} href={item.href} className="text-sm font-medium leading-6 text-white font-body">
              {item.name}
            </a>
          ))}
        </div>
      </nav>
    </header>
  );
}