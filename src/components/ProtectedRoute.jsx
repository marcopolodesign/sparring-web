// ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('user')); // Check if the user is logged in

  if (!user) {
    // If no user is found, redirect to the login page
    return <Navigate to="/log-in" />;
  }

  // If user is logged in, render the children
  return children;
};

export default ProtectedRoute;