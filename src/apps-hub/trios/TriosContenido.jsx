import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Seo from '../../components/Seo';
import { NIVELES, PROMPTS, BOTELLA_RETOS, contentStats, totalPrompts } from './triosContent';

const readable = (t) =>
  t.replaceAll('{no}', '[los otros dos]')
    .replaceAll('{n}', '[jugador]')
    .replaceAll('{o}', '[otro]')
    .replaceAll('{p}', '[el tercero]');

export default function TriosContenido() {
  const navigate = useNavigate();
  const stats = contentStats();
  const [closed, setClosed] = useState(() => new Set());

  const toggle = (id) =>
    setClosed((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });

  return (
    <div className="vor-content">
      <Seo
        title="Juegos para Tríos +18 — todo el contenido"
        description="Lista completa de verdades y retos para tríos, por nivel: picante y extremo, más los retos de la botella."
        path="/juegos-para-trios/contenido"
      />

      <div className="vor-game__top">
        <button className="back-link" onClick={() => navigate('/juegos-para-trios')}>
          <ArrowLeft size={20} /> Volver
        </button>
        <span className="vor-badge">Contenido</span>
        <span className="vor-score">{totalPrompts()} en total</span>
      </div>

      <div className="vor-content__inner">
        <p className="vor-content__lead">
          Todo lo que está cargado. <b>[jugador]</b>, <b>[otro]</b> y <b>[el tercero]</b> se
          reemplazan por los nombres reales al jugar.
        </p>

        {NIVELES.map((nv) => {
          const isOpen = !closed.has(nv.id);
          const s = stats.find((x) => x.id === nv.id);
          return (
            <section key={nv.id} className="vor-content__lvl">
              <button className="vor-content__head" onClick={() => toggle(nv.id)} aria-expanded={isOpen}>
                <span className="vor-content__emoji">{nv.emoji}</span>
                <span className="vor-content__name">{nv.label}</span>
                <span className="vor-content__count">{s.verdad} verdades · {s.reto} retos</span>
                <span className="vor-content__chev">{isOpen ? '−' : '+'}</span>
              </button>
              {isOpen && (
                <div className="vor-content__body">
                  <h3>Verdades</h3>
                  <ol>{PROMPTS[nv.id].verdad.map((t, i) => <li key={i}>{readable(t)}</li>)}</ol>
                  <h3>Retos</h3>
                  <ol>{PROMPTS[nv.id].reto.map((t, i) => <li key={i}>{readable(t)}</li>)}</ol>
                </div>
              )}
            </section>
          );
        })}

        <section className="vor-content__lvl">
          <button
            className="vor-content__head"
            onClick={() => toggle('botella')}
            aria-expanded={!closed.has('botella')}
          >
            <span className="vor-content__emoji">🍾</span>
            <span className="vor-content__name">La Botella</span>
            <span className="vor-content__count">{BOTELLA_RETOS.length} retos</span>
            <span className="vor-content__chev">{closed.has('botella') ? '+' : '−'}</span>
          </button>
          {!closed.has('botella') && (
            <div className="vor-content__body">
              <ol>{BOTELLA_RETOS.map((t, i) => <li key={i}>{t}</li>)}</ol>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
