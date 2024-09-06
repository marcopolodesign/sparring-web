import React from 'react'
import {Button} from '../styled'
import iPhoneHomeImage from '/src/assets/images/iphone-home.png';


export default function Hero() {
  return (
    // <div className="bg-darkGreen min-h-svh pt-40 w-full font-display">
    //   Hero
    // </div>
<div className="bg-darkGreen">
    <div className="mx-auto max-w-3xl pt-32 sm:pt-32 lg:pt-32">
          <div className="hidden sm:mb-8 sm:flex sm:justify-center">
            {/* <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
              Announcing our next round of funding.{' '}
              <a href="#" className="font-semibold text-indigo-600">
                <span aria-hidden="true" className="absolute inset-0" />
                Read more <span aria-hidden="true">&rarr;</span>
              </a>
            </div> */}
          </div>
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-normal text-lightGreen uppercase font-display sm:text-8xl">
              No te quedes nunca más con las ganas de jugar 
            </h1>
            <p className="mt-6 text-lg leading-8 text-white font-body">
            Bienvenido a la comunidad más grande de deportes de raqueta de Latinoamérica. Buscá gente con quien jugar, alquilá canchas, conseguí profesores y anotate en torneos. 
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button $primary="true">Registrarme en lista de espera</Button>
              {/* <a
                href="#"
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Get started
              </a> */}
            </div>
          </div>
        </div>
       
       <div className="px-20 pt-16 sm:pt-18 mx-auto w-full sm:w-[45%] ">
        <img className="mx-auto" src={iPhoneHomeImage} />
       </div>
      </div>
  )
}
