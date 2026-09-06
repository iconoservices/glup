import React from 'react';
import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import Logo from '../components/Logo';
import { accentStyle } from '../theme';
import { stars } from '../lib/ui';

const APPS = [
  {
    to: '/glup',
    accent: 'blue',
    glyph: '🍸',
    name: 'Glup!',
    badge: 'Estable',
    rating: '4.8',
    chip: 'Fiesta',
    version: 'v1.0',
    desc: 'Botella borracha, yo nunca nunca, dados eróticos y más. 9 juegos para beber, en pareja y en grupo.',
  },
  {
    to: '/verdad-o-reto-18',
    accent: 'pink',
    glyph: '🔥',
    name: 'Verdad o Reto +18',
    badge: 'Beta',
    rating: '4.6',
    chip: '+18',
    version: 'v1.0',
    desc: 'Verdad o reto para adultos con 6 niveles y los nombres de tus amigos. De suave a 4play.',
  },
];

export default function Hub() {
  return (
    <div className="hub">
      <Seo
        title="Glup Juegos — juegos para fiestas, parejas y grupos (+18)"
        description="Juegos para fiestas, para parejas y para grupos: verdad o reto +18, botella borracha, yo nunca nunca, dados eróticos y más. Gratis, online y sin descargar."
        path="/"
      />

      <header className="hub__hero">
        <Logo size={46} />
        <h1 className="hub__title">Glup Juegos</h1>
        <p className="hub__sub">Juegos para fiestas, para parejas y para grupos. Gratis, online, sin descargar.</p>
      </header>

      <div className="hub__grid">
        {APPS.map((a) => (
          <Link key={a.to} to={a.to} className="hub-card" style={accentStyle(a.accent)}>
            <div className="hub-card__cover">
              <span className="glyph">{a.glyph}</span>
              <span className="hub-card__badge">{a.badge}</span>
            </div>
            <div className="hub-card__body">
              <h2 className="hub-card__name">{a.name}</h2>
              <div className="hub-card__rating"><span className="stars">{stars(a.rating)}</span> {a.rating}</div>
              <p className="hub-card__desc">{a.desc}</p>
              <div className="hub-card__meta">
                <span className="hub-card__chip">{a.chip}</span>
                <span>{a.version}</span>
              </div>
              <span className="hub-card__cta">Abrir</span>
            </div>
          </Link>
        ))}
      </div>

      <Link to="/blog" className="hub__revista">📰 Revista Glup — guías y listas para jugar</Link>

      <p className="hub__foot">+18 · Gratis · Sin descargar · Cada juego se puede instalar por separado</p>
    </div>
  );
}
