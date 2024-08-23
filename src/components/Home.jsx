// src/components/Authenticated.jsx
import React from 'react';

function Authenticated({ user, setUser }) {
  const handleLogout = () => {
    setUser(null); // Clear the user state to log out
    // Optionally, you could also clear tokens from localStorage if you're storing JWT tokens
    // localStorage.removeItem('token');
  };

  return (
    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
      <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        Hello {user.firstName}
      </h2>
      <button
        onClick={handleLogout}
        className="mt-4 w-full justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
      >
        Log out
      </button>
    </div>
  );
}

export default Authenticated;
