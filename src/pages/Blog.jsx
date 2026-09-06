import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import JsonLd from '../components/JsonLd';
import MagNav from '../components/MagNav';
import { SITE_URL } from '../lib/ui';
import { POSTS, formatDate } from '../blog/loader';

export default function Blog() {
  const [lead, ...rest] = POSTS;

  useEffect(() => {
    document.documentElement.dataset.route = 'mag';
    return () => { delete document.documentElement.dataset.route; };
  }, []);

  const blogSchema = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'Revista Glup',
    url: SITE_URL + '/blog',
    inLanguage: 'es',
    blogPost: POSTS.map((p) => ({
      '@type': 'BlogPosting',
      headline: p.title,
      url: SITE_URL + '/blog/' + p.slug,
      datePublished: p.date,
    })),
  };

  return (
    <div className="mag">
      <Seo
        title="Revista Glup — guías y listas de juegos para fiestas, parejas y grupos"
        description="Guías, listas y trucos: los mejores juegos eróticos para parejas, juegos para la previa, verdad o reto, yo nunca nunca y más. Ideas para jugar hoy."
        path="/blog"
      />
      <JsonLd data={blogSchema} />

      <MagNav />

      <div className="mag__wrap">
        <header className="mag__head">
          <p className="mag__eyebrow">Revista Glup</p>
          <h1 className="mag__title">Guías y listas para jugar</h1>
          <p className="mag__sub">Ideas para fiestas, para parejas y para grupos. Todo lleva a un juego que podés abrir al toque.</p>
        </header>

        {lead && (
          <Link to={`/blog/${lead.slug}`} className="mag-lead">
            <img className="mag-lead__img" src={lead.cover} alt={lead.title} width="1200" height="675" loading="eager" />
            <div className="mag-lead__overlay">
              <h2 className="mag-lead__title">{lead.title}</h2>
              <p className="mag-lead__meta">{lead.category} · {formatDate(lead.date)} · {lead.read} min</p>
            </div>
          </Link>
        )}

        <div className="mag__grid">
          {rest.map((p) => (
            <Link key={p.slug} to={`/blog/${p.slug}`} className="mag-card">
              <img className="mag-card__img" src={p.cover} alt={p.title} width="1200" height="675" loading="lazy" />
              <div className="mag-card__body">
                <h2 className="mag-card__title">{p.title}</h2>
                <p className="mag-card__meta">{p.category} · {formatDate(p.date)} · {p.read} min</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
