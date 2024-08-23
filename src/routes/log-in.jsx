// src/App.jsx
import React, { useState } from 'react';
import '../index.css';
import Logo from '../assets/icons/logo-v.svg';
import LoginForm from '../components/LogInForm';
import Authenticated from '../components/Home';

const LogIn = ()=> {
  const [user, setUser] = useState(null); // State to store user information

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            alt="Your Company"
            src={Logo}
            className="mx-auto h-15 w-auto"
          />
        </div>

        {user ? (
          <Authenticated user={user} setUser={setUser} />
        ) : (
          <LoginForm setUser={setUser} />
        )}
      </div>
    </>
  );
}

export default LogIn;
