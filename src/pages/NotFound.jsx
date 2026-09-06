import React from 'react';
import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import { accentStyle } from '../theme';

export default function NotFound() {
  return (
    <div className="game" style={accentStyle('blue')}>
      <Seo title="Página no encontrada | Glup!" description="Esta página no existe en Glup!." path="/404" />
      <div className="empty">
        <div style={{ fontSize: '3.5rem' }}>🫥</div>
        <h2>Aquí no hay nada</h2>
        <p>La página que buscas no existe o se movió.</p>
        <Link className="btn btn--solid btn--pill" to="/" style={accentStyle('blue')}>Ir al inicio</Link>
      </div>
    </div>
  );
}
