import React, { useState } from 'react';
import Logo from '../assets/icons/logo.svg';

export default function Header({ showLoading }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigation = [
    { name: 'Home', href: '#' },
    { name: 'Features', href: '#' },
    { name: 'Pricing', href: '#' },
    { name: 'Contact', href: '#' },
  ];

  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <nav aria-label="Global" className="flex items-center justify-between p-6 lg:px-8">
        <div className="flex lg:flex-1">
          <a href="#" className="-m-1.5 p-1.5">
            <img alt="Sparring Logo" src={Logo} className="h-12 w-auto" />
          </a>
        </div>
        <div className="lg:justify-end">
          {/* Modified Registrarme Link to open the modal */}
          <a
            onClick={(e) => {
              e.preventDefault(); // Prevent default anchor behavior
              showLoading(); // Open the modal
            }}
            href="#register"
            className="text-sm font-semibold leading-6 text-lightGreen cursor-pointer"
          >
            Registrarme <span aria-hidden="true">&rarr;</span>
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