import React, { useState, useEffect, useCallback } from 'react';
import { loadSetting, saveSetting } from '../lib/storage';
import JugadoresModal from '../components/JugadoresModal';
import { SettingsContext } from './settingsContextObject';

const DEFAULTS = { drinkingMode: false, intensity: 'intermedio', jugadores: [] };

export function SettingsProvider({ children }) {
  // Arranca con los valores por defecto (igual que el HTML pre-generado)
  // y se rehidrata desde localStorage tras montar.
  const [state, setState] = useState(DEFAULTS);
  const [modal, setModal] = useState(null); // null | { required?: bool, onDone?: fn }

  useEffect(() => {
    const next = {
      drinkingMode: loadSetting('drinkingMode', DEFAULTS.drinkingMode),
      intensity: loadSetting('intensity', DEFAULTS.intensity),
      jugadores: loadSetting('jugadores', DEFAULTS.jugadores),
    };
    // Sincroniza con localStorage tras montar (patrón necesario con HTML pre-generado).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setState(next);
  }, []);

  const updateDrinking = useCallback((v) => {
    setState((s) => ({ ...s, drinkingMode: v }));
    saveSetting('drinkingMode', v);
  }, []);

  const updateIntensity = useCallback((v) => {
    setState((s) => ({ ...s, intensity: v }));
    saveSetting('intensity', v);
  }, []);

  const saveJugadores = useCallback((list) => {
    setState((s) => ({ ...s, jugadores: list }));
    saveSetting('jugadores', list);
  }, []);

  const openJugadores = useCallback((opts) => setModal(opts || {}), []);
  const closeJugadores = useCallback(() => setModal(null), []);

  const resetAll = useCallback(() => {
    setState(DEFAULTS);
    try { localStorage.clear(); } catch { /* noop */ }
  }, []);

  const value = {
    ...state,
    updateDrinking, updateIntensity, saveJugadores,
    openJugadores, closeJugadores, resetAll,
  };

  return (
    <SettingsContext.Provider value={value}>
      {children}
      {modal && (
        <JugadoresModal
          jugadores={state.jugadores}
          requiredByGame={!!modal.required}
          onClose={closeJugadores}
          onSave={(list) => {
            saveJugadores(list);
            const done = modal.onDone;
            setModal(null);
            if (done) done(list);
          }}
        />
      )}
    </SettingsContext.Provider>
  );
}
