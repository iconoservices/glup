import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Seo from '../components/Seo';
import { accentStyle } from '../theme';
import { POSTS, postBySlug, formatDate } from '../blog/loader';

export default function Article() {
  const { slug } = useParams();
  const post = postBySlug(slug);
  if (!post) return <Navigate to="/blog" replace />;

  const otros = POSTS.filter((p) => p.slug !== slug).slice(0, 2);

  return (
    <div className="article" style={accentStyle('blue')}>
      <Seo title={`${post.title} | Revista Glup`} description={post.description} path={`/blog/${slug}`} />

      <Link to="/blog" className="article__back"><ArrowLeft size={16} /> Revista Glup</Link>

      <header className="article__head">
        <span className="article__emoji">{post.emoji}</span>
        <h1 className="article__title">{post.title}</h1>
        <p className="article__meta">{formatDate(post.date)} · {post.read} min de lectura</p>
      </header>

      <article className="prose" dangerouslySetInnerHTML={{ __html: post.html }} />

      {otros.length > 0 && (
        <section className="article__more">
          <p className="article__more-label">Seguí leyendo</p>
          {otros.map((p) => (
            <Link key={p.slug} to={`/blog/${p.slug}`} className="article__more-link">
              <span>{p.emoji}</span> {p.title}
            </Link>
          ))}
        </section>
      )}
    </div>
  );
}
