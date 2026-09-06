import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { SettingsProvider } from './context/SettingsContext';
import TabBar from './components/TabBar';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

// Layout raíz: provee la configuración de sesión y la barra inferior.
export default function App() {
  return (
    <SettingsProvider>
      <ScrollToTop />
      <Outlet />
      <TabBar />
    </SettingsProvider>
  );
}
