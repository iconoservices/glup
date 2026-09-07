import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowLeft, Check, X, RefreshCw } from 'lucide-react';
import Seo from '../../components/Seo';
import { useSettings } from '../../context/useSettings';
import { SELECTOR, REGLAS, buildPrompt } from './triosContent';

export default function TriosPlay() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const { jugadores } = useSettings();

  const modo = params.get('modo') === 'reto' ? 'reto' : 'vr';
  const raw = params.get('nivel');
  const nivelId = SELECTOR.some((n) => n.id === raw) ? raw : 'picante';
  const nivel = SELECTOR.find((n) => n.id === nivelId) || SELECTOR[0];
  const soloRetos = modo === 'reto';

  const [prompt, setPrompt] = useState(null);
  const [tipo, setTipo] = useState(null);
  const [score, setScore] = useState({ hechos: 0, fallos: 0 });
  const [turno, setTurno] = useState(0);
  const [resolved, setResolved] = useState(false);

  const tirar = (t) => {
    const real = soloRetos ? 'reto' : t;
    setTipo(real);
    setPrompt(buildPrompt(nivelId, real, jugadores, turno));
    setTurno((n) => n + 1);
    setResolved(false);
  };

  const resolver = (ok) => {
    setScore((s) => ({ hechos: s.hechos + (ok ? 1 : 0), fallos: s.fallos + (ok ? 0 : 1) }));
    setResolved(true);
  };

  const titulo = soloRetos ? 'Solo Retos' : 'Verdad o Reto';

  return (
    <div className="vor-game">
      <Seo
        title={`Juegos para Tríos +18 — ${titulo} (${nivel.label})`}
        description={`${titulo} para tríos en nivel ${nivel.label}. Con los nombres de quienes juegan. Gratis y sin descargar.`}
        path="/juegos-para-trios/jugar"
      />

      <div className="vor-game__top">
        <button className="back-link" onClick={() => navigate('/juegos-para-trios')}>
          <ArrowLeft size={20} /> Salir
        </button>
        <span className="vor-badge">{nivel.emoji} {titulo} · {nivel.label}</span>
        <span className="vor-score">✅ {score.hechos} · ❌ {score.fallos}</span>
      </div>

      <div className={`vor-card${prompt ? ' is-active' : ''}${tipo ? ` is-${tipo}` : ''}`}>
        {prompt ? (
          <>
            <span className="vor-card__tag">{tipo === 'verdad' ? 'VERDAD' : 'RETO'}</span>
            <p className="vor-card__text">{prompt}</p>
          </>
        ) : (
          <div className="vor-rules">
            <p className="vor-rules__title">Antes de empezar</p>
            <ul>{REGLAS.map((r, i) => <li key={i}>{r}</li>)}</ul>
            <p className="vor-rules__go">
              {soloRetos ? 'Toca “Reto” cuando estén listos' : 'Elige verdad o reto cuando estén listos'}
            </p>
          </div>
        )}
      </div>

      {!prompt || resolved ? (
        soloRetos ? (
          <div className="vor-actions vor-actions--one">
            <button className="vor-btn vor-btn--reto" onClick={() => tirar('reto')}>RETO</button>
          </div>
        ) : (
          <div className="vor-actions">
            <button className="vor-btn vor-btn--verdad" onClick={() => tirar('verdad')}>VERDAD</button>
            <button className="vor-btn vor-btn--reto" onClick={() => tirar('reto')}>RETO</button>
          </div>
        )
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
        <button
          className="vor-next"
          onClick={() => tirar(soloRetos ? 'reto' : (Math.random() > 0.5 ? 'verdad' : 'reto'))}
        >
          <RefreshCw size={16} /> Siguiente turno
        </button>
      )}
    </div>
  );
}
