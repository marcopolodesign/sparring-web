import React from 'react'
import { NavLink } from 'react-router-dom';
import HomeIcon from '../../assets/icons/home';

export default function Nav() {

    const navItems = [
        { name: 'Inicio', href: '/inicio', icon: <HomeIcon /> },
        { name: 'Torneo', href: '/torneo' },
        { name: 'Partidos', href: '/partidos' },    ]
  return (
    <div className='fixed bottom-0 left-0 w-full py-4 border-t-[1px] border-t-slate-300 bg-white'>
    <nav className='flex justify-around gap-3 items-start'>
    {navItems.map((item) => (
        <NavLink
        key={item.name}
        to={item.href}
        className={({ isActive }) => `${isActive ? 'text-blue font-medium' : 'text-gray-500 font-normal'} flex flex-col items-center gap-1`}
        >
        {item.icon}
        {item.name}
        </NavLink>
            ))}
        </nav>
    </div>
  )
}
