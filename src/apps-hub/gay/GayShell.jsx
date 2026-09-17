import React from 'react';
import { Outlet } from 'react-router-dom';

// Envoltura de "Juegos Gay +18": scope del tema solo hombres.
export default function GayShell() {
  return (
    <div className="vor gay" data-app="gay">
      <Outlet />
    </div>
  );
}
