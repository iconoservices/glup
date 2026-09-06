import React from 'react';
import { Outlet } from 'react-router-dom';
import TabBar from './TabBar';

// Contenedor de la sección Glup! (juegos) dentro del hub.
export default function GlupShell() {
  return (
    <>
      <Outlet />
      <TabBar />
    </>
  );
}
