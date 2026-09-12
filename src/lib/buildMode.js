// Build "seguro" (para empaquetar y subir a tiendas de apps): sin Tríos,
// sin Swinger, y en Verdad o Reto solo los niveles suaves.
// Se activa con VITE_SAFE_BUILD=true (ver scripts/build-safe.mjs → npm run build:safe).
export const SAFE_BUILD = import.meta.env.VITE_SAFE_BUILD === 'true';

// Build de la Revista sola, como sitio independiente (su propio subdominio,
// sin el resto de las apps). Se activa con VITE_REVISTA_BUILD=true
// (ver scripts/build-revista.mjs → npm run build:revista).
export const REVISTA_BUILD = import.meta.env.VITE_REVISTA_BUILD === 'true';

// A dónde apuntan los enlaces "jugar" de la Revista cuando vive en su propio
// dominio (no puede usar rutas relativas como /glup porque ahí no existen).
export const GAMES_ORIGIN = 'https://glupi.netlify.app';
