import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Trash2, X, Check, Pencil, ArrowRight } from 'lucide-react';
import { normalizar } from '../lib/players';

export default function JugadoresModal({ jugadores, onClose, onSave, requiredByGame = false, minimo = 2, maximo = null, onExceso = null }) {
  const navigate = useNavigate();
  const [lista, setLista] = useState(() => normalizar(jugadores));
  const [nombre, setNombre] = useState('');
  const [gen, setGen] = useState('h');
  const [con, setCon] = useState('m');
  const [editandoIdx, setEditandoIdx] = useState(null);

  const [modoTrio, setModoTrio] = useState(() => {
    try {
      return localStorage.getItem('glup_modo_trio') || 'pareja';
    } catch {
      return 'pareja';
    }
  });

  const [parejaIndices, setParejaIndices] = useState(() => {
    const p = [];
    jugadores.forEach((j, i) => {
      if (j && j.esPareja) p.push(i);
    });
    if (p.length === 2) return p;
    return [0, 1];
  });

  const togglePareja = (idx) => {
    if (modoTrio !== 'pareja' || lista.length !== 3) return;
    const currentInvitadoIdx = [0, 1, 2].find((x) => !parejaIndices.includes(x)) ?? 2;
    if (parejaIndices.includes(idx)) {
      setParejaIndices(parejaIndices.map((x) => (x === idx ? currentInvitadoIdx : x)));
    } else {
      setParejaIndices([parejaIndices[0], idx]);
    }
  };

  const agregar = () => {
    const n = nombre.trim();
    if (!n || !gen) return;
    if (lista.some((j, idx) => idx !== editandoIdx && j.name.toLowerCase() === n.toLowerCase())) return;

    if (editandoIdx !== null) {
      setLista(lista.map((j, idx) => (idx === editandoIdx ? { ...j, name: n, gen, con } : j)));
      setEditandoIdx(null);
    } else {
      setLista([...lista, { name: n, gen, con }]);
    }
    setNombre('');
  };

  const empezarEditar = (idx) => {
    const j = lista[idx];
    if (!j) return;
    setEditandoIdx(idx);
    setNombre(j.name);
    setGen(j.gen === 'm' ? 'm' : 'h');
    setCon(j.con || 'ambos');
  };

  const cancelarEdicion = () => {
    setEditandoIdx(null);
    setNombre('');
    setGen('h');
    setCon('m');
  };

  const handleGuardar = () => {
    const listConRoles = lista.map((j, idx) => {
      if (lista.length === 3) {
        const esPareja = modoTrio === 'pareja' && parejaIndices.includes(idx);
        const esInvitado = modoTrio === 'pareja' && !parejaIndices.includes(idx);
        return {
          ...j,
          esPareja,
          esInvitado,
          modoTrio,
        };
      }
      return j;
    });
    try {
      localStorage.setItem('glup_modo_trio', modoTrio);
    } catch {
      /* noop */
    }
    onSave(listConRoles);
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
          <p className="hint">⚠️ Agrega al menos {minimo} persona{minimo === 1 ? '' : 's'} para comenzar a jugar.</p>
        )}

        {maximo && lista.length > maximo && onExceso && (
          <div className="jm-exceso">
            <p>
              Este juego es para {maximo}. Con {lista.length} personas te va a quedar mejor en{' '}
              <b>{onExceso === '/fiestas-swinger' ? 'Fiestas Swinger' : 'otra app'}</b>.
            </p>
            <button type="button" className="jm-exceso__btn" onClick={() => { onClose(); navigate(onExceso); }}>
              Ir a Fiestas Swinger <ArrowRight size={15} />
            </button>
          </div>
        )}

        <div className="jm-form">
          {editandoIdx !== null && (
            <div className="jm-editing-hint">
              <span>Editando jugador #{editandoIdx + 1}</span>
              <button type="button" className="icon-btn" onClick={cancelarEdicion} style={{ width: 'auto', padding: '0 4px', fontSize: '0.72rem' }}>
                Cancelar
              </button>
            </div>
          )}

          <input
            className="input"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && agregar()}
            placeholder="Nombre del jugador"
            autoFocus={editandoIdx !== null}
          />

          <p className="jm-form__label">Género (obligatorio)</p>
          <div className="jm-seg">
            <button
              type="button"
              className={`jm-seg__btn jm-seg__btn--h${gen === 'h' ? ' is-on' : ''}`}
              onClick={() => {
                setGen('h');
                if (con !== 'ambos') setCon('m');
              }}
            >
              ♂ Hombre
            </button>
            <button
              type="button"
              className={`jm-seg__btn jm-seg__btn--m${gen === 'm' ? ' is-on' : ''}`}
              onClick={() => {
                setGen('m');
                if (con !== 'ambos') setCon('h');
              }}
            >
              ♀ Mujer
            </button>
          </div>

          <p className="jm-form__label">Preferencia / Rol</p>
          <div className="jm-seg">
            <button
              type="button"
              className={`jm-seg__btn${con === (gen === 'h' ? 'm' : 'h') ? ' is-on' : ''}`}
              onClick={() => setCon(gen === 'h' ? 'm' : 'h')}
            >
              {gen === 'h' ? 'Solo Mujeres (Hetero)' : 'Solo Hombres (Hetero)'}
            </button>
            <button
              type="button"
              className={`jm-seg__btn${con === 'ambos' ? ' is-on' : ''}`}
              onClick={() => setCon('ambos')}
            >
              {gen === 'h' ? 'Abierto / Sumiso' : 'Ambos (Bi / Abierta)'}
            </button>
            <button
              type="button"
              className={`jm-seg__btn${con === (gen === 'h' ? 'h' : 'm') ? ' is-on' : ''}`}
              onClick={() => setCon(gen === 'h' ? 'h' : 'm')}
            >
              {gen === 'h' ? 'Solo Hombres' : 'Solo Mujeres'}
            </button>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.4rem' }}>
            {editandoIdx !== null && (
              <button type="button" className="btn btn--ghost" style={{ flex: 1 }} onClick={cancelarEdicion}>
                Cancelar
              </button>
            )}
            <button
              type="button"
              className="btn btn--solid"
              style={{ flex: 2 }}
              onClick={agregar}
              disabled={!nombre.trim() || !gen}
            >
              {editandoIdx !== null ? 'Guardar cambios' : 'Añadir jugador'}
            </button>
          </div>
        </div>

        {/* Selector de dinámica para tríos cuando hay 3 jugadores */}
        {lista.length === 3 && (
          <div style={{ margin: '0.9rem 0 0.5rem', padding: '0.75rem', background: 'rgba(255, 255, 255, 0.04)', borderRadius: '10px', border: '1px solid var(--line)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.45rem' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-faint)', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 700 }}>
                Modo de Trío
              </span>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>
                {modoTrio === 'pareja' ? 'Toca para cambiar los 2 anillos 💍' : '3 amigos sin ataduras'}
              </span>
            </div>
            <div style={{ display: 'flex', gap: '0.4rem' }}>
              <button
                type="button"
                className={`btn btn--sm ${modoTrio === 'pareja' ? 'btn--solid' : 'btn--outline'}`}
                style={{ flex: 1, fontSize: '0.78rem', padding: '0.35rem 0.5rem' }}
                onClick={() => setModoTrio('pareja')}
              >
                💍 Pareja + Invitado
              </button>
              <button
                type="button"
                className={`btn btn--sm ${modoTrio === 'solteros' ? 'btn--solid' : 'btn--outline'}`}
                style={{ flex: 1, fontSize: '0.78rem', padding: '0.35rem 0.5rem' }}
                onClick={() => setModoTrio('solteros')}
              >
                ⚡ 3 Amigos / Libres
              </button>
            </div>
          </div>
        )}

        <div className="chiplist">
          {lista.length === 0 ? (
            <p className="chiplist__empty">Sin jugadores aún. Agrega el primero arriba.</p>
          ) : lista.map((j, i) => (
            <div key={i} className={`chiplist__item${editandoIdx === i ? ' is-editing' : ''}`}>
              <div className="chiplist__info">
                <span className="chiplist__name">{j.name}</span>
                <span className={`jm-badge jm-badge--${j.gen === 'm' ? 'm' : 'h'}`}>
                  {j.gen === 'm' ? '♀ Mujer' : '♂ Hombre'}
                </span>
                <span className="jm-badge jm-badge--con">
                  {j.gen === 'h'
                    ? (j.con === 'ambos' ? 'Abierto / Sumiso' : j.con === 'm' ? 'Hetero' : 'Solo Hombres')
                    : (j.con === 'ambos' ? 'Bi / Abierta' : j.con === 'h' ? 'Hetero' : 'Lesbiana')}
                </span>

                {/* Rol de trío (anillos o invitado) */}
                {lista.length === 3 && (
                  modoTrio === 'pareja' ? (
                    <button
                      type="button"
                      className={`jm-ring-btn ${parejaIndices.includes(i) ? 'is-pareja' : 'is-invitado'}`}
                      onClick={() => togglePareja(i)}
                      title="Toca para alternar entre Pareja 💍 e Invitado/a ✨"
                    >
                      {parejaIndices.includes(i) ? '💍 Pareja' : '✨ Invitado/a'}
                    </button>
                  ) : (
                    <span className="jm-ring-btn is-amigo">
                      ⚡ Amigo/a
                    </span>
                  )
                )}
              </div>
              <div className="chiplist__actions">
                <button
                  type="button"
                  className="icon-btn"
                  onClick={() => empezarEditar(i)}
                  aria-label={`Editar ${j.name}`}
                  title="Editar jugador"
                >
                  <Pencil size={15} />
                </button>
                <button
                  type="button"
                  className="icon-btn"
                  onClick={() => {
                    if (editandoIdx === i) cancelarEdicion();
                    setLista(lista.filter((_, idx) => idx !== i));
                  }}
                  aria-label={`Quitar ${j.name}`}
                  title="Eliminar jugador"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '0.6rem' }}>
          {requiredByGame && (
            <button className="btn btn--ghost btn--block" style={{ border: '2px solid var(--line-2)' }} onClick={onClose}>
              Cerrar
            </button>
          )}
          <button className="btn btn--solid btn--block" style={{ flex: 2 }} onClick={handleGuardar}>
            <Check size={20} /> Guardar y continuar
          </button>
        </div>
      </div>
    </div>
  );
}
