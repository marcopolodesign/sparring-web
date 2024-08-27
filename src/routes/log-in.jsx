// src/App.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../index.css';
import Logo from '../assets/icons/logo-v.svg';
import LoginForm from '../components/LogInForm';
import Authenticated from '../components/Home';

const LogIn = ()=> {
  const [user, setUser] = useState(null); // State to store user information

  const navigate = useNavigate();
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // Set user state if user data exists in localStorage
    }
  }, []);


  return (
    <>
      <div className={`flex min-h-full flex-1 flex-col justify-center w-screen ${!user && 'px-6 py-12 lg:px-8'} `}>
        {user ? (
          <>
          <Authenticated user={user} setUser={setUser} />
          {navigate('/inicio', { replace: true })}
          </>
        ) : (
          <LoginForm setUser={setUser} />
        )}
      </div>
    </>
  );
}

export default LogIn;
