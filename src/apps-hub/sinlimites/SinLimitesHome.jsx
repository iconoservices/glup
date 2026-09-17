import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, ChevronRight } from 'lucide-react';
import Seo from '../../components/Seo';
import JsonLd from '../../components/JsonLd';
import HubLink from '../../components/HubLink';
import { useSettings } from '../../context/useSettings';
import { SITE_URL } from '../../lib/ui';
import { MODOS, SELECTOR } from './sinLimitesContent';

export default function SinLimitesHome() {
  const navigate = useNavigate();
  const { jugadores, openJugadores } = useSettings();
  const [nivel, setNivel] = useState('fuerte');

  const faltan = jugadores.length < 2;

  const irA = (modo) => {
    const url = `${modo.ruta}&nivel=${nivel}`;
    if (faltan) {
      openJugadores({ required: true, onDone: () => navigate(url) });
      return;
    }
    navigate(url);
  };

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Sin Límites +18',
    url: SITE_URL + '/sin-limites',
    description: 'Verdad o reto sin límites para grupos +18: exhibición, contacto directo y retos al tope de intensidad. Con los nombres de quienes juegan. Gratis y sin descargar.',
    applicationCategory: 'GameApplication',
    operatingSystem: 'Web',
    isAccessibleForFree: true,
    inLanguage: 'es',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  };

  return (
    <div className="vor-home">
      <Seo
        title="Sin Límites +18 — el verdad o reto más fuerte de Glup"
        description="El juego más intenso de Glup: verdad o reto sin límites, exhibición y retos que suben hasta el tope. Con los nombres de quienes juegan. Gratis y sin descargar."
        path="/sin-limites"
      />
      <JsonLd data={schema} />

      <HubLink />
      <header className="vor-head">
        <p className="vor-eyebrow">Para 2 o más · +18</p>
        <h1 className="vor-title">Sin <span>Límites</span></h1>
        <p className="vor-sub">El juego más fuerte de Glup. Cualquiera puede decir "paso" en cualquier momento, sin preguntas.</p>
      </header>

      <button className="vor-players" onClick={() => openJugadores()}>
        <Users size={16} />
        {jugadores.length > 0 ? `${jugadores.length} jugadores` : 'Agregar jugadores'}
      </button>
      {faltan && <p className="trios-warn">Necesitas al menos 2 personas para jugar.</p>}

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
        <h2>¿Cómo se juega Sin Límites?</h2>
        <p>
          Agrega los nombres de quienes juegan, elige el nivel — <b>Fuerte</b>, <b>Sin Límites</b>,
          <b> Al azar</b> o <b>Ascendente</b> — y un modo: <b>Verdad o Reto</b> o <b>Solo Retos</b>.
          Durante la partida puedes escribir tus propios retos para que se mezclen con los demás.
        </p>
        <p>
          Regla de oro: cualquiera puede decir <b>"paso"</b> en cualquier momento y no se discute.
          Es el juego más fuerte de la casa, pero siempre con el sí de todos.
        </p>
        <p className="vor-seo__kw">
          verdad o reto sin límites · juego +18 extremo · reto de exhibición · juego para grupos picante
        </p>
      </section>
    </div>
  );
}
