import React from 'react';
import { Link } from 'react-router-dom';
import { Beer, Users, Search, X } from 'lucide-react';
import { accentStyle } from '../theme';
import { HEAT_META } from '../lib/ui';
import { useSettings } from '../context/useSettings';
import Logo from './Logo';
import HubLink from './HubLink';

export default function StoreHero({ query, onQuery }) {
  const { drinkingMode, intensity, jugadores, updateDrinking, updateIntensity, openJugadores } = useSettings();
  const searching = query.trim().length > 0;

  return (
    <header className="store-hero">
      <HubLink />
      <span className="brand-eyebrow">Verdad · Reto · Sin Excusas</span>
      <div className="store-hero__top">
        <Link to="/glup" className="brand-name"><Logo size={30} /> Glup!</Link>
        <div className="chip-row chip-row--stack">
          <button className={`chip${drinkingMode ? ' is-on' : ''}`} style={accentStyle('yellow')} onClick={() => updateDrinking(!drinkingMode)}>
            <Beer size={14} />
            <span>{drinkingMode ? 'Tragos 🍻' : 'Sin Tragos'}</span>
          </button>
          <button className={`chip${jugadores.length > 0 ? ' is-on' : ''}`} onClick={() => openJugadores()}>
            <Users size={14} />
            <span>{jugadores.length > 0 ? `${jugadores.length} jug.` : 'Jugadores'}</span>
          </button>
        </div>
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
