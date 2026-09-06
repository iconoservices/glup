// Acentos de color por juego (bold / juguetón).
// Cada pantalla setea --accent con uno de estos valores.
export const ACCENTS = {
  magenta: '#ff2e9a',
  violet: '#b14dff',
  cyan: '#22d3ee',
  lime: '#9ae600',
  amber: '#ff9f1c',
  red: '#ff3b5c',
};

// Devuelve el objeto de estilo con la variable CSS --accent resuelta.
export const accentStyle = (name) => ({ '--accent': ACCENTS[name] || name || ACCENTS.magenta });
