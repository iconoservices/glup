import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import { REVISTA_BUILD, GAMES_ORIGIN } from '../lib/buildMode';

// Barra superior de la Revista — mismo estilo que el home.
// Cuando la Revista vive en su propio dominio (REVISTA_BUILD), los enlaces a
// los juegos tienen que ser absolutos: acá /glup no existe.
export default function MagNav() {
  return (
    <nav className="mag-nav">
      <Link to="/" className="mag-nav__brand"><Logo size={24} /> Glup Juegos</Link>
      <div className="mag-nav__links">
        {REVISTA_BUILD ? (
          <>
            <a href={GAMES_ORIGIN + '/glup'}>Juegos</a>
            <a href={GAMES_ORIGIN + '/verdad-o-reto-18'}>Verdad o Reto</a>
          </>
        ) : (
          <>
            <Link to="/glup">Juegos</Link>
            <Link to="/verdad-o-reto-18">Verdad o Reto</Link>
            <Link to="/blog">Revista</Link>
          </>
        )}
      </div>
    </nav>
  );
}
