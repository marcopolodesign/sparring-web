import React from 'react'

export default function Nav() {

    const navItems = [
        { name: 'Home', href: '#' },
        { name: 'Partidos', href: '#' },
        { name: 'Mis Partidos', href: '#' },    ]
  return (
    <div className='fixed bottom-0 left-0 w-full py-4 border-t-[1px] border-t-slate-300 bg-white'>
        <nav className='flex justify-around gap-3'>
            {navItems.map((item) => (
                <a key={item.name} href = {item.href} className='text-sm font-semibold leading-6 text-lightGreen'>
                    {item.name}
                </a>
            ))}
        </nav>
    </div>
  )
}
