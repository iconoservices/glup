// ─────────────────────────────────────────────────────────────
//  Glup! — catálogo de juegos + metadata SEO
//  Paleta: 3 acentos → pink (Parejas) · yellow (Fiesta) · violet (Grupos)
// ─────────────────────────────────────────────────────────────

export const CATEGORIES = [
  { id: 'fiesta', label: 'Fiesta', emoji: '🍻', accent: 'yellow', tagline: 'Para la previa y las fiestas' },
  { id: 'parejas', label: 'Parejas', emoji: '🔥', accent: 'pink', tagline: 'Para salir de la rutina en pareja' },
  { id: 'grupos', label: 'Grupos', emoji: '😈', accent: 'violet', tagline: 'Para grupos con mucha confianza' },
];

// gameId = id que App.jsx usa para lanzar la pantalla del juego (null = próximamente).
// slug   = ruta SEO futura (glup.boga.app/<slug>)
export const GAMES = [
  {
    gameId: 'yonunca',
    slug: 'yo-nunca-nunca-online',
    title: 'Yo Nunca Nunca',
    categories: ['fiesta', 'grupos'],
    accent: 'yellow',
    rating: '4.8',
    chip: 'Fiesta',
    seo: 'Frases que obligan a tomar y confesiones sin filtro con tus amigos.',
    keywords: ['yo nunca nunca', 'yo nunca online', 'juego para tomar'],
  },
  {
    gameId: 'botella',
    slug: 'botella-borracha-online',
    title: 'Botella Borracha',
    categories: ['fiesta', 'grupos'],
    accent: 'pink',
    rating: '4.9',
    chip: '3+ jug.',
    seo: 'Gira la botella y deja que decida quién cumple el castigo o toma el shot.',
    keywords: ['botella borracha', 'girar la botella online', 'juego de la botella'],
    needsPlayers: true,
  },
  {
    gameId: 'precopeo',
    slug: 'juegos-para-la-previa',
    title: 'Pre-Party',
    categories: ['fiesta'],
    accent: 'yellow',
    rating: '4.5',
    chip: 'Fiesta',
    seo: 'Retos de calentamiento para romper el hielo y arrancar la previa.',
    keywords: ['juegos para la previa', 'juegos de precopeo', 'previa con amigos'],
  },
  {
    gameId: 'ruleta',
    slug: 'ruleta-de-castigos',
    title: 'Ruleta de Castigos',
    categories: ['fiesta', 'grupos'],
    accent: 'violet',
    rating: '4.6',
    chip: 'Fiesta',
    seo: 'Gira la ruleta y descubre a quién le toca y qué tiene que hacer.',
    keywords: ['ruleta de castigos', 'ruleta de shots', 'ruleta para beber'],
  },
  {
    gameId: 'dados',
    slug: 'dados-eroticos',
    title: 'Dados Eróticos',
    categories: ['parejas'],
    accent: 'pink',
    rating: '4.9',
    chip: 'Parejas',
    seo: 'Combina una acción y una parte del cuerpo. Sube de tono a cada tirada.',
    keywords: ['dados eroticos', 'dados sexuales', 'juego para parejas hot'],
  },
  {
    gameId: 'verdad-reto',
    slug: 'verdad-o-reto-para-parejas',
    title: 'Verdad o Reto',
    categories: ['parejas', 'grupos'],
    accent: 'pink',
    rating: '4.7',
    chip: 'Picante',
    seo: 'Secretos íntimos y retos que suben de tono, para parejas y grupos.',
    keywords: ['verdad o reto para parejas', 'verdad o reto hot', 'verdad o reto extremo'],
  },
  {
    gameId: '5segundos',
    slug: 'preguntas-picantes-en-pareja',
    title: '5 Segundos Picante',
    categories: ['parejas'],
    accent: 'pink',
    rating: '4.4',
    chip: 'Parejas',
    seo: 'Responde la pregunta picante en 5 segundos o asume el castigo.',
    keywords: ['preguntas picantes', 'preguntas para parejas', 'juego de preguntas rapidas'],
  },
  {
    gameId: 'personalizado',
    slug: 'retos-personalizados',
    title: 'Reglas Propias',
    categories: ['parejas', 'grupos', 'fiesta'],
    accent: 'violet',
    rating: '4.3',
    chip: 'Custom',
    seo: 'Crea tus propios retos y castigos y lánzalos al azar en la partida.',
    keywords: ['retos personalizados', 'crear retos', 'reglas propias'],
  },
  {
    gameId: 'mix-azar',
    slug: 'modo-caos',
    title: 'Modo Caos',
    categories: ['grupos', 'fiesta'],
    accent: 'violet',
    rating: '4.6',
    chip: 'Grupos',
    beta: true,
    seo: 'Mezcla salvaje de verdad o reto, dados y castigos. Nunca sabes qué te toca.',
    keywords: ['modo caos', 'mezcla de juegos', 'juego para grupos'],
  },
  // ── Próximamente ──
  {
    gameId: null,
    slug: 'piramide-para-beber',
    title: 'La Pirámide',
    categories: ['fiesta'],
    accent: 'yellow',
    rating: '—',
    chip: 'Cartas',
    seo: 'Juego de cartas virtual para beber. Reparte, apila y a ver quién aguanta.',
    keywords: ['piramide para beber', 'juego de cartas para tomar'],
    soon: true,
  },
  {
    gameId: null,
    slug: 'quien-es-mas-probable-que',
    title: '¿Quién es más probable?',
    categories: ['grupos', 'fiesta'],
    accent: 'violet',
    rating: '—',
    chip: 'Grupos',
    seo: 'Señala al que mejor encaja con la frase. Puro caos grupal.',
    keywords: ['quien es mas probable que', 'juego para grupos de amigos'],
    soon: true,
  },
];

export const gamesByCategory = (catId) => GAMES.filter((g) => g.categories.includes(catId));

export const searchGames = (q) => {
  const t = q.trim().toLowerCase();
  if (!t) return GAMES;
  return GAMES.filter((g) =>
    g.title.toLowerCase().includes(t) ||
    g.seo.toLowerCase().includes(t) ||
    g.keywords.some((k) => k.includes(t))
  );
};
