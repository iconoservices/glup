import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Beer, Users, RotateCcw, Info, Star, LayoutGrid } from 'lucide-react';
import Seo from '../components/Seo';
import InstallButton from '../components/InstallButton';
import { accentStyle } from '../theme';
import { HEAT_META } from '../lib/ui';
import { useSettings } from '../context/useSettings';

function SettingRow({ icon, label, value, onClick }) {
  return (
    <div className={`set-row${onClick ? ' set-row--tap' : ''}`} onClick={onClick}>
      <div className="set-row__main">{icon}<span>{label}</span></div>
      <span className="set-row__value">{value}</span>
    </div>
  );
}

export default function Ajustes() {
  const {
    drinkingMode, intensity, jugadores,
    updateDrinking, updateIntensity, openJugadores, resetAll,
  } = useSettings();

  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const navigate = useNavigate();

  return (
    <main className="settings">
      <Seo title="Ajustes | Glup!" description="Configura tu sesión de juego en Glup!: modo tragos, nivel de intensidad y jugadores." path="/glup/ajustes" />
      <p className="section-label" style={accentStyle('blue')}>⚙️ Ajustes</p>

      <div>
        <p className="set-group__label">SESIÓN DE JUEGO</p>
        <SettingRow
          icon={<Beer size={18} />}
          label="Modo Tragos"
          value={drinkingMode ? '🍻 Activado' : 'Desactivado'}
          onClick={() => updateDrinking(!drinkingMode)}
        />
        <SettingRow
          icon={<span style={{ fontSize: '1.05rem' }}>🎚️</span>}
          label="Nivel de Intensidad"
          value={`${HEAT_META[intensity].emoji} ${HEAT_META[intensity].label}`}
        />
        <div className="heat-bar" style={{ marginTop: '0.5rem' }}>
          {Object.keys(HEAT_META).map((level) => (
            <button key={level} className={`heat-bar__seg${intensity === level ? ' is-on' : ''}`} onClick={() => updateIntensity(level)}>
              {HEAT_META[level].emoji} {HEAT_META[level].label}
            </button>
          ))}
        </div>
        <SettingRow
          icon={<Users size={18} />}
          label="Jugadores"
          value={jugadores.length > 0 ? `${jugadores.length} registrados` : 'Ninguno'}
          onClick={() => openJugadores()}
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
        <p className="set-group__label">MÁS</p>
        <SettingRow
          icon={<LayoutGrid size={18} />}
          label="Todas las apps de Glup"
          value="Ver →"
          onClick={() => navigate('/')}
        />
      </div>

      <div>
        <p className="set-group__label">APP</p>
        <InstallButton />
        <SettingRow icon={<Info size={18} />} label="Versión de Glup!" value="v0.3.0 Beta" />
        <SettingRow icon={<span>🔞</span>} label="Solo para mayores de edad" value="+18" />
      </div>

      <div>
        <p className="set-group__label">ZONA PELIGROSA</p>
        {!showResetConfirm ? (
          <button className="btn btn--outline btn--block" style={accentStyle('#ff5a5f')} onClick={() => setShowResetConfirm(true)}>
            <RotateCcw size={18} /> Reiniciar toda la configuración
          </button>
        ) : (
          <div className="set-row set-row--danger" style={{ flexDirection: 'column', gap: '0.75rem', alignItems: 'stretch' }}>
            <p style={{ color: '#ff5a5f', textAlign: 'center', fontSize: '0.9rem' }}>¿Seguro? Esto borra jugadores y configuración.</p>
            <div style={{ display: 'flex', gap: '0.6rem' }}>
              <button className="btn btn--ghost btn--block" style={{ border: '2px solid var(--line-2)' }} onClick={() => setShowResetConfirm(false)}>No</button>
              <button className="btn btn--solid btn--block" style={accentStyle('#ff5a5f')} onClick={() => { resetAll(); setShowResetConfirm(false); }}>Sí, reiniciar</button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
