import React from 'react';
import { Outlet } from 'react-router-dom';

// Envoltura de "Verdad o Reto +18": scope del tema rojo.
export default function VorShell() {
  return (
    <div className="vor" data-app="vor">
      <Outlet />
    </div>
  );
}
