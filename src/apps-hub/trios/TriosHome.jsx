import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, ChevronRight } from 'lucide-react';
import Seo from '../../components/Seo';
import JsonLd from '../../components/JsonLd';
import HubLink from '../../components/HubLink';
import { useSettings } from '../../context/useSettings';
import { SITE_URL } from '../../lib/ui';
import { MODOS, NIVELES } from './triosContent';

export default function TriosHome() {
  const navigate = useNavigate();
  const { jugadores, openJugadores } = useSettings();
  const [nivel, setNivel] = useState('picante');

  const faltan = jugadores.length < 3;

  const irA = (modo) => {
    const url = modo.id === 'botella'
      ? modo.ruta
      : `${modo.ruta}&nivel=${nivel}`;
    if (faltan) {
      openJugadores({ required: true, onDone: () => navigate(url) });
      return;
    }
    navigate(url);
  };

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Juegos para Tríos +18',
    url: SITE_URL + '/juegos-para-trios',
    description: 'Juego para tríos +18: verdad o reto entre los tres, solo retos picantes y la botella. Con los nombres de quienes juegan. Gratis y sin descargar.',
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
        description="Juego para tríos +18: verdad o reto entre los tres, retos picantes (quítate una prenda y más) y la botella que apunta exacto. Con los nombres de quienes juegan. Gratis y sin descargar."
        path="/juegos-para-trios"
      />
      <JsonLd data={schema} />

      <HubLink />
      <header className="vor-head">
        <p className="vor-eyebrow">Para tres · +18</p>
        <h1 className="vor-title">Juegos para <span>Tríos</span></h1>
        <p className="vor-sub">Verdad o reto, retos picantes y la botella. Todo con el sí de los tres.</p>
      </header>

      <button className="vor-players" onClick={() => openJugadores()}>
        <Users size={16} />
        {jugadores.length > 0 ? `${jugadores.length} jugadores` : 'Agregar 3 jugadores'}
      </button>
      {faltan && <p className="trios-warn">Necesitas al menos 3 personas para jugar.</p>}

      <div className="trios-nivel" role="group" aria-label="Nivel">
        {NIVELES.map((nv) => (
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
          Añade los nombres de las <b>tres personas</b>, elige el nivel (<b>Picante</b> o <b>Extremo</b>)
          y un modo. En <b>Verdad o Reto</b> cada turno mezcla a los tres; en <b>Solo Retos</b> no hay
          verdades, solo retos que suben de tono; y <b>La Botella</b> gira y apunta exacto a quién le toca.
        </p>
        <p>
          Regla de oro: cualquiera puede decir <b>“paso”</b> y no se discute. El juego es para pasarla
          bien entre los tres, no para incomodar a nadie.
        </p>
        <p className="vor-seo__kw">
          juegos para tríos · verdad o reto en trío · retos para tríos · juego +18 para tres personas · botella para tríos
        </p>
      </section>
    </div>
  );
}
