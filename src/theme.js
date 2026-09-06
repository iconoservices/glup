// Glup! — 3 acentos sólidos.
//   pink   → Parejas / picante (color protagonista de la marca)
//   yellow → Fiesta / previa
//   violet → Grupos / caos
export const ACCENTS = {
  pink: '#ff2e88',
  yellow: '#ffce3a',
  violet: '#b06bff',
  // alias antiguos (para no romper llamadas existentes)
  magenta: '#ff2e88',
  amber: '#ffce3a',
  cyan: '#b06bff',
  lime: '#ffce3a',
  red: '#ff2e88',
};

// Estilo con la variable CSS --accent resuelta.
export const accentStyle = (name) => ({ '--accent': ACCENTS[name] || name || ACCENTS.pink });
