import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Seo from '../../components/Seo';
import { NIVELES, PROMPTS, contentStats } from './vorContent';

const readable = (t) =>
  t.replaceAll('{n}', '[jugador]').replaceAll('{o}', '[otro]').replaceAll('{yo}', '[jugador]');

export default function VorContenido() {
  const navigate = useNavigate();
  const stats = contentStats();
  const total = stats.reduce((s, n) => s + n.verdad + n.reto, 0);
  const [closed, setClosed] = useState(() => new Set());

  const toggle = (id) =>
    setClosed((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  return (
    <div className="vor-content">
      <Seo
        title="Verdad o Reto +18 — todo el contenido por nivel"
        description="Lista completa de verdades y retos de Verdad o Reto +18, ordenados por nivel: suave, atrevido, loco, pareja, hardcore y 4play."
        path="/verdad-o-reto-18/contenido"
      />

      <div className="vor-game__top">
        <button className="back-link" onClick={() => navigate('/verdad-o-reto-18')}>
          <ArrowLeft size={20} /> Volver
        </button>
        <span className="vor-badge">Contenido</span>
        <span className="vor-score">{total} en total</span>
      </div>

      <div className="vor-content__inner">
        <p className="vor-content__lead">
          Todo lo que está cargado ahora mismo. <b>[jugador]</b> y <b>[otro]</b> se reemplazan
          por nombres reales al jugar.
        </p>

        {NIVELES.map((nv) => {
          const isOpen = !closed.has(nv.id);
          const s = stats.find((x) => x.id === nv.id);
          return (
            <section key={nv.id} className="vor-content__lvl">
              <button
                className="vor-content__head"
                onClick={() => toggle(nv.id)}
                aria-expanded={isOpen}
              >
                <span className="vor-content__emoji">{nv.emoji}</span>
                <span className="vor-content__name">{nv.label}</span>
                <span className="vor-content__count">{s.verdad} verdades · {s.reto} retos</span>
                <span className="vor-content__chev">{isOpen ? '−' : '+'}</span>
              </button>

              {isOpen && (
                <div className="vor-content__body">
                  <h3>Verdades</h3>
                  <ol>
                    {PROMPTS[nv.id].verdad.map((t, i) => <li key={i}>{readable(t)}</li>)}
                  </ol>
                  <h3>Retos</h3>
                  <ol>
                    {PROMPTS[nv.id].reto.map((t, i) => <li key={i}>{readable(t)}</li>)}
                  </ol>
                </div>
              )}
            </section>
          );
        })}
      </div>
    </div>
  );
}
