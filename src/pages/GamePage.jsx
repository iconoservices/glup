import React, { Suspense } from 'react';
import { useParams, useNavigate, Link, Navigate } from 'react-router-dom';
import { ArrowLeft, Users, Bell } from 'lucide-react';
import Seo from '../components/Seo';
import { accentStyle } from '../theme';
import { glyphFor } from '../lib/ui';
import { gameBySlug } from '../catalog';
import { GAME_COMPONENTS } from '../gameRegistry';
import { useSettings } from '../context/useSettings';

// Bloque de contenido SEO que va debajo del juego (texto real + keywords).
function GameSeoBlock({ game }) {
  return (
    <section className="game-seo" style={accentStyle(game.accent)}>
      <h1 className="game-seo__title">{game.title} online</h1>
      <p className="game-seo__lead">{game.seo}</p>
      <p>
        {game.title} es uno de los {game.chip === 'Parejas' ? 'juegos para parejas' : 'juegos para grupos y fiestas'} de
        {' '}<Link to="/">Glup!</Link>. Se juega desde el navegador, gratis y sin descargar nada:
        elige el nivel (suave, medio o picante) y empieza a jugar.
      </p>
      <p className="game-seo__kw">
        {game.keywords.map((k, i) => (
          <span key={k}>{i > 0 ? ' · ' : ''}{k}</span>
        ))}
      </p>
      <Link className="btn btn--outline btn--pill" to="/" style={accentStyle(game.accent)}>
        Ver todos los juegos
      </Link>
    </section>
  );
}

function SoonScreen({ game, onBack }) {
  return (
    <div className="game" style={accentStyle(game.accent)}>
      <div className="game-top">
        <button className="back-link" onClick={onBack}><ArrowLeft size={20} /> Volver</button>
        <span className="game-badge">{glyphFor(game)} {game.title}</span>
        <span className="game-top__spacer" />
      </div>
      <div className="empty">
        <div style={{ fontSize: '3.5rem' }}>{glyphFor(game)}</div>
        <h2>{game.title}</h2>
        <p>Este juego está en camino. Muy pronto lo podrás jugar aquí.</p>
        <span className="btn btn--outline btn--pill" style={{ opacity: 0.7 }}><Bell size={16} /> Próximamente</span>
      </div>
    </div>
  );
}

function NeedPlayers({ game, onBack, onAdd }) {
  return (
    <div className="game" style={accentStyle(game.accent)}>
      <div className="game-top">
        <button className="back-link" onClick={onBack}><ArrowLeft size={20} /> Volver</button>
        <span className="game-badge">{glyphFor(game)} {game.title}</span>
        <span className="game-top__spacer" />
      </div>
      <div className="empty">
        <Users size={54} color="var(--text-faint)" />
        <h2>Necesitas al menos 2 jugadores</h2>
        <p>Agrega los nombres de quienes van a jugar y empieza.</p>
        <button className="btn btn--solid btn--pill" style={accentStyle(game.accent)} onClick={onAdd}>
          <Users size={18} /> Agregar jugadores
        </button>
      </div>
    </div>
  );
}

export default function GamePage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const game = gameBySlug(slug);
  const { drinkingMode, intensity, jugadores, openJugadores } = useSettings();

  if (!game) return <Navigate to="/" replace />;

  const back = () => navigate('/');
  const seo = <Seo title={`${game.title} online — jugar gratis | Glup!`} description={game.seo} path={`/${slug}`} />;

  if (game.soon) {
    return <>{seo}<SoonScreen game={game} onBack={back} /><GameSeoBlock game={game} /></>;
  }

  if (game.needsPlayers && jugadores.length < 2) {
    return (
      <>
        {seo}
        <NeedPlayers game={game} onBack={back} onAdd={() => openJugadores({ required: true })} />
        <GameSeoBlock game={game} />
      </>
    );
  }

  const Comp = GAME_COMPONENTS[game.gameId];

  return (
    <>
      {seo}
      <Suspense fallback={<div className="game" style={accentStyle(game.accent)}><div className="empty"><h2>Cargando…</h2></div></div>}>
        <Comp onBack={back} isDrinkingMode={drinkingMode} intensity={intensity} jugadores={jugadores} />
      </Suspense>
      <GameSeoBlock game={game} />
    </>
  );
}
