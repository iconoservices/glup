import React, { useState, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowLeft, RefreshCw, SkipForward, Check, X } from 'lucide-react';
import Seo from '../../components/Seo';
import { useSettings } from '../../context/useSettings';
import { buildBotellaPrompt, getComposicion } from './triosContent';
import { nombre } from '../../lib/players';
import RetoTimer, { extractSeconds } from '../../components/RetoTimer';

const SPIN_MS = 3200;
const anguloJugador = (i, n) => -90 + (360 * i) / n;

function BottleSVG() {
  return (
    <svg className="bottle-svg" viewBox="0 0 200 64" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect x="6" y="12" width="118" height="40" rx="20" fill="var(--accent)" />
      <rect x="120" y="22" width="44" height="20" rx="8" fill="var(--accent)" />
      <rect x="162" y="17" width="16" height="30" rx="5" fill="var(--yellow)" />
      <ellipse cx="42" cy="24" rx="16" ry="7" fill="#fff" fillOpacity="0.28" />
    </svg>
  );
}

export default function TriosBotella() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const { jugadores } = useSettings();

  const rawNivel = params.get('nivel');
  const initNivel = rawNivel === 'picante' || rawNivel === 'extremo' ? rawNivel : 'suave';

  const [girando, setGirando] = useState(false);
  const [elegidoIdx, setElegidoIdx] = useState(null);
  const [tipo, setTipo] = useState('reto');
  const [relacion, setRelacion] = useState(params.get('relacion') === 'solteros' ? 'solteros' : 'pareja'); // 'pareja' | 'solteros'
  const [nivel, setNivel] = useState(initNivel); // 'suave' | 'picante' | 'extremo'
  const [contadorVueltas, setContadorVueltas] = useState(0);
  const [propuestaSubir, setPropuestaSubir] = useState(null); // null | 'picante' | 'extremo'
  const [retrasos, setRetrasos] = useState({ picante: 0, extremo: 0 });

  const [promptObj, setPromptObj] = useState(null);
  const anguloRef = useRef(0);
  const spinRef = useRef(null);

  const n = jugadores.length;
  const comp = getComposicion(jugadores);

  const cambiarTipo = (nuevoTipo) => {
    if (elegidoIdx === null) return;
    setTipo(nuevoTipo);
    const eleg = jugadores[elegidoIdx];
    try {
      setPromptObj(buildBotellaPrompt(eleg, nuevoTipo, jugadores, relacion, nivel));
    } catch (e) {
      console.error(e);
    }
  };

  const saltarReto = () => {
    if (elegidoIdx === null) return;
    const eleg = jugadores[elegidoIdx];
    try {
      setPromptObj(buildBotellaPrompt(eleg, tipo, jugadores, relacion, nivel));
    } catch (e) {
      console.error(e);
    }
  };

  const girar = () => {
    if (girando || n < 3 || !spinRef.current) return;
    setGirando(true);
    setElegidoIdx(null);
    setPromptObj(null);

    const winner = Math.floor(Math.random() * n);
    const objetivo = anguloJugador(winner, n);
    const desde = anguloRef.current;
    const vueltas = 4 + Math.floor(Math.random() * 3);
    const delta = (((objetivo - desde) % 360) + 360) % 360;
    const hasta = desde + vueltas * 360 + delta;
    anguloRef.current = hasta;

    try {
      spinRef.current.animate(
        [{ transform: `rotate(${desde}deg)` }, { transform: `rotate(${hasta}deg)` }],
        { duration: SPIN_MS, easing: 'cubic-bezier(0.15, 0.85, 0.15, 1)', fill: 'forwards' }
      );
    } catch (e) {
      console.warn('Animation fallback', e);
    }

    setTimeout(() => {
      try {
        const eleg = jugadores[winner];
        setElegidoIdx(winner);
        const nuevaVuelta = contadorVueltas + 1;
        setContadorVueltas(nuevaVuelta);

        setPromptObj(buildBotellaPrompt(eleg, tipo, jugadores, relacion, nivel));

        // Revisar si corresponde proponer cambio de nivel
        if (nivel === 'suave') {
          if (nuevaVuelta >= 10 && retrasos.picante === 0) {
            setPropuestaSubir('picante');
          } else if (retrasos.picante > 0 && nuevaVuelta >= 10 + retrasos.picante) {
            setPropuestaSubir('picante_forzado');
          }
        } else if (nivel === 'picante') {
          if (nuevaVuelta >= 20 && retrasos.extremo === 0) {
            setPropuestaSubir('extremo');
          } else if (retrasos.extremo > 0 && nuevaVuelta >= 20 + retrasos.extremo) {
            setPropuestaSubir('extremo_forzado');
          }
        }
      } catch (err) {
        console.error('Error al generar reto de botella:', err);
      } finally {
        setGirando(false);
      }
    }, SPIN_MS);
  };

  return (
    <div className="vor-game">
      <Seo
        title="Botella para Tríos +18 — gira y apunta exacto"
        description="La botella para tríos: gira, apunta exacto a quién le toca y le sale un reto picante con otra persona. Gratis y sin descargar."
        path="/juegos-para-trios/botella"
      />

      <div className="vor-game__top">
        <button className="back-link" onClick={() => navigate('/juegos-para-trios')}>
          <ArrowLeft size={20} /> Salir
        </button>
        <span className="vor-badge">🍾 La Botella · Vuelta {contadorVueltas}</span>
        <span className="vor-score" />
      </div>

      {n < 3 ? (
        <div className="vor-content__inner">
          <p className="vor-content__lead">Necesitas al menos 3 personas. Volvé y agregá jugadores.</p>
        </div>
      ) : (
        <div className="trios-botella">
          {/* Selector de Nivel de Calentamiento */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.35rem', marginBottom: '0.45rem', flexWrap: 'wrap' }}>
            <button
              type="button"
              className={`btn btn--sm ${nivel === 'suave' ? 'btn--solid' : 'btn--outline'}`}
              style={{ fontSize: '0.74rem', padding: '0.3rem 0.6rem' }}
              onClick={() => setNivel('suave')}
              disabled={girando}
            >
              🌱 Suave (con ropa)
            </button>
            <button
              type="button"
              className={`btn btn--sm ${nivel === 'picante' ? 'btn--solid' : 'btn--outline'}`}
              style={{ fontSize: '0.74rem', padding: '0.3rem 0.6rem' }}
              onClick={() => setNivel('picante')}
              disabled={girando}
            >
              😏 Picante (menos ropa)
            </button>
            <button
              type="button"
              className={`btn btn--sm ${nivel === 'extremo' ? 'btn--solid' : 'btn--outline'}`}
              style={{ fontSize: '0.74rem', padding: '0.3rem 0.6rem' }}
              onClick={() => setNivel('extremo')}
              disabled={girando}
            >
              🔞 Al Límite (explícito)
            </button>
          </div>

          {/* Selector de dinámica: Pareja + Invitado o 3 Amigos */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginBottom: '0.85rem' }}>
            <button
              type="button"
              className={`btn btn--sm ${relacion === 'pareja' ? 'btn--solid' : 'btn--outline'}`}
              style={{ fontSize: '0.76rem', padding: '0.25rem 0.65rem' }}
              onClick={() => {
                setRelacion('pareja');
                if (elegidoIdx !== null) {
                  setPromptObj(buildBotellaPrompt(jugadores[elegidoIdx], tipo, jugadores, 'pareja', nivel));
                }
              }}
              disabled={girando}
            >
              💍 Pareja + Invitado
            </button>
            <button
              type="button"
              className={`btn btn--sm ${relacion === 'solteros' ? 'btn--solid' : 'btn--outline'}`}
              style={{ fontSize: '0.76rem', padding: '0.25rem 0.65rem' }}
              onClick={() => {
                setRelacion('solteros');
                if (elegidoIdx !== null) {
                  setPromptObj(buildBotellaPrompt(jugadores[elegidoIdx], tipo, jugadores, 'solteros', nivel));
                }
              }}
              disabled={girando}
            >
              ⚡ 3 Amigos / Libres
            </button>
          </div>

          <button
            className={`bottle-stage${girando ? ' is-spinning' : ''}`}
            onClick={girar}
            disabled={girando}
            aria-label="Girar la botella"
          >
            <span className="bottle-ring" />
            {jugadores.map((j, i) => {
              const a = (anguloJugador(i, n) * Math.PI) / 180;
              const x = 50 + 45 * Math.cos(a);
              const y = 50 + 45 * Math.sin(a);
              return (
                <span
                  key={i}
                  className={`bottle-name${i === elegidoIdx ? ' is-chosen' : ''}`}
                  style={{ left: `${x}%`, top: `${y}%` }}
                >
                  {nombre(j)}
                </span>
              );
            })}
            <span className="bottle-spin" ref={spinRef}><BottleSVG /></span>
          </button>

          <p className="stage__hint">{girando ? 'Girando la botella...' : 'Toca la botella para girarla'}</p>

          {promptObj && (
            <div className="botella-overlay" onClick={() => setPromptObj(null)}>
              <div
                className={`vor-card is-active is-${tipo} botella-modal-card`}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="vor-card__header-bar">
                  <span className="vor-card__tag">{tipo === 'verdad' ? 'VERDAD' : 'RETO'}</span>
                  {comp && comp.badge && (
                    <span className="vor-card__comp-badge">{comp.badge}</span>
                  )}
                  <button
                    type="button"
                    className="btn-icon"
                    onClick={() => setPromptObj(null)}
                    style={{ marginLeft: 'auto', background: 'transparent', border: 'none', color: 'var(--text-dim)', cursor: 'pointer', padding: '0.2rem' }}
                    aria-label="Cerrar"
                  >
                    <X size={18} />
                  </button>
                </div>

                <div className="vor-card__turn-banner">
                  <span className="vor-card__turn-title">
                    🍾 APUNTA A: <strong style={{ color: '#fff' }}>{promptObj.jugador}</strong>
                  </span>
                  {promptObj.gen && (
                    <span className={`jm-badge jm-badge--${promptObj.gen === 'm' ? 'm' : 'h'}`}>
                      {promptObj.gen === 'm' ? '♀ Mujer' : '♂ Hombre'}
                    </span>
                  )}
                  {promptObj.roleLabel && (
                    <span className="jm-badge jm-badge--con">{promptObj.roleLabel}</span>
                  )}
                </div>

                <div className="vor-actions" style={{ marginBottom: '1rem', marginTop: '0.2rem' }}>
                  <button
                    type="button"
                    className={`btn-action btn-action--verdad${tipo === 'verdad' ? ' is-on' : ''}`}
                    onClick={() => cambiarTipo('verdad')}
                    disabled={girando}
                  >
                    Verdad
                  </button>
                  <button
                    type="button"
                    className={`btn-action btn-action--reto${tipo === 'reto' ? ' is-on' : ''}`}
                    onClick={() => cambiarTipo('reto')}
                    disabled={girando}
                  >
                    Reto
                  </button>
                </div>

                <p className="vor-card__text">{promptObj.text}</p>

                {/* Temporizador automático si el reto incluye segundos o minutos */}
                <RetoTimer seconds={extractSeconds(promptObj.text)} />

                {/* Botones de acción: Saltar reto, Cumplido / Continuar, Cerrar */}
                <div className="reto-actions-bar" style={{ marginTop: '1.25rem' }}>
                  <button
                    type="button"
                    className="btn btn--outline btn--sm"
                    onClick={saltarReto}
                    title="Cambiar por otro reto sin girar de nuevo"
                  >
                    <SkipForward size={14} /> Saltar reto
                  </button>
                  <button
                    type="button"
                    className="btn btn--solid btn--sm"
                    onClick={() => {
                      setPromptObj(null);
                      setTimeout(girar, 100);
                    }}
                    title="Marcar como cumplido y girar otra vez"
                  >
                    <Check size={14} /> Cumplido / Girar
                  </button>
                  <button
                    type="button"
                    className="btn btn--outline btn--sm"
                    onClick={() => setPromptObj(null)}
                    title="Cerrar la tarjeta y volver a la mesa"
                  >
                    <X size={14} /> Cerrar
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Modal de Propuesta de Cambio de Nivel (Automático) */}
          {propuestaSubir && (
            <div className="botella-overlay" onClick={() => setPropuestaSubir(null)}>
              <div
                className="botella-modal-card vor-card is-active"
                onClick={(e) => e.stopPropagation()}
                style={{
                  textAlign: 'center',
                  padding: '1.6rem 1.25rem',
                  border: '1.5px solid var(--accent)',
                  boxShadow: '0 10px 40px rgba(255, 46, 136, 0.4)',
                }}
              >
                <div style={{ fontSize: '2.5rem', marginBottom: '0.4rem' }}>
                  {propuestaSubir.startsWith('extremo') ? '🔞' : '🔥'}
                </div>

                <h3 style={{ fontFamily: 'Fredoka, sans-serif', fontSize: '1.35rem', color: '#fff', marginBottom: '0.6rem' }}>
                  {propuestaSubir === 'picante' && '¿Subimos al nivel PICANTE?'}
                  {propuestaSubir === 'picante_forzado' && '¿Ahora sí, seguros? 😏'}
                  {propuestaSubir === 'extremo' && '¿Pasamos al nivel AL LÍMITE?'}
                  {propuestaSubir === 'extremo_forzado' && '¡Último aviso: Al Límite! 🔞'}
                </h3>

                <p style={{ fontSize: '0.9rem', color: 'var(--text-dim)', lineHeight: 1.5, marginBottom: '1.2rem' }}>
                  {propuestaSubir === 'picante' &&
                    'Lleváis 10 vueltas de calentamiento con ropa. El ambiente ya está listo para que empiece a salir ropa y besos con lengua. ¿Los tres se animan?'}
                  {propuestaSubir === 'picante_forzado' &&
                    'Ya pasaron las vueltas extra de calentamiento. ¿Subimos a Picante? ¡El que diga que no... bebe 2 tragos o se quita una prenda!'}
                  {propuestaSubir === 'extremo' &&
                    'La temperatura está al máximo. ¿Se animan los tres a pasar a lo explícito (sexo oral, penetraciones y retos al límite)?'}
                  {propuestaSubir === 'extremo_forzado' &&
                    '¡Es el momento de desatarlo todo! Consenso de los tres. El que tenga dudas, bebe un trago doble y ¡a jugar!'}
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                  <button
                    type="button"
                    className="btn btn--solid"
                    style={{ padding: '0.75rem', fontSize: '0.95rem', fontWeight: 700 }}
                    onClick={() => {
                      const nextNivel = propuestaSubir.startsWith('extremo') ? 'extremo' : 'picante';
                      setNivel(nextNivel);
                      setPropuestaSubir(null);
                      if (elegidoIdx !== null) {
                        setPromptObj(buildBotellaPrompt(jugadores[elegidoIdx], tipo, jugadores, relacion, nextNivel));
                      }
                    }}
                  >
                    {propuestaSubir.startsWith('extremo') ? '🔞 ¡Sí, vamos con todo al límite!' : '🔥 ¡Sí, pasar a Picante!'}
                  </button>

                  <button
                    type="button"
                    className="btn btn--outline"
                    style={{ padding: '0.6rem', fontSize: '0.85rem' }}
                    onClick={() => {
                      if (propuestaSubir.startsWith('picante')) {
                        setRetrasos((r) => ({ ...r, picante: r.picante + 1 }));
                      } else {
                        setRetrasos((r) => ({ ...r, extremo: r.extremo + 1 }));
                      }
                      setPropuestaSubir(null);
                    }}
                  >
                    🌱 1 vuelta más antes de subir
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
