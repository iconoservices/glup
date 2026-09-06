import React from 'react';
import { Outlet } from 'react-router-dom';

// Envoltura de "Juegos para Tríos +18": scope del tema violeta.
export default function TriosShell() {
  return (
    <div className="vor trios" data-app="trios">
      <Outlet />
    </div>
  );
}
