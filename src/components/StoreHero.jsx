import React from 'react';
import { Beer, Users, Search, X } from 'lucide-react';
import { accentStyle } from '../theme';
import { HEAT_META } from '../lib/ui';
import { useSettings } from '../context/useSettings';
import HubLink from './HubLink';

export default function StoreHero({ query, onQuery }) {
  const { drinkingMode, intensity, jugadores, updateDrinking, updateIntensity, openJugadores } = useSettings();
  const searching = query.trim().length > 0;

  return (
    <header className="store-hero">
      <HubLink />

      <div className="vor-head">
        <p className="vor-eyebrow">9 juegos · +18</p>
        <h1 className="vor-title">Juegos <span>Glup</span></h1>
        <p className="vor-sub">Para beber, para parejas y para grupos. Elige uno y a jugar.</p>
      </div>

      <div className="chip-row chip-row--center">
        <button
          className={`chip${drinkingMode ? ' is-on' : ''}`}
          style={accentStyle('yellow')}
          onClick={() => updateDrinking(!drinkingMode)}
        >
          <Beer size={14} />
          <span>{drinkingMode ? 'Tragos 🍻' : 'Sin Tragos'}</span>
        </button>
        <button
          className={`chip${jugadores.length > 0 ? ' is-on' : ''}`}
          onClick={() => openJugadores()}
        >
          <Users size={14} />
          <span>{jugadores.length > 0 ? `${jugadores.length} jug.` : 'Jugadores'}</span>
        </button>
      </div>

      <div className="heat-bar">
        {Object.keys(HEAT_META).map((level) => (
          <button
            key={level}
            className={`heat-bar__seg${intensity === level ? ' is-on' : ''}`}
            onClick={() => updateIntensity(level)}
          >
            {HEAT_META[level].emoji} {HEAT_META[level].label}
          </button>
        ))}
      </div>

      <label className="searchbar">
        <Search size={18} />
        <input
          className="searchbar__input"
          value={query}
          onChange={(e) => onQuery(e.target.value)}
          placeholder="¿A qué quieres jugar hoy?"
        />
        {searching && (
          <button className="icon-btn" onClick={() => onQuery('')} aria-label="Limpiar"><X size={16} /></button>
        )}
      </label>
    </header>
  );
}
