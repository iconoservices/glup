import React, { useState, useMemo } from 'react';
import Seo from '../components/Seo';
import StoreHero from '../components/StoreHero';
import GameCard from '../components/GameCard';
import CatFilter from '../components/CatFilter';
import { accentStyle } from '../theme';
import { GAMES, searchGames } from '../catalog';

export default function Home() {
  const [query, setQuery] = useState('');
  const searching = query.trim().length > 0;
  const results = useMemo(() => searchGames(query), [query]);

  return (
    <div className="app">
      <Seo
        title="Glup! — Juegos para beber, para parejas y para grupos"
        description="Juegos para la previa, juegos eróticos para parejas y retos para grupos: botella borracha, yo nunca nunca, dados eróticos, verdad o reto y más. Gratis y sin descargar."
        path="/"
      />
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
              <h1 className="section-label" style={accentStyle('pink')}>🎲 Todos los juegos</h1>
              <div className="grid-2">
                {GAMES.map((g) => <GameCard key={g.slug} game={g} />)}
              </div>
            </section>
          </>
        )}
      </main>
    </div>
  );
}
