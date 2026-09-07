import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowLeft, RefreshCw } from 'lucide-react';
import Seo from '../../components/Seo';
import { useSettings } from '../../context/useSettings';
import { SELECTOR, buildPrompt } from './triosContent';

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
  const [turno, setTurno] = useState(0);

  const tirar = (t) => {
    const real = soloRetos ? 'reto' : t;
    setTipo(real);
    setPrompt(buildPrompt(nivelId, real, jugadores, turno));
    setTurno((n) => n + 1);
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
        <span className="vor-score" />
      </div>

      <div className={`vor-card${prompt ? ' is-active' : ''}${tipo ? ` is-${tipo}` : ''}`}>
        {prompt ? (
          <>
            <span className="vor-card__tag">{tipo === 'verdad' ? 'VERDAD' : 'RETO'}</span>
            <p className="vor-card__text">{prompt}</p>
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
