import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, RefreshCw } from 'lucide-react';
import Seo from '../../components/Seo';
import { useSettings } from '../../context/useSettings';
import { RULETA_RETOS } from './swingerContent';

const SPIN_MS = 3200;
const rand = (a) => a[Math.floor(Math.random() * a.length)];
const anguloJugador = (i, n) => -90 + (360 * i) / n;

function BottleSVG() {
  return (
    <svg className="bottle-svg" viewBox="0 0 200 64" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect x="6" y="12" width="118" height="40" rx="20" fill="var(--accent)" />
      <rect x="120" y="22" width="44" height="20" rx="8" fill="var(--accent)" />
      <rect x="162" y="17" width="16" height="30" rx="5" fill="var(--yellow)" />
      <ellipse cx="42" cy="24" rx="16" ry="7" fill="#fff" fillOpacity="0.28" />
    </svg>
  );
}

export default function SwingerRuleta() {
  const navigate = useNavigate();
  const { jugadores } = useSettings();

  const [girando, setGirando] = useState(false);
  const [elegidoIdx, setElegidoIdx] = useState(null);
  const [resultado, setResultado] = useState(null);
  const anguloRef = useRef(0);
  const spinRef = useRef(null);

  const n = jugadores.length;

  const girar = () => {
    if (girando || n < 4 || !spinRef.current) return;
    setGirando(true);
    setElegidoIdx(null);
    setResultado(null);

    const winner = Math.floor(Math.random() * n);
    const objetivo = anguloJugador(winner, n);
    const desde = anguloRef.current;
    const vueltas = 4 + Math.floor(Math.random() * 3);
    const delta = (((objetivo - desde) % 360) + 360) % 360;
    const hasta = desde + vueltas * 360 + delta;
    anguloRef.current = hasta;

    spinRef.current.animate(
      [{ transform: `rotate(${desde}deg)` }, { transform: `rotate(${hasta}deg)` }],
      { duration: SPIN_MS, easing: 'cubic-bezier(0.15, 0.85, 0.15, 1)', fill: 'forwards' }
    );

    setTimeout(() => {
      const otros = jugadores.filter((_, i) => i !== winner);
      const conQuien = rand(otros);
      setElegidoIdx(winner);
      setResultado(`${jugadores[winner]} y ${conQuien}: ${rand(RULETA_RETOS)}. Con luz verde de las dos parejas.`);
      setGirando(false);
    }, SPIN_MS);
  };

  return (
    <div className="vor-game">
      <Seo
        title="La Ruleta de Parejas — fiestas swinger (+18)"
        description="La ruleta que empareja a dos personas al azar en una fiesta de varias parejas y les da un reto. Con reglas de consentimiento. Gratis y sin descargar."
        path="/fiestas-swinger/ruleta"
      />

      <div className="vor-game__top">
        <button className="back-link" onClick={() => navigate('/fiestas-swinger')}>
          <ArrowLeft size={20} /> Salir
        </button>
        <span className="vor-badge">🎯 Ruleta de Parejas</span>
        <span className="vor-score" />
      </div>

      {n < 4 ? (
        <div className="vor-content__inner">
          <p className="vor-content__lead">Sumá al menos 4 personas (2 parejas). Volvé y agregá gente.</p>
        </div>
      ) : (
        <div className="trios-botella">
          <button
            className={`bottle-stage${girando ? ' is-spinning' : ''}`}
            onClick={girar}
            disabled={girando}
            aria-label="Girar la ruleta"
          >
            <span className="bottle-ring" />
            {jugadores.map((j, i) => {
              const a = (anguloJugador(i, n) * Math.PI) / 180;
              const x = 50 + 45 * Math.cos(a);
              const y = 50 + 45 * Math.sin(a);
              return (
                <span
                  key={i}
                  className={`bottle-name${i === elegidoIdx ? ' is-chosen' : ''}`}
                  style={{ left: `${x}%`, top: `${y}%` }}
                >
                  {j}
                </span>
              );
            })}
            <span className="bottle-spin" ref={spinRef}><BottleSVG /></span>
          </button>

          <p className="stage__hint">{girando ? 'Girando...' : 'Toca para girar la ruleta'}</p>

          {resultado && (
            <div className="vor-card is-active is-reto">
              <span className="vor-card__tag">RETO</span>
              <p className="vor-card__text">{resultado}</p>
            </div>
          )}

          {resultado && !girando && (
            <button className="vor-next" onClick={girar}>
              <RefreshCw size={16} /> Girar de nuevo
            </button>
          )}
        </div>
      )}
    </div>
  );
}
