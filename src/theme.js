// Glup! — acentos sólidos.
//   blue   → color dominante / marca
//   yellow → Fiesta / previa
//   pink   → Parejas / picante
//   violet → Grupos / caos
export const ACCENTS = {
  blue: '#1fa8ff',
  yellow: '#ffce3a',
  pink: '#ff2e88',
  violet: '#b06bff',
  // alias antiguos
  magenta: '#ff2e88',
  amber: '#ffce3a',
  cyan: '#1fa8ff',
  lime: '#ffce3a',
  red: '#ff2e88',
};

// Estilo con la variable CSS --accent resuelta.
export const accentStyle = (name) => ({ '--accent': ACCENTS[name] || name || ACCENTS.blue });
