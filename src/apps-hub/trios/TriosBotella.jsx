import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, RefreshCw } from 'lucide-react';
import Seo from '../../components/Seo';
import { useSettings } from '../../context/useSettings';
import { pickBotellaReto } from './triosContent';

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

export default function TriosBotella() {
  const navigate = useNavigate();
  const { jugadores } = useSettings();

  const [girando, setGirando] = useState(false);
  const [elegidoIdx, setElegidoIdx] = useState(null);
  const [resultado, setResultado] = useState(null);
  const anguloRef = useRef(0);
  const spinRef = useRef(null);

  const n = jugadores.length;

  const girar = () => {
    if (girando || n < 3 || !spinRef.current) return;
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
      setResultado(`${jugadores[winner]}: ${pickBotellaReto()} con ${conQuien}.`);
      setGirando(false);
    }, SPIN_MS);
  };

  return (
    <div className="vor-game">
      <Seo
        title="Botella para Tríos +18 — gira y apunta exacto"
        description="La botella para tríos: gira, apunta exacto a quién le toca y le sale un reto picante con otra persona. Gratis y sin descargar."
        path="/juegos-para-trios/botella"
      />

      <div className="vor-game__top">
        <button className="back-link" onClick={() => navigate('/juegos-para-trios')}>
          <ArrowLeft size={20} /> Salir
        </button>
        <span className="vor-badge">🍾 La Botella</span>
        <span className="vor-score" />
      </div>

      {n < 3 ? (
        <div className="vor-content__inner">
          <p className="vor-content__lead">Necesitas al menos 3 personas. Volvé y agregá jugadores.</p>
        </div>
      ) : (
        <div className="trios-botella">
          <button
            className={`bottle-stage${girando ? ' is-spinning' : ''}`}
            onClick={girar}
            disabled={girando}
            aria-label="Girar la botella"
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

          <p className="stage__hint">{girando ? 'Girando...' : 'Toca la botella para girarla'}</p>

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
