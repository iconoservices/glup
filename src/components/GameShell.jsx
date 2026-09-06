import React from 'react';
import { ArrowLeft, Beer } from 'lucide-react';
import { accentStyle } from '../theme';

/**
 * Envoltura común de todas las pantallas de juego.
 * Unifica el header (volver + badge), la bandera de "Modo Tragos"
 * y el área central `.stage`, con acento de color temable.
 */
export default function GameShell({
  accent = 'magenta',
  label,
  icon,
  drinking = false,
  drinkingText = 'Modo Tragos activado',
  onBack,
  stage = true,
  children,
}) {
  return (
    <div className="game" style={accentStyle(accent)}>
      <div className="game-top">
        <button className="back-link" onClick={onBack}>
          <ArrowLeft size={20} /> Volver
        </button>
        <span className="game-badge">
          {icon} {label}
        </span>
        <span className="game-top__spacer" />
      </div>

      {drinking && (
        <div className="drink-flag">
          <Beer size={15} /> {drinkingText}
        </div>
      )}

      {stage ? <div className="stage">{children}</div> : children}
    </div>
  );
}
