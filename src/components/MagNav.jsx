import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';

// Barra superior de la Revista — mismo estilo que el home.
export default function MagNav() {
  return (
    <nav className="mag-nav">
      <Link to="/" className="mag-nav__brand"><Logo size={24} /> Glup Juegos</Link>
      <div className="mag-nav__links">
        <Link to="/glup">Juegos</Link>
        <Link to="/verdad-o-reto-18">Verdad o Reto</Link>
        <Link to="/blog">Revista</Link>
      </div>
    </nav>
  );
}
