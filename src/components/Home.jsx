// src/components/Authenticated.jsx
import React, { useEffect, useState } from 'react';
import Nav from './fuba/Nav';
import Header from './fuba/Header';

import { getCurrentTournament } from '../api/functions';

const Authenticated = ({ user, setUser }) => {

 const [tournament, setTournament] = useState(null);
  // console.log(user, 'testing')
  const handleLogout = () => {
    setUser(null); // Clear the user state to log out
    // Optionally, you could also clear tokens from localStorage if you're storing JWT tokens
    // localStorage.removeItem('token');
  };

  useEffect(() => {
    const fetchTournaments = async () => {
      try {
        const tournaments = await getCurrentTournament(1);
        console.log(tournaments.sponsors);
        setTournament(tournaments);
        localStorage.setItem('tournament', JSON.stringify(tournaments));
      } catch (error) {
        console.error('Error fetching tournaments:', error.message);
      }
    };

    fetchTournaments();
  }
  , [0]);

  return (
    <div className="sm:mx-auto w-full sm:max-w-sm bg-blue">
      <Header tournament={tournament} />
   
      {/* <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        Hello {user.firstName}
      </h2> */}
{/* 
      <button
        onClick={handleLogout}
        className="mt-4 w-full justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
      >
        Log out
      </button> */}

      <Nav />
    </div>
  );
}

export default Authenticated;
