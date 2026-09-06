import React, { useState, useMemo } from 'react';
import { Navigate } from 'react-router-dom';
import Seo from '../components/Seo';
import StoreHero from '../components/StoreHero';
import GameCard from '../components/GameCard';
import CatFilter from '../components/CatFilter';
import { accentStyle } from '../theme';
import { categoryById, gamesByCategory, searchGames } from '../catalog';

const COPY = {
  fiesta: {
    title: 'Juegos para la previa y para tomar | Glup!',
    desc: 'Los mejores juegos para tomar en la previa y en fiestas: yo nunca nunca, botella borracha, ruleta de shots y más. Gratis, sin descargar.',
  },
  parejas: {
    title: 'Juegos eróticos para parejas online | Glup!',
    desc: 'Juegos para parejas para salir de la rutina: dados eróticos, verdad o reto picante y preguntas hot. Gratis y sin descargar.',
  },
  grupos: {
    title: 'Juegos para grupos de amigos (+18) | Glup!',
    desc: 'Juegos para grupos con confianza: verdad o reto extremo, modo caos y retos grupales. Gratis y sin descargar.',
  },
};

export default function CategoryPage({ catId }) {
  const [query, setQuery] = useState('');
  const searching = query.trim().length > 0;
  const results = useMemo(() => searchGames(query), [query]);

  const cat = categoryById(catId);
  if (!cat) return <Navigate to="/" replace />;

  const games = gamesByCategory(catId);
  const copy = COPY[catId];

  return (
    <div className="app">
      <Seo title={copy.title} description={copy.desc} path={`/${catId}`} />
      <StoreHero query={query} onQuery={setQuery} />

      <main className="store">
        {searching ? (
          <>
            <p className="section-label" style={accentStyle('pink')}>
              {results.length > 0 ? `Resultados para "${query.trim()}"` : `Nada para "${query.trim()}"`}
            </p>
            <div className="grid-2">
              {results.map((g) => <GameCard key={g.slug} game={g} />)}
            </div>
          </>
        ) : (
          <>
            <CatFilter />
            <section className="store-section">
              <h1 className="section-label" style={accentStyle(cat.accent)}>{cat.emoji} {cat.label}</h1>
              <p className="store-section__lead">{cat.tagline}.</p>
              <div className="grid-2">
                {games.map((g) => <GameCard key={g.slug} game={g} />)}
              </div>
            </section>
          </>
        )}
      </main>
    </div>
  );
}
