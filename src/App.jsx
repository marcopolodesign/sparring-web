import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './index.css'

import Hero from './components/Hero'
import Header from './components/Header'
import VideoImage from './components/video-image'
import { initGA, logPageView } from './analytics'; // Import the Google Analytics functions


function App() {
  const [count, setCount] = useState(0)


  useEffect(() => {
    initGA(); // Initialize Google Analytics
    logPageView(); // Log the first page view when the app loads

    // Log a page view when the route changes (if you're using React Router)
    window.addEventListener('popstate', () => {
      logPageView();
    });

    return () => {
      window.removeEventListener('popstate', logPageView);
    };
  }, []);


  return (
    <>
    <Header />
    <Hero />
    <VideoImage />
    </>
  )
}

export default App
