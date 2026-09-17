import React from 'react';
import { Outlet } from 'react-router-dom';

// Envoltura de "Sin Límites +18": scope del tema rojo/negro.
export default function SinLimitesShell() {
  return (
    <div className="vor trios sinlimites" data-app="sinlimites">
      <Outlet />
    </div>
  );
}
