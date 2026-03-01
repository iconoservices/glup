import React, { useState } from 'react';
import { Infinity as InfinityIcon, Dices, Flame, Sparkles, Home, Settings, ChevronRight, Shuffle, PenTool, LayoutGrid, GlassWater, Clock, Beer, Users, Trash2, Plus, X, Check, Volume2, VolumeX, RotateCcw, Info, Star } from 'lucide-react';
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
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', display: 'flex',
      justifyContent: 'center', alignItems: 'flex-end', zIndex: 999, backdropFilter: 'blur(8px)'
    }}>
      <div style={{
        width: '100%', maxWidth: '480px', background: '#111', borderRadius: '24px 24px 0 0',
        padding: '2rem 1.5rem', border: '1px solid rgba(255,0,255,0.3)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: requiredByGame ? '0.5rem' : '1.5rem' }}>
          <h2 style={{ color: '#ff00ff', fontWeight: '800', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Users size={20} /> Jugadores
          </h2>
          {!requiredByGame && <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: '#a0a0a0', cursor: 'pointer' }}><X size={24} /></button>}
        </div>

        {requiredByGame && (
          <p style={{ color: '#a0a0a0', fontSize: '0.85rem', marginBottom: '1.25rem' }}>
            ⚠️ Este juego necesita jugadores. Agrega al menos 2 para continuar.
          </p>
        )}

        <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem' }}>
          <input value={nuevo} onChange={(e) => setNuevo(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && agregar()}
            placeholder="Nombre del jugador..."
            style={{ flex: 1, padding: '0.85rem 1rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '12px', color: '#fff', fontSize: '0.95rem', fontFamily: 'Outfit, sans-serif', outline: 'none' }}
          />
          <button onClick={agregar} style={{ padding: '0.85rem 1rem', background: 'rgba(255,0,255,0.2)', border: '1px solid rgba(255,0,255,0.4)', borderRadius: '12px', color: '#ff00ff', cursor: 'pointer' }}>
            <Plus size={22} />
          </button>
        </div>

        <div style={{ maxHeight: '180px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.5rem' }}>
          {lista.length === 0 ? (
            <p style={{ color: '#555', textAlign: 'center', padding: '1rem' }}>Sin jugadores aún. ¡Agrega a todos!</p>
          ) : lista.map((j, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem 1rem', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px' }}>
              <span>{j}</span>
              <button onClick={() => setLista(lista.filter((_, idx) => idx !== i))} style={{ background: 'transparent', border: 'none', color: '#555', cursor: 'pointer' }}><Trash2 size={16} /></button>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          {requiredByGame && (
            <button onClick={onClose} style={{ flex: 1, padding: '1rem', background: 'transparent', border: '1px solid #555', borderRadius: '15px', color: '#a0a0a0', fontSize: '0.95rem', cursor: 'pointer', fontFamily: 'Outfit, sans-serif' }}>
              Cancelar
            </button>
          )}
          <button onClick={() => onSave(lista)} style={{ flex: 2, padding: '1rem', background: 'rgba(255,0,255,0.2)', border: '1px solid #ff00ff', borderRadius: '15px', color: '#ff00ff', fontSize: '1rem', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', fontFamily: 'Outfit, sans-serif' }}>
            <Check size={20} /> Guardar y Continuar
          </button>
        </div>
      </div>
    </div>
  );
}

// ────────── Pantalla Ajustes ──────────
function AjustesScreen({ drinkingMode, intensity, jugadores, onUpdateDrinking, onUpdateIntensity, onShowJugadores, onReset, deferredPrompt, onInstall }) {
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const settingRow = (icon, label, value, onClick, accentColor = '#ff00ff') => (
    <div onClick={onClick} style={{
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      padding: '1rem 1.25rem', background: 'rgba(30,30,30,0.6)', border: '1px solid rgba(255,255,255,0.08)',
      borderRadius: '15px', cursor: onClick ? 'pointer' : 'default', transition: 'all 0.2s'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <span style={{ color: accentColor }}>{icon}</span>
        <span style={{ fontSize: '1rem', color: '#ddd' }}>{label}</span>
      </div>
      <span style={{ color: '#a0a0a0', fontSize: '0.9rem' }}>{value}</span>
    </div>
  );

  return (
    <main style={{ paddingBottom: '5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <p style={{ color: '#ff00ff', fontSize: '1.1rem', fontWeight: 600 }}>⚙️ Ajustes</p>

      {/* Sesión de juego */}
      <div>
        <p style={{ color: '#777', fontSize: '0.8rem', letterSpacing: '2px', marginBottom: '0.75rem' }}>SESIÓN DE JUEGO</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
          {settingRow(
            <Beer size={18} />, 'Modo Tragos',
            drinkingMode ? '🍻 Activado' : 'Desactivado',
            () => onUpdateDrinking(!drinkingMode)
          )}
          {settingRow(
            <span style={{ fontSize: '1rem' }}>🎚️</span>, 'Nivel de Intensidad',
            intensity === 'suave' ? '😇 Suave' : intensity === 'intermedio' ? '😏 Medio' : '🔥 Picante',
            null
          )}
          <div style={{ display: 'flex', gap: '0.5rem', paddingLeft: '3.5rem' }}>
            {['suave', 'intermedio', 'picante'].map(level => (
              <button key={level} onClick={() => onUpdateIntensity(level)} style={{
                flex: 1, padding: '6px 0', background: intensity === level ? 'rgba(255,0,255,0.2)' : 'transparent',
                border: `1px solid ${intensity === level ? '#ff00ff' : 'rgba(255,255,255,0.1)'}`,
                color: intensity === level ? '#fff' : '#666', borderRadius: '10px', fontSize: '0.75rem',
                cursor: 'pointer', fontFamily: 'Outfit, sans-serif', transition: 'all 0.2s'
              }}>
                {level === 'suave' ? '😇' : level === 'intermedio' ? '😏' : '🔥'}
              </button>
            ))}
          </div>
          {settingRow(
            <Users size={18} />, 'Jugadores',
            jugadores.length > 0 ? `${jugadores.length} registrados` : 'Ninguno',
            onShowJugadores
          )}
        </div>
      </div>

      {/* Premium */}
      <div>
        <p style={{ color: '#777', fontSize: '0.8rem', letterSpacing: '2px', marginBottom: '0.75rem' }}>CONTENIDO</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            padding: '1rem 1.25rem', background: 'linear-gradient(135deg, rgba(255,0,255,0.15), rgba(100,0,150,0.15))',
            border: '1px solid rgba(255,0,255,0.3)', borderRadius: '15px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <Star size={18} color="#ffd700" />
              <div>
                <p style={{ color: '#fff', fontWeight: '600' }}>XXXO Premium</p>
                <p style={{ color: '#a0a0a0', fontSize: '0.8rem' }}>200+ retos exclusivos, packs temáticos</p>
              </div>
            </div>
            <span style={{ color: '#ffd700', fontWeight: '700', fontSize: '0.9rem' }}>Próx.</span>
          </div>
        </div>
      </div>

      {/* App info */}
      <div>
        <p style={{ color: '#777', fontSize: '0.8rem', letterSpacing: '2px', marginBottom: '0.75rem' }}>INFORMACIÓN</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
          {deferredPrompt && (
            <button onClick={onInstall} style={{
              width: '100%', padding: '1rem', background: 'rgba(255,0,255,0.1)', border: '1px solid #ff00ff',
              borderRadius: '15px', color: '#ff00ff', fontSize: '1rem', fontWeight: '700', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontFamily: 'Outfit, sans-serif'
            }}>
              <Plus size={18} /> Instalar XXXO en Pantalla de Inicio
            </button>
          )}
          {settingRow(<Info size={18} />, 'Versión de XXXO', 'v0.1.0 Beta', null, '#a0a0a0')}
          {settingRow(<span>🔞</span>, 'Solo para mayores de edad', '+18', null, '#a0a0a0')}
        </div>
      </div>

      {/* Reset */}
      <div>
        <p style={{ color: '#777', fontSize: '0.8rem', letterSpacing: '2px', marginBottom: '0.75rem' }}>ZONA PELIGROSA</p>
        {!showResetConfirm ? (
          <button onClick={() => setShowResetConfirm(true)} style={{
            width: '100%', padding: '1rem', background: 'transparent', border: '1px solid rgba(255,80,80,0.4)',
            borderRadius: '15px', color: '#ff5050', fontSize: '1rem', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontFamily: 'Outfit, sans-serif'
          }}>
            <RotateCcw size={18} /> Reiniciar toda la configuración
          </button>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', padding: '1rem', background: 'rgba(255,80,80,0.1)', borderRadius: '15px', border: '1px solid rgba(255,80,80,0.3)' }}>
            <p style={{ color: '#ff5050', textAlign: 'center', fontSize: '0.9rem' }}>¿Seguro? Esto borra jugadores y configuración.</p>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button onClick={() => setShowResetConfirm(false)} style={{ flex: 1, padding: '0.75rem', background: 'transparent', border: '1px solid #555', borderRadius: '12px', color: '#aaa', cursor: 'pointer', fontFamily: 'Outfit, sans-serif' }}>No</button>
              <button onClick={() => { onReset(); setShowResetConfirm(false); }} style={{ flex: 1, padding: '0.75rem', background: 'rgba(255,80,80,0.2)', border: '1px solid #ff5050', borderRadius: '12px', color: '#ff5050', cursor: 'pointer', fontFamily: 'Outfit, sans-serif', fontWeight: '700' }}>Sí, reiniciar</button>
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
    // If a game was waiting for players to be set up, launch it now
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
    // Games that need players: check before launching
    if (JUEGOS_CON_JUGADORES.includes(gameId) && jugadores.length < 2) {
      setPendingGame(gameId);
      setJugadoresRequired(true);
      setShowJugadores(true);
      return;
    }
    setActiveGame(gameId);
  };

  const games = [
    { id: 'ruleta', title: 'Ruleta Caliente', desc: 'Giros inesperados para encender la noche.', icon: <Sparkles size={28} strokeWidth={1.5} /> },
    { id: 'verdad-reto', title: 'Verdad o Reto', desc: 'Secretos íntimos y castigos atrevidos.', icon: <Flame size={28} strokeWidth={1.5} /> },
    { id: 'botella', title: 'La Botella', desc: 'Gira la botella. Lo que toca, toca.', icon: <span style={{ fontSize: '28px' }}>🍾</span> },
    { id: 'precopeo', title: 'Pre-Party', desc: 'Rompe el hielo. Si no cumples, fondo blanco.', icon: <Beer size={28} strokeWidth={1.5} /> },
    { id: 'yonunca', title: 'Yo Nunca Nunca', desc: 'Confesiones sin filtro y muchos tragos.', icon: <GlassWater size={28} strokeWidth={1.5} /> },
    { id: 'dados', title: 'Dados Traviesos', desc: 'Deja que la suerte decida tu próximo paso.', icon: <Dices size={28} strokeWidth={1.5} /> },
    { id: '5segundos', title: '5 Segundos', desc: 'Responde rápido o asume el castigo.', icon: <Clock size={28} strokeWidth={1.5} /> },
    { id: 'mix-azar', title: 'Modo Caos', desc: 'Una mezcla salvaje de todos los juegos.', icon: <Shuffle size={28} strokeWidth={1.5} /> },
    { id: 'personalizado', title: 'Reglas Propias', desc: 'Añade tus castigos y tragos a medida.', icon: <PenTool size={28} strokeWidth={1.5} /> },
  ];

  const gameProps = { onBack: () => setActiveGame(null), isDrinkingMode: drinkingMode, intensity, jugadores };

  if (activeGame === 'verdad-reto') return <TrueOrDare {...gameProps} />;
  if (activeGame === 'ruleta') return <Ruleta {...gameProps} />;
  if (activeGame === 'dados') return <Dados {...gameProps} />;
  if (activeGame === 'yonunca') return <YoNunca {...gameProps} />;
  if (activeGame === '5segundos') return <CincoSegundos {...gameProps} />;
  if (activeGame === 'mix-azar') return <ModoCaos {...gameProps} />;
  if (activeGame === 'precopeo') return <PreParty {...gameProps} />;
  if (activeGame === 'personalizado') return <ReglasPropias {...gameProps} />;
  if (activeGame === 'botella') return <Botella {...gameProps} />;

  return (
    <div className="app-container">
      {showJugadores && (
        <JugadoresModal
          jugadores={jugadores}
          onClose={() => { setShowJugadores(false); setJugadoresRequired(false); setPendingGame(null); }}
          onSave={updateJugadores}
          requiredByGame={jugadoresRequired}
        />
      )}

      <header className="header" style={{ paddingBottom: '0.5rem' }}>
        <div className="logo-container">
          <div className="logo-icon"><InfinityIcon size={56} strokeWidth={1.5} /></div>
          <h1 className="logo-text">XXXO</h1>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', marginTop: '1rem', flexWrap: 'wrap' }}>
          <div onClick={() => updateDrinking(!drinkingMode)} style={{
            display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem',
            background: drinkingMode ? 'rgba(255,0,255,0.2)' : 'rgba(30,30,30,0.5)',
            border: `1px solid ${drinkingMode ? 'rgba(255,0,255,0.5)' : 'rgba(255,255,255,0.1)'}`,
            borderRadius: '20px', cursor: 'pointer', transition: 'all 0.3s ease'
          }}>
            <Beer size={16} color={drinkingMode ? '#ff00ff' : '#777'} />
            <span style={{ fontSize: '0.8rem', fontWeight: 500, color: drinkingMode ? '#fff' : '#777' }}>
              {drinkingMode ? 'Tragos 🍻' : 'Sin Tragos'}
            </span>
          </div>

          <div onClick={() => { setJugadoresRequired(false); setShowJugadores(true); }} style={{
            display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem',
            background: jugadores.length > 0 ? 'rgba(255,0,255,0.15)' : 'rgba(30,30,30,0.5)',
            border: `1px solid ${jugadores.length > 0 ? 'rgba(255,0,255,0.4)' : 'rgba(255,255,255,0.1)'}`,
            borderRadius: '20px', cursor: 'pointer', transition: 'all 0.3s ease'
          }}>
            <Users size={16} color={jugadores.length > 0 ? '#ff00ff' : '#777'} />
            <span style={{ fontSize: '0.8rem', fontWeight: 500, color: jugadores.length > 0 ? '#fff' : '#777' }}>
              {jugadores.length > 0 ? `${jugadores.length} jugadores` : 'Jugadores'}
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.6rem', marginTop: '1rem', marginBottom: '0.5rem' }}>
          {['suave', 'intermedio', 'picante'].map((level) => (
            <button key={level} onClick={() => updateIntensity(level)} style={{
              background: intensity === level ? 'rgba(255,0,255,0.2)' : 'transparent',
              border: `1px solid ${intensity === level ? '#ff00ff' : 'rgba(255,255,255,0.1)'}`,
              color: intensity === level ? '#ffffff' : '#a0a0a0',
              padding: '7px 14px', borderRadius: '20px', fontSize: '0.82rem',
              fontWeight: intensity === level ? '600' : '400',
              textShadow: intensity === level ? '0 0 5px rgba(255,0,255,0.5)' : 'none',
              cursor: 'pointer', transition: 'all 0.3s ease', fontFamily: 'Outfit, sans-serif'
            }}>
              {level === 'suave' ? '😇 Suave' : level === 'intermedio' ? '😏 Medio' : '🔥 Picante'}
            </button>
          ))}
        </div>
      </header>

      {activeTab === 'inicio' && (
        <main className="games-list">
          <p style={{ color: '#ff00ff', fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem' }}>🔥 Modos Más Calientes</p>
          {games.slice(0, 3).map((game) => (
            <div key={game.id} className="game-card" onClick={() => handleGameClick(game.id)}>
              <div className="card-icon-wrapper">{game.icon}</div>
              <div className="card-content">
                <h2 className="card-title">{game.title}</h2>
                <p className="card-desc">
                  {drinkingMode && game.id === 'verdad-reto' ? 'Secretos íntimos. Si no respondes, bebes.' : game.desc}
                </p>
              </div>
              <div className="card-arrow"><ChevronRight size={24} /></div>
            </div>
          ))}
          <button onClick={() => setActiveTab('catalogo')} style={{
            width: '100%', padding: '1rem', marginTop: '0.5rem', background: 'transparent',
            border: '1px solid rgba(255,0,255,0.3)', borderRadius: '15px', color: '#ff00ff',
            fontSize: '1rem', fontWeight: '600', cursor: 'pointer', display: 'flex',
            alignItems: 'center', justifyContent: 'center', gap: '8px',
            fontFamily: 'Outfit, sans-serif', transition: 'all 0.3s'
          }}>
            <LayoutGrid size={20} /> Ver todo el Catálogo
          </button>
        </main>
      )}

      {activeTab === 'catalogo' && (
        <main style={{ paddingBottom: '5rem' }}>
          <p style={{ color: '#ff00ff', fontSize: '1.1rem', fontWeight: 600, marginBottom: '1rem', textAlign: 'center' }}>Catálogo Completo</p>
          <div className="games-grid">
            {games.map((game) => (
              <div key={game.id} className="game-card-small" onClick={() => handleGameClick(game.id)}>
                <div className="card-icon-wrapper">{game.icon}</div>
                <h2 className="card-title">{game.title}</h2>
              </div>
            ))}
          </div>
        </main>
      )}

      {activeTab === 'ajustes' && (
        <AjustesScreen
          drinkingMode={drinkingMode}
          intensity={intensity}
          jugadores={jugadores}
          onUpdateDrinking={updateDrinking}
          onUpdateIntensity={updateIntensity}
          onShowJugadores={() => { setJugadoresRequired(false); setShowJugadores(true); }}
          onReset={resetAll}
          deferredPrompt={deferredPrompt}
          onInstall={handleInstallClick}
        />
      )}

      <nav className="bottom-nav">
        <div className={`nav-item ${activeTab === 'inicio' ? 'active' : ''}`} onClick={() => setActiveTab('inicio')}>
          <Home size={22} strokeWidth={1.5} /><span>Inicio</span>
        </div>
        <div className={`nav-item ${activeTab === 'catalogo' ? 'active' : ''}`} onClick={() => setActiveTab('catalogo')}>
          <LayoutGrid size={22} strokeWidth={1.5} /><span>Catálogo</span>
        </div>
        <div className={`nav-item`} onClick={() => { setJugadoresRequired(false); setShowJugadores(true); }}>
          <Users size={22} strokeWidth={1.5} />
          <span>{jugadores.length > 0 ? `(${jugadores.length})` : 'Jugadores'}</span>
        </div>
        <div className={`nav-item ${activeTab === 'ajustes' ? 'active' : ''}`} onClick={() => setActiveTab('ajustes')}>
          <Settings size={22} strokeWidth={1.5} /><span>Ajustes</span>
        </div>
      </nav>
    </div>
  );
}

export default App;
