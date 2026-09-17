import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, ChevronRight } from 'lucide-react';
import Seo from '../../components/Seo';
import JsonLd from '../../components/JsonLd';
import HubLink from '../../components/HubLink';
import { useSettings } from '../../context/useSettings';
import { SITE_URL } from '../../lib/ui';
import { MODOS, SELECTOR } from './swingerContent';

export default function SwingerHome() {
  const navigate = useNavigate();
  const { jugadores, openJugadores } = useSettings();
  const [nivel, setNivel] = useState('picante');

  const faltan = jugadores.length < 4;

  const irA = (modo) => {
    const url = modo.id === 'ruleta' ? modo.ruta : `${modo.ruta}&nivel=${nivel}`;
    if (faltan) {
      openJugadores({ required: true, onDone: () => navigate(url) });
      return;
    }
    navigate(url);
  };

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Fiestas Swinger',
    url: SITE_URL + '/fiestas-swinger',
    description: 'Juegos para fiestas swinger y eventos de varias parejas: rompehielos, verdad o reto entre parejas y la ruleta que empareja. Gratis y sin descargar.',
    applicationCategory: 'GameApplication',
    operatingSystem: 'Web',
    isAccessibleForFree: true,
    inLanguage: 'es',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  };

  return (
    <div className="vor-home">
      <Seo
        title="Fiestas Swinger — juegos para eventos de varias parejas (+18)"
        description="Juegos para fiestas swinger: rompehielos para parejas que se conocen, verdad o reto entre parejas y la ruleta que empareja al azar. Gratis y sin descargar."
        path="/fiestas-swinger"
      />
      <JsonLd data={schema} />

      <HubLink />
      <header className="vor-head">
        <p className="vor-eyebrow">Para varias parejas · +18</p>
        <h1 className="vor-title">Fiestas <span>Swinger</span></h1>
        <p className="vor-sub">Rompehielos, verdad o reto entre parejas y la ruleta más picante.</p>
      </header>

      <button className="vor-players" onClick={() => openJugadores()}>
        <Users size={16} />
        {jugadores.length > 0 ? `${jugadores.length} personas` : 'Agregar personas'}
      </button>
      {faltan && <p className="trios-warn">Sumá al menos 4 personas (2 parejas) para jugar.</p>}

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
        <h2>¿Cómo se juega Fiestas Swinger?</h2>
        <p>
          Suma los nombres de las parejas, elige el nivel y el modo: <b>Rompehielos</b> para entrar en confianza,
          <b> Verdad o Reto</b> para cruzar a las parejas con preguntas picantes, o <b>La Ruleta</b> para que el azar decida los retos.
        </p>
        <p className="vor-seo__kw">
          juegos para fiestas swinger · verdad o reto entre parejas · juegos para intercambio de parejas · ruleta de parejas · juegos +18 para varias parejas
        </p>
      </section>
    </div>
  );
}
