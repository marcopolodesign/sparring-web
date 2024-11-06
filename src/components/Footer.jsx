import React from 'react'
import SparringLogo from '../assets/icons/sparring-logo'

export default function Footer() {
const currentYear = new Date().getFullYear();

return (
    <div className="bg-lightGrey p-10 lg:px-10">
            <div className="mx-auto max-w-7xl px-6 lg:px-8 ">
                    <div className="flex  justify-between items-center w-full gap-8">
                            <div className="flex flex-col gap-6">
                                 <SparringLogo color={'#707070'}/>
                            </div>
                            <div className="flex flex-col gap-6">
                                    <div className="text-[#707070] text-lg font-normal font-body leading-7 sm:-mt-4">
                                    Sparring® {currentYear}. Todos los derechos reservados.
                                    </div>
                            </div>
                    </div>
            </div>
    </div>
)
}
