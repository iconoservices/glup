import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, ChevronRight, Flame, ShieldAlert, Sparkles } from 'lucide-react';
import Seo from '../../components/Seo';
import HubLink from '../../components/HubLink';
import { useSettings } from '../../context/useSettings';

const MODOS_PREVIEW = [
  {
    id: 'vor',
    glyph: '🔥',
    titulo: 'Verdad o Reto Gay',
    sub: 'Preguntas con morbo y retos con roles: activo, pasivo, versátil y sumiso.',
    badge: 'En Maqueta',
  },
  {
    id: 'ruleta',
    glyph: '🎯',
    titulo: 'Ruleta de Posiciones & Fetiches',
    sub: 'Gira la ruleta y cumple la pose o el fetiche que salga entre los chicos.',
    badge: 'Pronto',
  },
  {
    id: 'botella',
    glyph: '🍾',
    titulo: 'La Botella Gay',
    sub: 'Para parejas de hombres o tríos/grupos de chicos: apunta y manda.',
    badge: 'Pronto',
  },
];

export default function GayHome() {
  const navigate = useNavigate();
  const { jugadores, openJugadores } = useSettings();

  return (
    <div className="vor-home">
      <Seo
        title="Juegos Gay +18 — Verdad o Reto entre Hombres"
        description="Juegos eróticos para hombres +18: verdad o reto gay, ruleta de fetiches y poses. Gratis y sin censura."
        path="/juegos-gay"
      />

      <HubLink />

      <header className="vor-head">
        <p className="vor-eyebrow" style={{ color: 'var(--accent, #a855f7)' }}>
          Solo Hombres · +18
        </p>
        <h1 className="vor-title">
          Juegos <span>Gay +18</span>
        </h1>
        <p className="vor-sub">
          Verdad o reto, ruleta y retos de morbo 100% pensados para chicos.
        </p>
      </header>

      <div style={{
        background: 'rgba(168, 85, 247, 0.12)',
        border: '1px solid rgba(168, 85, 247, 0.35)',
        borderRadius: '14px',
        padding: '1rem 1.25rem',
        margin: '0.5rem 0 1.2rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        textAlign: 'left'
      }}>
        <Sparkles size={24} style={{ color: '#c084fc', flexShrink: 0 }} />
        <div>
          <strong style={{ display: 'block', fontSize: '0.92rem', color: '#f3e8ff' }}>
            Maqueta en desarrollo
          </strong>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>
            Aquí podrás jugar con roles (Activo, Pasivo, Versátil, Sumiso) en parejas o tríos de hombres.
          </span>
        </div>
      </div>

      <button className="vor-players" onClick={() => openJugadores()}>
        <Users size={16} />
        {jugadores.length > 0 ? `${jugadores.length} jugadores cargados` : 'Configurar jugadores'}
      </button>

      <div className="trios-grid" style={{ marginTop: '1.25rem' }}>
        {MODOS_PREVIEW.map((m) => (
          <div
            key={m.id}
            className="trios-card"
            style={{ opacity: 0.95, cursor: 'default' }}
          >
            <div className="trios-card__icon">{m.glyph}</div>
            <div className="trios-card__body">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <h2 className="trios-card__title">{m.titulo}</h2>
                <span className="jm-badge jm-badge--con" style={{ fontSize: '0.68rem', padding: '1px 6px' }}>
                  {m.badge}
                </span>
              </div>
              <p className="trios-card__sub">{m.sub}</p>
            </div>
            <ChevronRight size={18} className="trios-card__chev" style={{ opacity: 0.4 }} />
          </div>
        ))}
      </div>
    </div>
  );
}
