import React from 'react';
import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import HubLink from '../components/HubLink';
import { accentStyle } from '../theme';
import { POSTS, formatDate } from '../blog/loader';

export default function Blog() {
  return (
    <div className="mag">
      <Seo
        title="Revista Glup — guías y listas de juegos para fiestas, parejas y grupos"
        description="Guías, listas y trucos: los mejores juegos eróticos para parejas, juegos para la previa, verdad o reto, yo nunca nunca y más. Ideas para jugar hoy."
        path="/blog"
      />

      <HubLink />
      <header className="mag__head">
        <p className="mag__eyebrow">Revista Glup</p>
        <h1 className="mag__title">Guías y listas para jugar</h1>
        <p className="mag__sub">Ideas para fiestas, para parejas y para grupos. Todo lleva a un juego que podés abrir al toque.</p>
      </header>

      <div className="mag__grid">
        {POSTS.map((p, i) => (
          <Link key={p.slug} to={`/blog/${p.slug}`} className={`mag-card${i === 0 ? ' mag-card--lead' : ''}`} style={accentStyle(i % 2 ? 'pink' : 'blue')}>
            <div className="mag-card__emoji">{p.emoji}</div>
            <div className="mag-card__body">
              <h2 className="mag-card__title">{p.title}</h2>
              <p className="mag-card__hero">{p.hero}</p>
              <p className="mag-card__meta">{formatDate(p.date)} · {p.read} min de lectura</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
