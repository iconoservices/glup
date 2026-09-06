import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, Users } from 'lucide-react';
import Seo from '../../components/Seo';
import HubLink from '../../components/HubLink';
import { useSettings } from '../../context/useSettings';
import { NIVELES } from './vorContent';

function Meter({ nivel }) {
  return (
    <span className="vor-meter" aria-label={`Nivel ${nivel} de 6`}>
      {Array.from({ length: 6 }, (_, i) => (
        <i key={i} className={i < nivel ? 'on' : ''} />
      ))}
    </span>
  );
}

export default function VorHome() {
  const navigate = useNavigate();
  const { jugadores, openJugadores } = useSettings();
  const [sel, setSel] = useState('suave');

  const jugar = () => {
    if (jugadores.length < 2) {
      openJugadores({ required: true, onDone: () => navigate(`/verdad-o-reto-18/jugar?nivel=${sel}`) });
      return;
    }
    navigate(`/verdad-o-reto-18/jugar?nivel=${sel}`);
  };

  return (
    <div className="vor-home">
      <Seo
        title="Verdad o Reto +18 — juego para adultos gratis online"
        description="Verdad o Reto para adultos con 6 niveles: suave, atrevido, hardcore, loco, pareja y 4play. Con los nombres de tus amigos. Gratis, sin descargar."
        path="/verdad-o-reto-18"
      />

      <HubLink />
      <header className="vor-head">
        <p className="vor-eyebrow">Sin filtro · +18</p>
        <h1 className="vor-title">Verdad o Reto <span>+18</span></h1>
        <p className="vor-sub">Elige el nivel. Los retos salen con el nombre de quien juega.</p>
      </header>

      <button className="vor-players" onClick={() => openJugadores()}>
        <Users size={16} />
        {jugadores.length > 0 ? `${jugadores.length} jugadores` : 'Agregar jugadores'}
      </button>

      <ul className="vor-levels">
        {NIVELES.map((n) => (
          <li key={n.id}>
            <button
              className={`vor-level${sel === n.id ? ' is-sel' : ''}`}
              onClick={() => setSel(n.id)}
              aria-pressed={sel === n.id}
            >
              <span className="vor-level__emoji">{n.emoji}</span>
              <span className="vor-level__name">{n.label}</span>
              <span className="vor-level__desc">{n.desc}</span>
              <Meter nivel={n.nivel} />
            </button>
          </li>
        ))}
      </ul>

      <button className="vor-cta" onClick={jugar}>
        <Play size={20} fill="currentColor" /> ¡JUGAR!
      </button>

      <section className="vor-seo">
        <h2>¿Cómo se juega Verdad o Reto +18?</h2>
        <p>
          Añade los nombres de quienes van a jugar, elige un nivel (de <b>Suave</b> a <b>4Play</b>)
          y toca <b>Jugar</b>. En cada turno aparece una verdad o un reto con el nombre de una
          persona del grupo. Se cumple o se pierde: pulsa <b>Lo hice</b> o <b>Fallé</b>.
        </p>
        <p className="vor-seo__kw">
          verdad o reto para adultos · verdad o reto hot · retos picantes · juego +18 para grupos · verdad o reto en pareja
        </p>
      </section>
    </div>
  );
}
