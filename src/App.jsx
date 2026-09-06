import React, { useState, useMemo } from 'react';
import { Home, Settings, Beer, Users, Trash2, Plus, X, Check, RotateCcw, Info, Star, Search } from 'lucide-react';
import { accentStyle } from './theme';
import { CATEGORIES, GAMES, gamesByCategory, searchGames } from './catalog';
import TrueOrDare from './apps/verdad-reto/TrueOrDare';
import Ruleta from './apps/ruleta/Ruleta';
import Dados from './apps/dados/Dados';
import YoNunca from './apps/yonunca/YoNunca';
import CincoSegundos from './apps/cinco-segundos/CincoSegundos';
import ModoCaos from './apps/modo-caos/ModoCaos';
import PreParty from './apps/precopeo/PreParty';
import ReglasPropias from './apps/personalizado/ReglasPropias';
import Botella from './apps/botella/Botella';

// ────────── Helpers de localStorage ──────────
const loadSetting = (key, fallback) => {
  try { const v = localStorage.getItem(key); return v !== null ? JSON.parse(v) : fallback; }
  catch { return fallback; }
};
const saveSetting = (key, value) => { try { localStorage.setItem(key, JSON.stringify(value)); } catch { } };

// ────────── Juegos que requieren jugadores ──────────
const JUEGOS_CON_JUGADORES = ['botella'];

const HEAT_META = {
  suave: { emoji: '😇', label: 'Suave' },
  intermedio: { emoji: '😏', label: 'Medio' },
  picante: { emoji: '🔥', label: 'Picante' },
};

// ────────── Emoji por juego (portada de tarjeta) ──────────
const GLYPHS = {
  yonunca: '🍸', botella: '🍾', precopeo: '🍺', ruleta: '🎯', dados: '🎲',
  'verdad-reto': '🔥', '5segundos': '⏰', personalizado: '✍️', 'mix-azar': '🌀',
  'piramide-para-beber': '🎴', 'quien-es-mas-probable-que': '🤔',
};
const glyphFor = (g) => GLYPHS[g.gameId] || GLYPHS[g.slug] || '🎲';

// ────────── Estrellas a partir de una nota ("4.8" / "—") ──────────
const stars = (r) => {
  if (!r || r === '—') return '☆☆☆☆☆';
  const n = Math.round(parseFloat(r));
  return '★★★★★'.slice(0, n) + '☆☆☆☆☆'.slice(0, 5 - n);
};

// ────────── Modal de Jugadores ──────────
function JugadoresModal({ jugadores, onClose, onSave, requiredByGame = false }) {
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
            <button className="btn btn--ghost btn--block" style={{ border: '2px solid var(--line-strong)' }} onClick={onClose}>
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

// ────────── Tarjeta de juego (estilo tienda de apps, texto rico para SEO) ──────────
function GameCard({ game, onClick }) {
  const badge = game.soon ? 'Pronto' : game.beta ? 'Beta' : 'Estable';
  return (
    <article className={`gcard${game.soon ? ' is-soon' : ''}`} style={accentStyle(game.accent)} onClick={game.soon ? undefined : onClick}>
      <div className="gcard__cover">
        <span className="glyph">{glyphFor(game)}</span>
        <span className={`gcard__badge${game.soon ? ' gcard__badge--soon' : ''}`}>{badge}</span>
      </div>
      <div className="gcard__body">
        <h3 className="gcard__title">{game.title}</h3>
        <div className="gcard__rating"><span className="stars">{stars(game.rating)}</span> {game.rating}</div>
        <p className="gcard__desc">{game.seo}</p>
        <div className="gcard__meta">
          <span className="gcard__chip">{game.chip}</span>
          <span>{game.soon ? 'v0.1' : 'v1.0'}</span>
        </div>
        {game.soon
          ? <button className="gcard__cta gcard__cta--soon" disabled>Avísame</button>
          : <button className="gcard__cta">Jugar</button>}
      </div>
    </article>
  );
}

// ────────── Pantalla Ajustes ──────────
function AjustesScreen({ drinkingMode, intensity, jugadores, onUpdateDrinking, onUpdateIntensity, onShowJugadores, onReset, deferredPrompt, onInstall }) {
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const SettingRow = ({ icon, label, value, onClick }) => (
    <div className={`set-row${onClick ? ' set-row--tap' : ''}`} onClick={onClick}>
      <div className="set-row__main">{icon}<span>{label}</span></div>
      <span className="set-row__value">{value}</span>
    </div>
  );

  return (
    <main className="settings">
      <p className="section-label">⚙️ Ajustes</p>

      <div>
        <p className="set-group__label">SESIÓN DE JUEGO</p>
        <SettingRow
          icon={<Beer size={18} />}
          label="Modo Tragos"
          value={drinkingMode ? '🍻 Activado' : 'Desactivado'}
          onClick={() => onUpdateDrinking(!drinkingMode)}
        />
        <SettingRow
          icon={<span style={{ fontSize: '1.05rem' }}>🎚️</span>}
          label="Nivel de Intensidad"
          value={`${HEAT_META[intensity].emoji} ${HEAT_META[intensity].label}`}
        />
        <div className="heat-seg">
          {Object.keys(HEAT_META).map((level) => (
            <button key={level} className={`heat-btn${intensity === level ? ' is-on' : ''}`} onClick={() => onUpdateIntensity(level)}>
              {HEAT_META[level].emoji}
            </button>
          ))}
        </div>
        <SettingRow
          icon={<Users size={18} />}
          label="Jugadores"
          value={jugadores.length > 0 ? `${jugadores.length} registrados` : 'Ninguno'}
          onClick={onShowJugadores}
        />
      </div>

      <div>
        <p className="set-group__label">CONTENIDO</p>
        <div className="set-row set-row--premium">
          <div className="set-row__main">
            <Star size={18} color="#ffd700" />
            <div>
              <p style={{ color: '#fff', fontWeight: 700, fontFamily: 'Fredoka, sans-serif' }}>Pase Glup!</p>
              <p style={{ color: 'var(--text-dim)', fontSize: '0.8rem' }}>Desbloquea el nivel "Nivel Dios" en todos los juegos</p>
            </div>
          </div>
          <span style={{ color: '#ffd700', fontWeight: 700, fontSize: '0.85rem' }}>Próx.</span>
        </div>
      </div>

      <div>
        <p className="set-group__label">INFORMACIÓN</p>
        {deferredPrompt && (
          <button className="btn btn--outline btn--block" style={{ marginBottom: '0.55rem' }} onClick={onInstall}>
            <Plus size={18} /> Instalar Glup! en Pantalla de Inicio
          </button>
        )}
        <SettingRow icon={<Info size={18} />} label="Versión de Glup!" value="v0.2.0 Beta" />
        <SettingRow icon={<span>🔞</span>} label="Solo para mayores de edad" value="+18" />
      </div>

      <div>
        <p className="set-group__label">ZONA PELIGROSA</p>
        {!showResetConfirm ? (
          <button className="btn btn--outline btn--block" style={accentStyle('red')} onClick={() => setShowResetConfirm(true)}>
            <RotateCcw size={18} /> Reiniciar toda la configuración
          </button>
        ) : (
          <div className="set-row set-row--danger" style={{ flexDirection: 'column', gap: '0.75rem', alignItems: 'stretch' }}>
            <p style={{ color: 'var(--c-red)', textAlign: 'center', fontSize: '0.9rem' }}>¿Seguro? Esto borra jugadores y configuración.</p>
            <div style={{ display: 'flex', gap: '0.6rem' }}>
              <button className="btn btn--ghost btn--block" style={{ border: '2px solid var(--line-strong)' }} onClick={() => setShowResetConfirm(false)}>No</button>
              <button className="btn btn--solid btn--block" style={accentStyle('red')} onClick={() => { onReset(); setShowResetConfirm(false); }}>Sí, reiniciar</button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

// ────────── App Principal ──────────
function App() {
  const [drinkingMode, setDrinkingMode] = useState(() => loadSetting('drinkingMode', false));
  const [intensity, setIntensity] = useState(() => loadSetting('intensity', 'intermedio'));
  const [jugadores, setJugadores] = useState(() => loadSetting('jugadores', []));

  const [activeGame, setActiveGame] = useState(null);
  const [activeTab, setActiveTab] = useState('inicio');
  const [query, setQuery] = useState('');
  const [catFilter, setCatFilter] = useState('todos');
  const [showJugadores, setShowJugadores] = useState(false);
  const [jugadoresRequired, setJugadoresRequired] = useState(false);
  const [pendingGame, setPendingGame] = useState(null);

  // PWA Install Logic
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  React.useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') setDeferredPrompt(null);
  };

  const updateDrinking = (v) => { setDrinkingMode(v); saveSetting('drinkingMode', v); };
  const updateIntensity = (v) => { setIntensity(v); saveSetting('intensity', v); };
  const updateJugadores = (lista) => {
    setJugadores(lista);
    saveSetting('jugadores', lista);
    setShowJugadores(false);
    setJugadoresRequired(false);
    if (pendingGame && lista.length >= 2) {
      setActiveGame(pendingGame);
      setPendingGame(null);
    }
  };

  const resetAll = () => {
    updateDrinking(false);
    updateIntensity('intermedio');
    updateJugadores([]);
    localStorage.clear();
  };

  const handleGameClick = (gameId) => {
    if (!gameId) return;
    if (JUEGOS_CON_JUGADORES.includes(gameId) && jugadores.length < 2) {
      setPendingGame(gameId);
      setJugadoresRequired(true);
      setShowJugadores(true);
      return;
    }
    setActiveGame(gameId);
  };

  const gameProps = { onBack: () => setActiveGame(null), isDrinkingMode: drinkingMode, intensity, jugadores };

  const searching = query.trim().length > 0;
  const searchResults = useMemo(() => searchGames(query), [query]);

  if (activeGame === 'verdad-reto') return <TrueOrDare {...gameProps} />;
  if (activeGame === 'ruleta') return <Ruleta {...gameProps} />;
  if (activeGame === 'dados') return <Dados {...gameProps} />;
  if (activeGame === 'yonunca') return <YoNunca {...gameProps} />;
  if (activeGame === '5segundos') return <CincoSegundos {...gameProps} />;
  if (activeGame === 'mix-azar') return <ModoCaos {...gameProps} />;
  if (activeGame === 'precopeo') return <PreParty {...gameProps} />;
  if (activeGame === 'personalizado') return <ReglasPropias {...gameProps} />;
  if (activeGame === 'botella') return <Botella {...gameProps} />;

  const openJugadores = () => { setJugadoresRequired(false); setShowJugadores(true); };

  return (
    <div className="app">
      {showJugadores && (
        <JugadoresModal
          jugadores={jugadores}
          onClose={() => { setShowJugadores(false); setJugadoresRequired(false); setPendingGame(null); }}
          onSave={updateJugadores}
          requiredByGame={jugadoresRequired}
        />
      )}

      {activeTab === 'inicio' && (
        <>
          <header className="store-hero">
            <span className="brand-eyebrow">Verdad · Reto · Sin Excusas</span>
            <div className="store-hero__top">
              <h1 className="brand-name">Glup!</h1>
              <div className="chip-row chip-row--stack">
                <div className={`chip${drinkingMode ? ' is-on' : ''}`} style={accentStyle('yellow')} onClick={() => updateDrinking(!drinkingMode)}>
                  <Beer size={14} />
                  <span>{drinkingMode ? 'Tragos 🍻' : 'Sin Tragos'}</span>
                </div>
                <div className={`chip${jugadores.length > 0 ? ' is-on' : ''}`} onClick={openJugadores}>
                  <Users size={14} />
                  <span>{jugadores.length > 0 ? `${jugadores.length} jug.` : 'Jugadores'}</span>
                </div>
              </div>
            </div>

            <div className="heat-bar">
              {Object.keys(HEAT_META).map((level) => (
                <button key={level} className={`heat-bar__seg${intensity === level ? ' is-on' : ''}`} onClick={() => updateIntensity(level)}>
                  {HEAT_META[level].emoji} {HEAT_META[level].label}
                </button>
              ))}
            </div>

            <label className="searchbar">
              <Search size={18} />
              <input
                className="searchbar__input"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="¿A qué quieres jugar hoy?"
              />
              {searching && (
                <button className="icon-btn" onClick={() => setQuery('')} aria-label="Limpiar"><X size={16} /></button>
              )}
            </label>
          </header>

          <main className="store">
            {searching ? (
              <>
                <p className="section-label">
                  {searchResults.length > 0 ? `Resultados para "${query}"` : `Nada encontrado para "${query}"`}
                </p>
                <div className="grid-2">
                  {searchResults.map((g) => (
                    <GameCard key={g.slug} game={g} onClick={() => handleGameClick(g.gameId)} />
                  ))}
                </div>
              </>
            ) : (
              <>
                <div className="cat-filter">
                  <button className={`cat-pill${catFilter === 'todos' ? ' is-on' : ''}`} onClick={() => setCatFilter('todos')}>
                    Todos
                  </button>
                  {CATEGORIES.map((c) => (
                    <button
                      key={c.id}
                      className={`cat-pill${catFilter === c.id ? ' is-on' : ''}`}
                      style={accentStyle(c.accent)}
                      onClick={() => setCatFilter(c.id)}
                    >
                      {c.emoji} {c.label}
                    </button>
                  ))}
                </div>

                {catFilter === 'todos' ? (
                  <section className="store-section">
                    <p className="section-label" style={accentStyle('pink')}>🎲 Todos</p>
                    <div className="grid-2">
                      {GAMES.map((g) => (
                        <GameCard key={g.slug} game={g} onClick={() => handleGameClick(g.gameId)} />
                      ))}
                    </div>
                  </section>
                ) : (
                  CATEGORIES.filter((c) => c.id === catFilter).map((cat) => (
                    <section key={cat.id} className="store-section">
                      <p className="section-label" style={accentStyle(cat.accent)}>
                        {cat.emoji} {cat.label}
                      </p>
                      <div className="grid-2">
                        {gamesByCategory(cat.id).map((g) => (
                          <GameCard key={`${cat.id}-${g.slug}`} game={g} onClick={() => handleGameClick(g.gameId)} />
                        ))}
                      </div>
                    </section>
                  ))
                )}
              </>
            )}
          </main>
        </>
      )}

      {activeTab === 'ajustes' && (
        <AjustesScreen
          drinkingMode={drinkingMode}
          intensity={intensity}
          jugadores={jugadores}
          onUpdateDrinking={updateDrinking}
          onUpdateIntensity={updateIntensity}
          onShowJugadores={openJugadores}
          onReset={resetAll}
          deferredPrompt={deferredPrompt}
          onInstall={handleInstallClick}
        />
      )}

      <nav className="tabbar">
        <div className={`tab${activeTab === 'inicio' ? ' is-on' : ''}`} onClick={() => setActiveTab('inicio')}>
          <Home size={22} strokeWidth={1.75} /><span>Inicio</span>
        </div>
        <div className="tab" onClick={openJugadores}>
          <Users size={22} strokeWidth={1.75} />
          <span>{jugadores.length > 0 ? `(${jugadores.length})` : 'Jugadores'}</span>
        </div>
        <div className={`tab${activeTab === 'ajustes' ? ' is-on' : ''}`} onClick={() => setActiveTab('ajustes')}>
          <Settings size={22} strokeWidth={1.75} /><span>Ajustes</span>
        </div>
      </nav>
    </div>
  );
}

export default App;
