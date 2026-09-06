import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { SettingsProvider } from './context/SettingsContext';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

// Layout raíz del hub: provee la configuración de sesión (jugadores, etc.)
// compartida entre todas las apps.
export default function App() {
  return (
    <SettingsProvider>
      <ScrollToTop />
      <Outlet />
    </SettingsProvider>
  );
}
