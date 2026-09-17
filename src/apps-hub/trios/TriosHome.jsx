import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, ChevronRight } from 'lucide-react';
import Seo from '../../components/Seo';
import JsonLd from '../../components/JsonLd';
import HubLink from '../../components/HubLink';
import { useSettings } from '../../context/useSettings';
import { SITE_URL } from '../../lib/ui';
import { MODOS, SELECTOR, getComposicion } from './triosContent';

export default function TriosHome() {
  const navigate = useNavigate();
  const { jugadores, openJugadores } = useSettings();
  const [nivel, setNivel] = useState('progresivo');

  const faltan = jugadores.length < 3;
  const comp = getComposicion(jugadores);

  const irA = (modo) => {
    const url = modo.id === 'botella'
      ? modo.ruta
      : `${modo.ruta}&nivel=${nivel}`;
    if (faltan) {
      openJugadores({ required: true, minimo: 3, maximo: 3, onExceso: '/fiestas-swinger', onDone: () => navigate(url) });
      return;
    }
    navigate(url);
  };

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Juegos para Tríos +18',
    url: SITE_URL + '/juegos-para-trios',
    description: 'Juegos eróticos para tríos +18: verdad o reto entre tres, solo retos picantes y la botella. Con los nombres de los tres. Gratis y sin descargar.',
    applicationCategory: 'GameApplication',
    operatingSystem: 'Web',
    isAccessibleForFree: true,
    inLanguage: 'es',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  };

  return (
    <div className="vor-home">
      <Seo
        title="Juegos para Tríos +18 — verdad o reto, retos y botella"
        description="Juegos eróticos para tríos +18: verdad o reto entre tres, solo retos picantes y la botella. Con los nombres de quienes juegan. Gratis y sin descargar."
        path="/juegos-para-trios"
      />
      <JsonLd data={schema} />

      <HubLink />
      <header className="vor-head">
        <p className="vor-eyebrow">Para tres · +18</p>
        <h1 className="vor-title">Juegos para <span>Tríos</span></h1>
        <p className="vor-sub">Verdad o reto, retos al límite y la botella para tríos.</p>
      </header>

      <button className="vor-players" onClick={() => openJugadores({ minimo: 3, maximo: 3, onExceso: '/fiestas-swinger' })}>
        <Users size={16} />
        {jugadores.length > 0 ? `${jugadores.length} jugadores` : 'Agregar 3 jugadores'}
      </button>
      {jugadores.length >= 3 && comp && (
        <div className="trios-comp-bar">
          <span>Modo detectado:</span>
          <strong>{comp.label} ({comp.badge})</strong>
        </div>
      )}
      {jugadores.length >= 3 && comp && comp.tipo === 'HHH' && (
        <div
          style={{
            background: 'rgba(168, 85, 247, 0.14)',
            border: '1px solid rgba(168, 85, 247, 0.4)',
            borderRadius: '12px',
            padding: '0.75rem 1rem',
            margin: '0.6rem 0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '0.75rem',
            cursor: 'pointer',
            textAlign: 'left',
          }}
          onClick={() => navigate('/juegos-gay')}
        >
          <div>
            <span style={{ fontSize: '0.85rem', color: '#f3e8ff', fontWeight: 600, display: 'block' }}>
              🌈 ¿Jugáis solo hombres?
            </span>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>
              Prueba nuestra app Juegos Gay +18 con retos 100% pensados para vosotros.
            </span>
          </div>
          <span style={{ color: '#c084fc', fontSize: '0.85rem', fontWeight: 700, whiteSpace: 'nowrap' }}>
            Ir ➔
          </span>
        </div>
      )}
      {faltan && <p className="trios-warn">Necesitas al menos 3 personas para jugar.</p>}

      <div className="trios-nivel" role="group" aria-label="Nivel">
        {SELECTOR.map((nv) => (
          <button
            key={nv.id}
            className={`trios-nivel__btn${nivel === nv.id ? ' is-sel' : ''}`}
            onClick={() => setNivel(nv.id)}
            aria-pressed={nivel === nv.id}
          >
            {nv.emoji} {nv.label}
          </button>
        ))}
      </div>

      <ul className="vor-levels">
        {MODOS.map((m) => (
          <li key={m.id}>
            <button className="vor-level" onClick={() => irA(m)}>
              <span className="vor-level__emoji">{m.emoji}</span>
              <span className="vor-level__name">{m.label}</span>
              <span className="vor-level__desc">{m.desc}</span>
              <ChevronRight size={20} className="trios-chev" />
            </button>
          </li>
        ))}
      </ul>

      <section className="vor-seo">
        <h2>¿Cómo se juega en trío?</h2>
        <p>
          Añade los nombres de las <b>tres personas</b>, elige el nivel y un modo. El nivel puede ser
          <b> Picante</b>, <b>Extremo</b>, <b>Al azar</b> (todo mezclado) o <b>Ascendente</b> (arranca
          suave y sube de tono cada pocos turnos). En <b>Verdad o Reto</b> cada turno mezcla a los tres;
          en <b>Solo Retos</b> no hay verdades; y <b>La Botella</b> gira y apunta exacto a quién le toca.
        </p>
        <p className="vor-seo__kw">
          juegos para tríos · verdad o reto en trío · retos para tríos · juego +18 para tres personas · botella para tríos
        </p>
      </section>
    </div>
  );
}
