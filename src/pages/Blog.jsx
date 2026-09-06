import React from 'react';
import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import HubLink from '../components/HubLink';
import { accentStyle } from '../theme';
import { POSTS, formatDate } from '../blog/loader';

export default function Blog() {
  const [lead, ...rest] = POSTS;

  return (
    <div className="mag">
      <Seo
        title="Revista Glup — guías y listas de juegos para fiestas, parejas y grupos"
        description="Guías, listas y trucos: los mejores juegos eróticos para parejas, juegos para la previa, verdad o reto, yo nunca nunca y más. Ideas para jugar hoy."
        path="/blog"
      />

      <div className="mag__wrap">
        <HubLink />
        <header className="mag__head">
          <p className="mag__eyebrow">Revista Glup</p>
          <h1 className="mag__title">Guías y listas para jugar</h1>
          <p className="mag__sub">Ideas para fiestas, para parejas y para grupos. Todo lleva a un juego que podés abrir al toque.</p>
        </header>

        {lead && (
          <Link to={`/blog/${lead.slug}`} className="mag-lead" style={accentStyle('blue')}>
            <div className="mag-lead__media">{lead.emoji}</div>
            <div className="mag-lead__body">
              <span className="mag-lead__cat">{lead.category}</span>
              <h2 className="mag-lead__title">{lead.title}</h2>
              <p className="mag-lead__hero">{lead.hero}</p>
              <p className="mag-lead__meta">{formatDate(lead.date)} · {lead.read} min de lectura</p>
            </div>
          </Link>
        )}

        <div className="mag__grid">
          {rest.map((p) => (
            <Link key={p.slug} to={`/blog/${p.slug}`} className="mag-card" style={accentStyle(p.category === 'Pareja' ? 'pink' : p.category === 'Verdad o Reto' ? 'pink' : 'blue')}>
              <div className="mag-card__emoji">{p.emoji}</div>
              <div className="mag-card__body">
                <span className="mag-card__cat">{p.category}</span>
                <h2 className="mag-card__title">{p.title}</h2>
                <p className="mag-card__hero">{p.hero}</p>
                <p className="mag-card__meta">{formatDate(p.date)} · {p.read} min</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
