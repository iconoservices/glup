import React from 'react';
import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import Logo from '../components/Logo';
import { accentStyle } from '../theme';

const APPS = [
  {
    to: '/glup',
    accent: 'blue',
    glyph: '🍸',
    name: 'Glup!',
    tagline: 'Juegos para beber, parejas y grupos',
    desc: 'Botella borracha, yo nunca nunca, dados eróticos, ruleta de castigos y más. 9 juegos gratis, sin descargar.',
  },
  {
    to: '/verdad-o-reto-18',
    accent: 'pink',
    glyph: '🔥',
    name: 'Verdad o Reto +18',
    tagline: 'El clásico, sin filtro',
    desc: 'Verdad o reto para adultos con 6 niveles: suave, atrevido, hardcore, loco, pareja y 4play. Con los nombres de tus amigos.',
  },
];

export default function Hub() {
  return (
    <div className="hub">
      <Seo
        title="Boga Hub — mini apps de juegos para fiestas y parejas"
        description="Colección de mini apps para jugar en fiestas, en pareja y en grupo. Verdad o reto, botella borracha, yo nunca nunca y más. Gratis y sin descargar."
        path="/"
      />

      <header className="hub__head">
        <Logo size={40} />
        <h1 className="hub__title">Boga Hub</h1>
        <p className="hub__sub">Mini apps para jugar. Elige una:</p>
      </header>

      <div className="hub__list">
        {APPS.map((a) => (
          <Link key={a.to} to={a.to} className="hub-card" style={accentStyle(a.accent)}>
            <div className="hub-card__icon">{a.glyph}</div>
            <div className="hub-card__body">
              <h2 className="hub-card__name">{a.name}</h2>
              <p className="hub-card__tagline">{a.tagline}</p>
              <p className="hub-card__desc">{a.desc}</p>
              <span className="hub-card__cta">Abrir →</span>
            </div>
          </Link>
        ))}
      </div>

      <p className="hub__foot">+18 · Gratis · Sin descargar · Cada app se puede instalar por separado</p>
    </div>
  );
}
