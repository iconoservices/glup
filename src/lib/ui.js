export const HEAT_META = {
  suave: { emoji: '😇', label: 'Suave' },
  intermedio: { emoji: '😏', label: 'Medio' },
  picante: { emoji: '🔥', label: 'Picante' },
};

// Emoji de portada por juego
const GLYPHS = {
  yonunca: '🍸', botella: '🍾', precopeo: '🍺', ruleta: '🎯', dados: '🎲',
  'verdad-reto': '🔥', '5segundos': '⏰', personalizado: '✍️', 'mix-azar': '🌀',
  'piramide-para-beber': '🎴', 'quien-es-mas-probable-que': '🤔',
};
export const glyphFor = (g) => GLYPHS[g.gameId] || GLYPHS[g.slug] || '🎲';

// Estrellas a partir de una nota ("4.8" / "—")
export const stars = (r) => {
  if (!r || r === '—') return '☆☆☆☆☆';
  const n = Math.round(parseFloat(r));
  return '★★★★★'.slice(0, n) + '☆☆☆☆☆'.slice(0, 5 - n);
};

export const SITE_URL = 'https://glupi.netlify.app';
