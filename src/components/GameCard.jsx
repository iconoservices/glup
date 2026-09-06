import React from 'react';
import { Link } from 'react-router-dom';
import { accentStyle } from '../theme';
import { glyphFor, stars } from '../lib/ui';

// Tarjeta de juego (estilo tienda de apps, texto rico para SEO).
// Enlaza a /<slug> — cada juego es su propia página.
export default function GameCard({ game }) {
  const badge = game.soon ? 'Pronto' : game.beta ? 'Beta' : 'Estable';

  const inner = (
    <>
      <div className="gcard__cover">
        <span className="glyph">{glyphFor(game)}</span>
        <span className={`gcard__badge${game.soon ? ' gcard__badge--soon' : ''}`}>{badge}</span>
      </div>
      <div className="gcard__body">
        <h3 className="gcard__title">{game.title}</h3>
        <div className="gcard__rating"><span className="stars">{stars(game.rating)}</span> {game.rating}</div>
        <p className="gcard__desc">{game.seo}</p>
        <div className="gcard__meta">
          <span className="gcard__chip">{game.chip}</span>
          <span>{game.soon ? 'v0.1' : 'v1.0'}</span>
        </div>
        <span className={`gcard__cta${game.soon ? ' gcard__cta--soon' : ''}`}>
          {game.soon ? 'Avísame' : 'Jugar'}
        </span>
      </div>
    </>
  );

  return (
    <article className={`gcard${game.soon ? ' is-soon' : ''}`} style={accentStyle(game.accent)}>
      <Link className="gcard__link" to={`/${game.slug}`} aria-label={game.title}>
        {inner}
      </Link>
    </article>
  );
}
