import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowLeft, RefreshCw, Plus, X } from 'lucide-react';
import Seo from '../../components/Seo';
import { useSettings } from '../../context/useSettings';
import { SELECTOR, buildPrompt, addCustomReto } from './sinLimitesContent';

export default function SinLimitesPlay() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const { jugadores } = useSettings();

  const modo = params.get('modo') === 'reto' ? 'reto' : 'vr';
  const raw = params.get('nivel');
  const nivelId = SELECTOR.some((n) => n.id === raw) ? raw : 'fuerte';
  const nivel = SELECTOR.find((n) => n.id === nivelId) || SELECTOR[0];
  const soloRetos = modo === 'reto';

  const [prompt, setPrompt] = useState(null);
  const [tipo, setTipo] = useState(null);
  const [turno, setTurno] = useState(0);
  const [editando, setEditando] = useState(false);
  const [texto, setTexto] = useState('');

  const tirar = (t) => {
    const real = soloRetos ? 'reto' : t;
    setTipo(real);
    setPrompt(buildPrompt(nivelId, real, jugadores, turno));
    setTurno((n) => n + 1);
  };

  const guardarTexto = (e) => {
    e.preventDefault();
    addCustomReto(soloRetos ? 'reto' : (tipo || 'reto'), texto);
    setTexto('');
    setEditando(false);
  };

  const titulo = soloRetos ? 'Solo Retos' : 'Verdad o Reto';

  return (
    <div className="vor-game">
      <Seo
        title={`Sin Límites +18 — ${titulo} (${nivel.label})`}
        description={`${titulo} sin límites en nivel ${nivel.label}. Con los nombres de quienes juegan. Gratis y sin descargar.`}
        path="/sin-limites/jugar"
      />

      <div className="vor-game__top">
        <button className="back-link" onClick={() => navigate('/sin-limites')}>
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
            {soloRetos ? 'Toca "Reto" y a jugar' : 'Elige: ¿verdad o reto?'}
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

      <div className="sinlim-custom">
        {editando ? (
          <form className="sinlim-custom__form" onSubmit={guardarTexto}>
            <textarea
              autoFocus
              maxLength={200}
              placeholder="Escribe tu propio reto o verdad. Usa {n} y {o} para los nombres."
              value={texto}
              onChange={(e) => setTexto(e.target.value)}
            />
            <div className="sinlim-custom__actions">
              <button type="button" className="sinlim-custom__cancel" onClick={() => setEditando(false)}>
                <X size={16} /> Cancelar
              </button>
              <button type="submit" className="sinlim-custom__save" disabled={!texto.trim()}>
                Agregar a la partida
              </button>
            </div>
          </form>
        ) : (
          <button className="sinlim-custom__add" onClick={() => setEditando(true)}>
            <Plus size={16} /> Escribir tu propio reto
          </button>
        )}
        <p className="sinlim-custom__hint">
          Se guarda solo en esta partida, en tu teléfono — no se sube a ningún servidor.
        </p>
      </div>
    </div>
  );
}
