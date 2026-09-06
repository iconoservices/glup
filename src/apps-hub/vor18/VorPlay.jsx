import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowLeft, Check, X, RefreshCw } from 'lucide-react';
import Seo from '../../components/Seo';
import { useSettings } from '../../context/useSettings';
import { NIVELES, buildPrompt } from './vorContent';

export default function VorPlay() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const { jugadores } = useSettings();

  const nivelId = params.get('nivel') || 'suave';
  const nivel = NIVELES.find((n) => n.id === nivelId) || NIVELES[0];

  const [prompt, setPrompt] = useState(null);
  const [tipo, setTipo] = useState(null);
  const [score, setScore] = useState({ hechos: 0, fallos: 0 });
  const [resolved, setResolved] = useState(false);

  const tirar = (t) => {
    setTipo(t);
    setPrompt(buildPrompt(nivelId, t, jugadores));
    setResolved(false);
  };

  const resolver = (ok) => {
    setScore((s) => ({ hechos: s.hechos + (ok ? 1 : 0), fallos: s.fallos + (ok ? 0 : 1) }));
    setResolved(true);
  };

  return (
    <div className="vor-game">
      <Seo
        title={`Verdad o Reto +18 — nivel ${nivel.label}`}
        description={`Juega Verdad o Reto +18 en nivel ${nivel.label}. Retos y verdades con los nombres de tus amigos.`}
        path="/verdad-o-reto-18/jugar"
      />

      <div className="vor-game__top">
        <button className="back-link" onClick={() => navigate('/verdad-o-reto-18')}>
          <ArrowLeft size={20} /> Salir
        </button>
        <span className="vor-badge">{nivel.emoji} {nivel.label}</span>
        <span className="vor-score">✅ {score.hechos} · ❌ {score.fallos}</span>
      </div>

      <div className={`vor-card${prompt ? ' is-active' : ''}${tipo ? ` is-${tipo}` : ''}`}>
        {prompt ? (
          <>
            <span className="vor-card__tag">{tipo === 'verdad' ? 'VERDAD' : 'RETO'}</span>
            <p className="vor-card__text">{prompt}</p>
          </>
        ) : (
          <p className="vor-card__text vor-card__text--idle">Elige: ¿verdad o reto?</p>
        )}
      </div>

      {!prompt || resolved ? (
        <div className="vor-actions">
          <button className="vor-btn vor-btn--verdad" onClick={() => tirar('verdad')}>VERDAD</button>
          <button className="vor-btn vor-btn--reto" onClick={() => tirar('reto')}>RETO</button>
        </div>
      ) : (
        <div className="vor-actions">
          <button className="vor-btn vor-btn--fail" onClick={() => resolver(false)}>
            <X size={18} /> Fallé
          </button>
          <button className="vor-btn vor-btn--done" onClick={() => resolver(true)}>
            <Check size={18} /> Lo hice
          </button>
        </div>
      )}

      {resolved && (
        <button className="vor-next" onClick={() => tirar(Math.random() > 0.5 ? 'verdad' : 'reto')}>
          <RefreshCw size={16} /> Siguiente turno
        </button>
      )}
    </div>
  );
}
