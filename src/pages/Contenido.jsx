import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Seo from '../components/Seo';
import { GLUP_CONTENIDO } from '../gameContent';
import { NIVELES as VOR_NIVELES, PROMPTS as VOR_PROMPTS } from '../apps-hub/vor18/vorContent';
import {
  NIVELES as TRIOS_NIVELES,
  PROMPTS as TRIOS_PROMPTS,
  BOTELLA_RETOS as TRIOS_BOTELLA,
} from '../apps-hub/trios/triosContent';
import {
  NIVELES as SW_NIVELES,
  PROMPTS as SW_PROMPTS,
  ROMPEHIELOS as SW_ROMPEHIELOS,
  RULETA_RETOS as SW_RULETA,
} from '../apps-hub/swinger/swingerContent';

const NIVEL_LABEL = { suave: 'Suave', intermedio: 'Medio', picante: 'Picante' };

const readVor = (t) =>
  t.replaceAll('{n}', '[jugador]').replaceAll('{o}', '[otro]').replaceAll('{yo}', '[jugador]');
const readTrios = (t) =>
  t.replaceAll('{no}', '[los otros dos]')
    .replaceAll('{n}', '[jugador]')
    .replaceAll('{o}', '[otro]')
    .replaceAll('{p}', '[el tercero]');
const readSw = (t) =>
  t.replaceAll('{no}', '[otras dos]').replaceAll('{n}', '[persona]').replaceAll('{o}', '[otra]');

function Bloque({ id, titulo, emoji, sub, children, open, onToggle }) {
  return (
    <section className="cbank__item">
      <button className="cbank__head" onClick={() => onToggle(id)} aria-expanded={open}>
        <span className="cbank__emoji">{emoji}</span>
        <span className="cbank__name">{titulo}</span>
        {sub && <span className="cbank__sub">{sub}</span>}
        <span className="cbank__chev">{open ? '−' : '+'}</span>
      </button>
      {open && <div className="cbank__body">{children}</div>}
    </section>
  );
}

export default function Contenido() {
  const [open, setOpen] = useState(() => new Set());

  useEffect(() => {
    document.documentElement.dataset.route = 'contenido';
    return () => { delete document.documentElement.dataset.route; };
  }, []);

  const toggle = (id) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });

  const totalGlup = GLUP_CONTENIDO.reduce(
    (s, g) => s + g.data.suave.length + g.data.intermedio.length + g.data.picante.length, 0);
  const totalVor = VOR_NIVELES.reduce(
    (s, n) => s + (VOR_PROMPTS[n.id]?.verdad?.length || 0) + (VOR_PROMPTS[n.id]?.reto?.length || 0), 0);
  const totalTrios = TRIOS_NIVELES.reduce(
    (s, n) => s + (TRIOS_PROMPTS[n.id]?.verdad?.length || 0) + (TRIOS_PROMPTS[n.id]?.reto?.length || 0), 0)
    + TRIOS_BOTELLA.length;
  const totalSw = SW_ROMPEHIELOS.length + SW_RULETA.length + SW_NIVELES.reduce(
    (s, n) => s + (SW_PROMPTS[n.id]?.verdad?.length || 0) + (SW_PROMPTS[n.id]?.reto?.length || 0), 0);
  const total = totalGlup + totalVor + totalTrios + totalSw;

  return (
    <div className="cbank">
      <Seo
        title="Todo el contenido de Glup Juegos — verdades, retos y castigos"
        description="El banco completo de Glup Juegos: todas las frases, verdades, retos y castigos de cada juego (Glup!, Verdad o Reto +18 y Tríos), ordenados por nivel."
        path="/contenido"
      />

      <div className="cbank__top">
        <Link className="back-link" to="/"><ArrowLeft size={20} /> Inicio</Link>
        <span className="cbank__count">{total} en total</span>
      </div>

      <div className="cbank__wrap">
        <header className="cbank__intro">
          <h1>Todo el contenido</h1>
          <p>
            Cada frase, verdad, reto y castigo que hay en Glup Juegos, en un solo lugar.
            <b> [jugador]</b>, <b>[otro]</b> y <b>[el tercero]</b> se reemplazan por nombres reales al jugar.
          </p>
        </header>

        <h2 className="cbank__group">🍸 Glup! · {totalGlup} retos</h2>
        {GLUP_CONTENIDO.map((g) => (
          <Bloque
            key={g.slug}
            id={`glup-${g.slug}`}
            emoji={g.emoji}
            titulo={g.titulo}
            sub={`${g.data.suave.length + g.data.intermedio.length + g.data.picante.length} ${g.tipo}`}
            open={open.has(`glup-${g.slug}`)}
            onToggle={toggle}
          >
            {['suave', 'intermedio', 'picante'].map((niv) => (
              <React.Fragment key={niv}>
                <h3>{NIVEL_LABEL[niv]}</h3>
                <ol>{g.data[niv].map((t, i) => <li key={i}>{t}</li>)}</ol>
              </React.Fragment>
            ))}
            <p className="cbank__play"><Link to={`/glup/${g.slug}`}>Jugar a {g.titulo} →</Link></p>
          </Bloque>
        ))}

        <h2 className="cbank__group">🔥 Verdad o Reto +18 · {totalVor} verdades y retos</h2>
        {VOR_NIVELES.map((nv) => (
          <Bloque
            key={nv.id}
            id={`vor-${nv.id}`}
            emoji={nv.emoji}
            titulo={nv.label}
            sub={`${VOR_PROMPTS[nv.id].verdad.length} verdades · ${VOR_PROMPTS[nv.id].reto.length} retos`}
            open={open.has(`vor-${nv.id}`)}
            onToggle={toggle}
          >
            <h3>Verdades</h3>
            <ol>{VOR_PROMPTS[nv.id].verdad.map((t, i) => <li key={i}>{readVor(t)}</li>)}</ol>
            <h3>Retos</h3>
            <ol>{VOR_PROMPTS[nv.id].reto.map((t, i) => <li key={i}>{readVor(t)}</li>)}</ol>
          </Bloque>
        ))}
        <p className="cbank__play"><Link to="/verdad-o-reto-18">Abrir Verdad o Reto +18 →</Link></p>

        <h2 className="cbank__group">😈 Juegos para Tríos +18 · {totalTrios} en total</h2>
        {TRIOS_NIVELES.map((nv) => (
          <Bloque
            key={nv.id}
            id={`trios-${nv.id}`}
            emoji={nv.emoji}
            titulo={nv.label}
            sub={`${TRIOS_PROMPTS[nv.id].verdad.length} verdades · ${TRIOS_PROMPTS[nv.id].reto.length} retos`}
            open={open.has(`trios-${nv.id}`)}
            onToggle={toggle}
          >
            <h3>Verdades</h3>
            <ol>{TRIOS_PROMPTS[nv.id].verdad.map((t, i) => <li key={i}>{readTrios(t)}</li>)}</ol>
            <h3>Retos</h3>
            <ol>{TRIOS_PROMPTS[nv.id].reto.map((t, i) => <li key={i}>{readTrios(t)}</li>)}</ol>
          </Bloque>
        ))}
        <Bloque
          id="trios-botella"
          emoji="🍾"
          titulo="La Botella (tríos)"
          sub={`${TRIOS_BOTELLA.length} retos`}
          open={open.has('trios-botella')}
          onToggle={toggle}
        >
          <ol>{TRIOS_BOTELLA.map((t, i) => <li key={i}>{t}</li>)}</ol>
        </Bloque>
        <p className="cbank__play"><Link to="/juegos-para-trios">Abrir Juegos para Tríos +18 →</Link></p>

        <h2 className="cbank__group">🥂 Fiestas Swinger · {totalSw} en total</h2>
        <Bloque
          id="sw-hielo"
          emoji="🥂"
          titulo="Rompehielos"
          sub={`${SW_ROMPEHIELOS.length} frases`}
          open={open.has('sw-hielo')}
          onToggle={toggle}
        >
          <ol>{SW_ROMPEHIELOS.map((t, i) => <li key={i}>{readSw(t)}</li>)}</ol>
        </Bloque>
        {SW_NIVELES.map((nv) => (
          <Bloque
            key={nv.id}
            id={`sw-${nv.id}`}
            emoji={nv.emoji}
            titulo={nv.label}
            sub={`${SW_PROMPTS[nv.id].verdad.length} verdades · ${SW_PROMPTS[nv.id].reto.length} retos`}
            open={open.has(`sw-${nv.id}`)}
            onToggle={toggle}
          >
            <h3>Verdades</h3>
            <ol>{SW_PROMPTS[nv.id].verdad.map((t, i) => <li key={i}>{readSw(t)}</li>)}</ol>
            <h3>Retos</h3>
            <ol>{SW_PROMPTS[nv.id].reto.map((t, i) => <li key={i}>{readSw(t)}</li>)}</ol>
          </Bloque>
        ))}
        <Bloque
          id="sw-ruleta"
          emoji="🎯"
          titulo="La Ruleta de Parejas"
          sub={`${SW_RULETA.length} retos`}
          open={open.has('sw-ruleta')}
          onToggle={toggle}
        >
          <ol>{SW_RULETA.map((t, i) => <li key={i}>{t}</li>)}</ol>
        </Bloque>
        <p className="cbank__play"><Link to="/fiestas-swinger">Abrir Fiestas Swinger →</Link></p>
      </div>
    </div>
  );
}
