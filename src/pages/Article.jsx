import React, { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ShieldCheck, Link2, Check } from 'lucide-react';
import Seo from '../components/Seo';
import JsonLd from '../components/JsonLd';
import { accentStyle } from '../theme';
import { SITE_URL } from '../lib/ui';
import { POSTS, postBySlug, formatDate } from '../blog/loader';
import { articleSchema, faqSchema, breadcrumbSchema } from '../lib/schema';

function Share({ title, url }) {
  const [copied, setCopied] = useState(false);
  const wa = `https://wa.me/?text=${encodeURIComponent(title + ' — ' + url)}`;
  const x = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch { /* noop */ }
  };

  return (
    <div className="share">
      <a className="share__btn share__btn--wa" href={wa} target="_blank" rel="noopener noreferrer">WhatsApp</a>
      <a className="share__btn share__btn--x" href={x} target="_blank" rel="noopener noreferrer">X</a>
      <button className="share__btn" onClick={copy}>
        {copied ? <Check size={15} /> : <Link2 size={15} />} {copied ? 'Copiado' : 'Copiar link'}
      </button>
    </div>
  );
}

export default function Article() {
  const { slug } = useParams();
  const post = postBySlug(slug);
  if (!post) return <Navigate to="/blog" replace />;

  const url = `${SITE_URL}/blog/${slug}`;
  const path = `/blog/${slug}`;
  const otros = POSTS.filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <div className="article" style={accentStyle('blue')}>
      <Seo title={`${post.title} | Revista Glup`} description={post.description} path={path} type="article" image={post.cover} />
      <JsonLd data={[
        articleSchema(post, path),
        faqSchema(post.faq),
        breadcrumbSchema([
          { name: 'Inicio', path: '/' },
          { name: 'Revista', path: '/blog' },
          { name: post.title, path },
        ]),
      ]} />

      <nav className="crumbs" aria-label="Ruta">
        <Link to="/">Inicio</Link><span>›</span>
        <Link to="/blog">Revista</Link><span>›</span>
        <span className="crumbs__current">{post.category}</span>
      </nav>

      <div className="article__wrap">
        <div className="article__badges">
          <span className="article__cat">{post.category}</span>
          <span className="article__reviewed"><ShieldCheck size={13} /> Revisado por el equipo de Glup</span>
        </div>

        <h1 className="article__title">{post.title}</h1>
        <p className="article__deck">{post.hero}</p>

        <div className="article__byline">
          <span className="article__avatar" aria-hidden="true">{post.emoji}</span>
          <div>
            <p className="article__author">Equipo de Glup</p>
            <p className="article__dates">
              Publicado el {formatDate(post.date)}
              {post.updated && post.updated !== post.date && ` · Actualizado el ${formatDate(post.updated)}`}
              {' · '}{post.read} min
            </p>
          </div>
        </div>

        <Share title={post.title} url={url} />

        <img className="article__cover" src={post.cover} alt={post.title} width="1200" height="675" loading="eager" />

        {post.summary && (
          <p className="article__summary"><b>En resumen:</b> {post.summary}</p>
        )}

        <article className="prose" dangerouslySetInnerHTML={{ __html: post.html }} />

        <section className="article__cta-box">
          <p>¿Listo para jugar?</p>
          <Link className="btn btn--solid btn--pill" to="/" style={accentStyle('blue')}>Abrir Glup Juegos</Link>
        </section>
      </div>

      {otros.length > 0 && (
        <section className="article__more">
          <p className="article__more-label">Más de la Revista Glup</p>
          <div className="article__more-grid">
            {otros.map((p) => (
              <Link key={p.slug} to={`/blog/${p.slug}`} className="article__more-link">
                <span className="article__more-emoji">{p.emoji}</span>
                <span>{p.title}</span>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
