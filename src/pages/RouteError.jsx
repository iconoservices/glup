import React, { useEffect } from 'react';
import { useRouteError } from 'react-router-dom';

// Señales de que el error viene de un cambio de versión / deploy:
// el navegador tiene una versión vieja de la app y pide archivos que ya no existen.
const STALE_HINTS = [
  'is not valid JSON',
  'Unexpected token',
  'Failed to fetch dynamically imported module',
  'error loading dynamically imported module',
  'Importing a module script failed',
];

export default function RouteError() {
  const error = useRouteError();
  const msg = String((error && (error.message || error)) || '');
  const looksStale = STALE_HINTS.some((h) => msg.includes(h));

  useEffect(() => {
    if (!looksStale || typeof window === 'undefined') return;
    const KEY = 'glup:reload-recover';
    let last = 0;
    try { last = Number(sessionStorage.getItem(KEY) || 0); } catch { /* private mode */ }
    // Un solo reload automático; si vuelve a fallar en 20s, mostramos el botón.
    if (Date.now() - last > 20000) {
      try { sessionStorage.setItem(KEY, String(Date.now())); } catch { /* ignore */ }
      window.location.reload();
    }
  }, [looksStale]);

  return (
    <div className="route-error">
      <h1>{looksStale ? 'Se actualizó la app' : 'Algo salió mal'}</h1>
      <p>
        {looksStale
          ? 'Salió una versión nueva mientras jugabas. Recarga y sigues donde estabas.'
          : 'Recarga la página para volver a intentarlo.'}
      </p>
      <button type="button" onClick={() => window.location.reload()}>Recargar</button>
    </div>
  );
}
