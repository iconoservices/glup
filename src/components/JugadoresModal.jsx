import React, { useState } from 'react';
import { Users, Trash2, Plus, X, Check } from 'lucide-react';

export default function JugadoresModal({ jugadores, onClose, onSave, requiredByGame = false }) {
  const [lista, setLista] = useState([...jugadores]);
  const [nuevo, setNuevo] = useState('');

  const agregar = () => {
    const n = nuevo.trim();
    if (!n || lista.includes(n)) return;
    setLista([...lista, n]);
    setNuevo('');
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

        <div className="field">
          <input
            className="input"
            value={nuevo}
            onChange={(e) => setNuevo(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && agregar()}
            placeholder="Nombre del jugador..."
          />
          <button className="btn btn--solid" onClick={agregar} aria-label="Agregar"><Plus size={22} /></button>
        </div>

        <div className="chiplist">
          {lista.length === 0 ? (
            <p className="chiplist__empty">Sin jugadores aún. ¡Agrega a todos!</p>
          ) : lista.map((j, i) => (
            <div key={i} className="chiplist__item">
              <span>{j}</span>
              <button className="icon-btn" onClick={() => setLista(lista.filter((_, idx) => idx !== i))} aria-label={`Quitar ${j}`}>
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
            <Check size={20} /> Guardar y Continuar
          </button>
        </div>
      </div>
    </div>
  );
}
