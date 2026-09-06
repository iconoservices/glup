import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Home, Users, Settings } from 'lucide-react';
import { GAMES } from '../catalog';
import { useSettings } from '../context/useSettings';

const gamePaths = new Set(GAMES.map((g) => `/glup/${g.slug}`));

// Nav inferior de la sección Glup!
export default function TabBar() {
  const { pathname } = useLocation();
  const { jugadores, openJugadores } = useSettings();

  // Las pantallas de juego ocupan todo el alto: sin nav
  if (gamePaths.has(pathname.replace(/\/$/, ''))) return null;

  return (
    <nav className="tabbar">
      <NavLink to="/glup" end className={({ isActive }) => `tab${isActive ? ' is-on' : ''}`}>
        <Home size={22} strokeWidth={1.75} /><span>Inicio</span>
      </NavLink>
      <button className="tab" onClick={() => openJugadores()}>
        <Users size={22} strokeWidth={1.75} />
        <span>{jugadores.length > 0 ? `(${jugadores.length})` : 'Jugadores'}</span>
      </button>
      <NavLink to="/glup/ajustes" className={({ isActive }) => `tab${isActive ? ' is-on' : ''}`}>
        <Settings size={22} strokeWidth={1.75} /><span>Ajustes</span>
      </NavLink>
    </nav>
  );
}
