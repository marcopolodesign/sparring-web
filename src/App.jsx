import { useState, useEffect } from 'react';
import './index.css';

import Hero from './components/Hero';
import Header from './components/Header';
import Footer from './components/Footer';
import VideoImage from './components/video-image';
import Modal from './components/RegisterModal';
import RegisterTournament from './components/RegisterTournament';
import TextImage from './components/text-image';
import Feature from './components/Feature';
import { initGA, logPageView } from './analytics'; // Import the Google Analytics functions

import SparringClubIcon from '/src/assets/icons/sparring-club';
import SparringCoachIcon from '/src/assets/icons/sparring-coach';


function App() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const [open, setOpen] = useState(false);
  const [loading, setLoading] =useState(true);


  useEffect(() => {
    if (window.location.href.includes('register-tournament')) {
      setOpenRegister(true);
    }
  }, []);
  const [openRegister, setOpenRegister] = useState(false);

  const showLoading = () => {
    console.log('Loading...');
    setOpen(true);
    setLoading(true);

    // Simple loading mock. You should add cleanup logic in real world.
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  const content1 = {
    features: [
      {
        title: "Matchmaking Personalizado",
        description: "Encontramos el compañero ideal para vos, adaptándonos a tus preferencias."
      },
      {
        title: "Reservá Canchas en Segundos",
        description: "Descubrí canchas y reservá según disponibilidad elegida."
      },
      {
        title: "Una Comunidad Activa de Paddle",
        description: "Formá parte de un grupo de jugadores con tu misma pasión y enterate de eventos y competiciones."
      }
    ],
    image: {
      alt: "Product screenshot",
      src: "../../assets/matches-grid.jpg",
    }
  }


  const content2 = {
    image: {
      alt: "Product screenshot",
      src: '../../assets/match-results.jpg',
    }
  }


  const content3 = {
    image: {
      alt: "Product screenshot",
      src: "../../assets/venue.jpg",
    }
  }

  const content4 = {
    image: {
      alt: "Calendario sparring club",
      src: "../../assets/calendar-sparring-club.png",
    }
  }

  const content5 = {
    image: {
      alt: "Calendario sparring Coaches",
      src: "../../assets/sparring-coach.png",
    }
  }




  useEffect(() => {
    initGA(); // Initialize Google Analytics
    logPageView(); // Log the first page view when the app loads

    window.addEventListener('popstate', logPageView);
    return () => {
      window.removeEventListener('popstate', logPageView);
    };
  }, []);

  return (
    <>
      <Header showLoading={showLoading} />
      <Hero showLoading={showLoading} />
      <VideoImage />
      <TextImage
        title={'Jugadores buscando jugadores'}
        mainHeading={'Jugá Mejor, Jugá Más'}
        description={"Sparring te conecta con los mejores compañeros de paddle en función de tu nivel, ubicación y horarios. No importa si sos principiante o avanzado, en Sparring siempre encontrás a alguien con quien jugar."}
        features={content1.features}
        image={content1.image}
        reverse={true} 
      />

      <TextImage
        title={'Descubrí nuevos partidos'}
        mainHeading={'Encuentra tu Partido Ideal en Paddle'}
        description={"Con Sparring, encontrar compañeros de paddle a tu nivel y disponibilidad nunca fue tan fácil. Ahora podés conectar, jugar y mejorar cada vez que quieras, desde donde estés. Sumate a una comunidad de apasionados y llevá tu juego al siguiente nivel."}
        // features={content1.features}
        image={content2.image}
      />

      <TextImage
        title={'Buscá canchas, sin ver un excel imposible'}
        mainHeading={'Reserva Rápido y Sin Complicaciones'}
        description={"Accedé a una red de canchas cerca de ti, consulta disponibilidad y elige el horario que mejor te convenga. Ahorra tiempo y asegura tu lugar para jugar en las mejores canchas."}
        // features={content1.features}
        image={content3.image}
        reverse={true} 
      />

      <Feature icon={<SparringClubIcon />} bgColor="blue" mainHeading={'Gestioná tu club gratis con SPARRING CLUB'} description={'Calendarizá tus horarios de manera automática y fácil, activá tus clientes y visualizá tus cobros para mejorar el rendimiento de tu club.'} image={content4.image}/>

      <Feature icon={<SparringCoachIcon />} bgColor="veryViolet" mainHeading={'La mejor herramienta para coaches de pádel '} description={'Tu agenda completa, en tu bolsillo. Visualizá tu disponibilidad y esperá a que tus alumnos nuevos se anoten.'} image={content5.image}/>
      <Footer />
      <Modal showLoading={showLoading} setOpen={setOpen} open={open}/>
      <RegisterTournament setOpenRegister={setOpenRegister} openRegister={openRegister}/>
    </>
  );
}

export default App;