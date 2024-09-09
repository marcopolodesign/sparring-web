import { useState, useEffect } from 'react';
import './index.css';

import Hero from './components/Hero';
import Header from './components/Header';
import VideoImage from './components/video-image';
import Modal from './components/RegisterModal';
import { initGA, logPageView } from './analytics'; // Import the Google Analytics functions

function App() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const [open, setOpen] = useState(false);
  const [loading, setLoading] =useState(true);

  const showLoading = () => {
    console.log('Loading...');
    setOpen(true);
    setLoading(true);

    // Simple loading mock. You should add cleanup logic in real world.
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };



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
      <Modal showLoading={showLoading} setOpen={setOpen} open={open}/>
    </>
  );
}

export default App;