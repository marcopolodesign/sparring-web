import React from 'react';
import { Button } from '../styled';
import iPhoneHomeImage from '/src/assets/images/iphone-home.png';

export default function Hero({ showLoading }) {
  return (
    <div className="bg-darkGreen min-h-svh flex flex-col justify-between">
      <div className="mx-auto max-w-3xl pt-32 sm:pt-32 lg:pt-32">
        <div className="text-center">
          <h1 className="text-5xl px-4 font-bold tracking-normal text-lightGreen uppercase font-display sm:text-8xl">
            Conectá con jugadores y elevá tu nivel
          </h1>
          <p className="mt-6 text-lg leading-8 text-white font-body px-4">
          Sparring es la plataforma definitiva para conectar jugadores, gestionar clubes y organizar torneos en un solo lugar. Buscá gente con quien jugar, alquilá canchas, conseguí profesores y anotate en torneos.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button onClick={ () => {
              showLoading();
            }} 
            $primary="true">Registrarme en lista de espera</Button>
          </div>
        </div>
      </div>
      <div className="px-20 pt-16 sm:pt-18 mx-auto w-full sm:w-[45%]">
        <img className="mx-auto" src={iPhoneHomeImage} />
      </div>
    </div>
  );
}