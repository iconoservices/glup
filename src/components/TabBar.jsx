import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Home, Users, Settings } from 'lucide-react';
import { GAMES } from '../catalog';
import { useSettings } from '../context/useSettings';

const gameSlugs = new Set(GAMES.map((g) => g.slug));

export default function TabBar() {
  const { pathname } = useLocation();
  const { jugadores, openJugadores } = useSettings();

  // Las pantallas de juego ocupan todo el alto: sin nav
  const slug = pathname.replace(/^\/+/, '');
  if (gameSlugs.has(slug)) return null;

  return (
    <nav className="tabbar">
      <NavLink to="/" end className={({ isActive }) => `tab${isActive ? ' is-on' : ''}`}>
        <Home size={22} strokeWidth={1.75} /><span>Inicio</span>
      </NavLink>
      <button className="tab" onClick={() => openJugadores()}>
        <Users size={22} strokeWidth={1.75} />
        <span>{jugadores.length > 0 ? `(${jugadores.length})` : 'Jugadores'}</span>
      </button>
      <NavLink to="/ajustes" className={({ isActive }) => `tab${isActive ? ' is-on' : ''}`}>
        <Settings size={22} strokeWidth={1.75} /><span>Ajustes</span>
      </NavLink>
    </nav>
  );
}
