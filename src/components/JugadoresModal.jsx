import React, { useState } from 'react';
import { Users, Trash2, X, Check, ChevronDown } from 'lucide-react';
import { normalizar, GEN_OPCIONES, CON_OPCIONES } from '../lib/players';

const GEN_DOT = { h: '#1fa8ff', m: '#ff2e88', x: 'var(--text-faint)' };

export default function JugadoresModal({ jugadores, onClose, onSave, requiredByGame = false }) {
  const [lista, setLista] = useState(() => normalizar(jugadores));
  const [nombre, setNombre] = useState('');
  const [gen, setGen] = useState('x');
  const [con, setCon] = useState('ambos');
  const [abierto, setAbierto] = useState(false);

  const agregar = () => {
    const n = nombre.trim();
    if (!n || lista.some((j) => j.name.toLowerCase() === n.toLowerCase())) return;
    setLista([...lista, { name: n, gen, con }]);
    setNombre('');
    setGen('x');
    setCon('ambos');
    setAbierto(false);
  };

  return (
    <div className="sheet-backdrop" onClick={(e) => { if (e.target === e.currentTarget && !requiredByGame) onClose(); }}>
      <div className="sheet">
        <div className="sheet__handle" />
        <div className="sheet__head">
          <h2 className="sheet__title"><Users size={20} /> Jugadores</h2>
          {!requiredByGame && (
            <button className="icon-btn" onClick={onClose} aria-label="Cerrar"><X size={22} /></button>
          )}
        </div>

        {requiredByGame && (
          <p className="hint">⚠️ Este juego necesita jugadores. Agrega al menos 2 para continuar.</p>
        )}

        <div className="jm-form">
          <input
            className="input"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && agregar()}
            placeholder="Nombre del jugador"
          />

          <button
            type="button"
            className={`jm-more${abierto ? ' is-open' : ''}`}
            onClick={() => setAbierto((v) => !v)}
          >
            <ChevronDown size={14} /> Género y orientación (opcional)
          </button>

          {abierto && (
            <>
              <p className="jm-form__label">Es</p>
              <div className="jm-seg">
                {GEN_OPCIONES.map((g) => (
                  <button
                    key={g.id}
                    className={`jm-seg__btn${gen === g.id ? ' is-on' : ''}`}
                    onClick={() => setGen(g.id)}
                  >
                    {g.label}
                  </button>
                ))}
              </div>

              <p className="jm-form__label">Acepta retos de contacto con</p>
              <div className="jm-seg">
                {CON_OPCIONES.map((c) => (
                  <button
                    key={c.id}
                    className={`jm-seg__btn${con === c.id ? ' is-on' : ''}`}
                    onClick={() => setCon(c.id)}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </>
          )}

          <button className="btn btn--solid btn--block" onClick={agregar} disabled={!nombre.trim()}>
            Añadir jugador
          </button>
        </div>

        <div className="chiplist">
          {lista.length === 0 ? (
            <p className="chiplist__empty">Sin jugadores aún.</p>
          ) : lista.map((j, i) => (
            <div key={i} className="chiplist__item">
              <span>
                <span className="jm-dot" style={{ background: GEN_DOT[j.gen] || GEN_DOT.x }} /> {j.name}
              </span>
              <button className="icon-btn" onClick={() => setLista(lista.filter((_, idx) => idx !== i))} aria-label={`Quitar ${j.name}`}>
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '0.6rem' }}>
          {requiredByGame && (
            <button className="btn btn--ghost btn--block" style={{ border: '2px solid var(--line-2)' }} onClick={onClose}>
              Cancelar
            </button>
          )}
          <button className="btn btn--solid btn--block" style={{ flex: 2 }} onClick={() => onSave(lista)}>
            <Check size={20} /> Guardar y continuar
          </button>
        </div>
      </div>
    </div>
  );
}
