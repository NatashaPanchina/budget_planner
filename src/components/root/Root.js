import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../header/Header';
import Navigation from '../navigation/Navigation';

export default function Root() {
  return (
    <div>
      <Header />
      <Navigation />
      <Outlet />
    </div>
  );
}
