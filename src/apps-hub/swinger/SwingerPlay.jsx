import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowLeft, RefreshCw } from 'lucide-react';
import Seo from '../../components/Seo';
import { useSettings } from '../../context/useSettings';
import { SELECTOR, buildPrompt, buildIcebreaker } from './swingerContent';

export default function SwingerPlay() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const { jugadores } = useSettings();

  const modo = params.get('modo') === 'vr' ? 'vr' : 'hielo';
  const raw = params.get('nivel');
  const nivelId = SELECTOR.some((n) => n.id === raw) ? raw : 'picante';
  const nivel = SELECTOR.find((n) => n.id === nivelId) || SELECTOR[0];
  const esHielo = modo === 'hielo';

  const [prompt, setPrompt] = useState(null);
  const [tipo, setTipo] = useState(null);
  const [turno, setTurno] = useState(0);

  const nuevo = (t) => {
    if (esHielo) {
      setTipo('hielo');
      setPrompt(buildIcebreaker(jugadores));
    } else {
      setTipo(t);
      setPrompt(buildPrompt(nivelId, t, jugadores, turno));
      setTurno((n) => n + 1);
    }
  };

  const titulo = esHielo ? 'Rompehielos' : 'Verdad o Reto entre parejas';

  return (
    <div className="vor-game">
      <Seo
        title={`Fiestas Swinger — ${titulo}`}
        description={`${titulo} para fiestas de varias parejas. Con reglas de consentimiento. Gratis y sin descargar.`}
        path="/fiestas-swinger/jugar"
      />

      <div className="vor-game__top">
        <button className="back-link" onClick={() => navigate('/fiestas-swinger')}>
          <ArrowLeft size={20} /> Salir
        </button>
        <span className="vor-badge">{esHielo ? '🥂' : nivel.emoji} {titulo}{esHielo ? '' : ` · ${nivel.label}`}</span>
        <span className="vor-score" />
      </div>

      <div className={`vor-card${prompt ? ' is-active' : ''}${tipo && tipo !== 'hielo' ? ` is-${tipo}` : ''}`}>
        {prompt ? (
          <>
            {!esHielo && <span className="vor-card__tag">{tipo === 'verdad' ? 'VERDAD' : 'RETO'}</span>}
            <p className="vor-card__text">{prompt}</p>
          </>
        ) : esHielo ? (
          <p className="vor-card__text vor-card__text--idle">Toca para el primer rompehielos</p>
        ) : (
          <p className="vor-card__text vor-card__text--idle">Elige: ¿verdad o reto?</p>
        )}
      </div>

      {esHielo ? (
        <div className="vor-actions vor-actions--one">
          <button className="vor-btn vor-btn--verdad" onClick={() => nuevo()}>
            {prompt ? <><RefreshCw size={16} /> Siguiente</> : 'Empezar'}
          </button>
        </div>
      ) : (
        <div className="vor-actions">
          <button className="vor-btn vor-btn--verdad" onClick={() => nuevo('verdad')}>VERDAD</button>
          <button className="vor-btn vor-btn--reto" onClick={() => nuevo('reto')}>RETO</button>
        </div>
      )}
    </div>
  );
}
