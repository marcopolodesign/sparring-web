import React from 'react';
import { Outlet } from 'react-router-dom';
import Nav from './Nav';

const Container = () => {
  return (
    <div>
      <Nav />  {/* Your navigation bar */}
      <Outlet />  {/* This renders the child route components */}
    </div>
  );
};

export default Container;