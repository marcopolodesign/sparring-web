// src/components/LoginForm.jsx
import React, { useState } from 'react';
import { loginUser, fetchUser } from '../api/functions';
import Logo from '../assets/icons/logo-v.svg';
import { useNavigate } from 'react-router-dom';

function LoginForm({ setUser }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      setIsUpdating(true);
      const data = await loginUser(username, password);
      const userData = await fetchUser(data.user.id);

      setUser(userData); // Pass user data back to the parent component
      // pass it lo the localStorage
      localStorage.setItem('user', JSON.stringify(userData)); // Store user data in localStorage

      // Redirect the user to the home
   
      navigate('/fupa/home', { replace: true });
      setIsUpdating(false);
    } catch (error) {
      setIsUpdating(false);
      alert(`Error logging in: ${error.message}`);
    }
  };

  return (
    <div className="bg-darkGreen min-h-svh px-6 py-12 lg:px-8">
       <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            alt="Your Company"
            src={Logo}
            className="mx-auto h-15 w-auto"
          />
        </div>
        
    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form onSubmit={handleLogin} className="space-y-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium leading-6 text-white text-body">
            Mail
          </label>
          <div className="mt-2">
            <input
              id="email"
              name="email"
              type="email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder='Ingresá el mail con el que te registraste'
              autoComplete="email"
              className="block w-full rounded-lg border-0 p-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-lightGreen sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="block text-sm font-medium leading-6 text-white text-body">
              Contraseña
            </label>
            <div className="text-sm">
              {/* <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                Forgot password?
              </a> */}
            </div>
          </div>
          <div className="mt-2">
            <input
              id="password"
              name="password"
              type="password"
              placeholder='Ingresá tu DNI sin puntos ni espacios'
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              className="block w-full rounded-lg border-0 p-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-lightGreen sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-lightGreen px-3 py-4 text-md font-semibold leading-6 text-darkGreen text-body shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            disabled={isUpdating}
          >
            {isUpdating ? 'Cargando...' : 'Iniciar sesión'}
          </button>
        </div>
      </form>

      <p className="mt-10 text-center text-sm text-white">
        {/* Olvidaste tu contraseña? Probá con tu DNI.{' '} */}
        <span className="leading-6">
          Si tenes problemas para ingresar, <a className="underline text-lightGreen font-semibold" href="https://api.whatsapp.com/send?phone=+5491146734407">ponete en contacto</a>
        </span> 
      </p>
    </div>
    </div>
  );
}

export default LoginForm;
