import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowLeft, RefreshCw, SkipForward } from 'lucide-react';
import Seo from '../../components/Seo';
import { useSettings } from '../../context/useSettings';
import { SELECTOR, buildPrompt } from './triosContent';
import RetoTimer, { extractSeconds } from '../../components/RetoTimer';

export default function TriosPlay() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const { jugadores } = useSettings();

  const modo = params.get('modo') === 'reto' ? 'reto' : 'vr';
  const raw = params.get('nivel');
  const nivelId = SELECTOR.some((n) => n.id === raw) ? raw : 'picante';
  const nivel = SELECTOR.find((n) => n.id === nivelId) || SELECTOR[0];
  const soloRetos = modo === 'reto';

  const [relacion, setRelacion] = useState(params.get('relacion') === 'solteros' ? 'solteros' : 'pareja');
  const [prompt, setPrompt] = useState(null);
  const [tipo, setTipo] = useState(null);
  const [turno, setTurno] = useState(0);

  const tirar = (t) => {
    const real = soloRetos ? 'reto' : t;
    setTipo(real);
    setPrompt(buildPrompt(nivelId, real, jugadores, turno, relacion));
    setTurno((n) => n + 1);
  };

  const saltarReto = () => {
    if (!tipo) return;
    setPrompt(buildPrompt(nivelId, tipo, jugadores, Math.max(0, turno - 1), relacion));
  };

  const titulo = soloRetos ? 'Solo Retos' : 'Verdad o Reto';

  const isObj = prompt !== null && typeof prompt === 'object';
  const promptText = isObj ? prompt.text : prompt;
  const turnoJugador = isObj ? prompt.jugador : null;
  const roleLabel = isObj ? prompt.roleLabel : null;
  const comp = isObj ? prompt.composicion : null;

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
        <span className="vor-score" />
      </div>

      {/* Selector de dinámica: Pareja + Invitado o 3 Amigos */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
        <button
          type="button"
          className={`btn btn--sm ${relacion === 'pareja' ? 'btn--solid' : 'btn--outline'}`}
          style={{ fontSize: '0.8rem', padding: '0.35rem 0.75rem' }}
          onClick={() => {
            setRelacion('pareja');
            if (prompt && tipo) {
              setPrompt(buildPrompt(nivelId, tipo, jugadores, Math.max(0, turno - 1), 'pareja'));
            }
          }}
        >
          💍 Pareja + Invitado
        </button>
        <button
          type="button"
          className={`btn btn--sm ${relacion === 'solteros' ? 'btn--solid' : 'btn--outline'}`}
          style={{ fontSize: '0.8rem', padding: '0.35rem 0.75rem' }}
          onClick={() => {
            setRelacion('solteros');
            if (prompt && tipo) {
              setPrompt(buildPrompt(nivelId, tipo, jugadores, Math.max(0, turno - 1), 'solteros'));
            }
          }}
        >
          ⚡ 3 Amigos / Libres
        </button>
      </div>

      <div className={`vor-card${prompt ? ' is-active' : ''}${tipo ? ` is-${tipo}` : ''}`}>
        {prompt ? (
          <>
            <div className="vor-card__header-bar">
              <span className="vor-card__tag">{tipo === 'verdad' ? 'VERDAD' : 'RETO'}</span>
              {comp && comp.badge && (
                <span className="vor-card__comp-badge">{comp.badge}</span>
              )}
            </div>

            {turnoJugador && (
              <div className="vor-card__turn-banner">
                <span className="vor-card__turn-kicker">{roleLabel || 'LE TOCA A'}</span>
                <div className="vor-card__turn-name">
                  <span>{typeof turnoJugador === 'string' ? turnoJugador : turnoJugador.name}</span>
                  {turnoJugador.gen && turnoJugador.gen !== 'x' && (
                    <span className={`jm-badge jm-badge--${turnoJugador.gen}`}>
                      {turnoJugador.gen === 'm' ? '♀ Mujer' : '♂ Hombre'}
                    </span>
                  )}
                </div>
              </div>
            )}

            <p className="vor-card__text">{promptText}</p>

            {/* Temporizador para retos con tiempo */}
            <RetoTimer seconds={extractSeconds(promptText)} />

            {/* Botón para saltar reto en caso de querer cambiarlo */}
            <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'center' }}>
              <button
                type="button"
                className="btn btn--outline btn--sm"
                onClick={saltarReto}
                style={{ fontSize: '0.82rem', padding: '0.4rem 0.9rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
              >
                <SkipForward size={14} /> Cambiar por otro reto
              </button>
            </div>
          </>
        ) : (
          <p className="vor-card__text vor-card__text--idle">
            {soloRetos ? 'Toca “Reto” y a jugar' : 'Elige: ¿verdad o reto?'}
          </p>
        )}
      </div>

      {soloRetos ? (
        <div className="vor-actions vor-actions--one">
          <button className="vor-btn vor-btn--reto" onClick={() => tirar('reto')}>
            {prompt ? <><RefreshCw size={16} /> Siguiente</> : 'RETO'}
          </button>
        </div>
      ) : (
        <div className="vor-actions">
          <button className="vor-btn vor-btn--verdad" onClick={() => tirar('verdad')}>VERDAD</button>
          <button className="vor-btn vor-btn--reto" onClick={() => tirar('reto')}>RETO</button>
        </div>
      )}
    </div>
  );
}
