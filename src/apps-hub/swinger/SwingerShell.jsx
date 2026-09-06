import React from 'react';
import { Outlet } from 'react-router-dom';

// Envoltura de "Fiestas Swinger": scope del tema turquesa.
export default function SwingerShell() {
  return (
    <div className="vor swinger" data-app="swinger">
      <Outlet />
    </div>
  );
}
