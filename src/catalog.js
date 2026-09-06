// ─────────────────────────────────────────────────────────────
//  Glup! — catálogo de juegos + metadata SEO
//  Un mismo motor de juego puede vivir en varias categorías;
//  el contenido/textos cambian según la categoría (ver apps/*).
// ─────────────────────────────────────────────────────────────

export const CATEGORIES = [
  { id: 'fiesta', label: 'Fiesta', emoji: '🍻', accent: 'amber', tagline: 'Para la previa y las fiestas' },
  { id: 'parejas', label: 'Parejas', emoji: '🔥', accent: 'magenta', tagline: 'Para salir de la rutina en pareja' },
  { id: 'grupos', label: 'Grupos', emoji: '😈', accent: 'violet', tagline: 'Para grupos con mucha confianza' },
];

// gameId = el id que App.jsx usa para lanzar la pantalla del juego.
// slug   = ruta SEO futura (glup.boga.app/<slug>)
export const GAMES = [
  {
    gameId: 'yonunca',
    slug: 'yo-nunca-nunca-online',
    title: 'Yo Nunca Nunca',
    categories: ['fiesta', 'grupos'],
    accent: 'cyan',
    seo: 'Juega a Yo Nunca Nunca online con tus amigos: frases que obligan a tomar y confesiones sin filtro.',
    keywords: ['yo nunca nunca', 'yo nunca online', 'juego para tomar'],
  },
  {
    gameId: 'botella',
    slug: 'botella-borracha-online',
    title: 'Botella Borracha',
    categories: ['fiesta', 'grupos'],
    accent: 'magenta',
    seo: 'Gira la botella borracha online y deja que decida quién cumple el castigo o quién toma el shot.',
    keywords: ['botella borracha', 'girar la botella online', 'juego de la botella'],
    needsPlayers: true,
  },
  {
    gameId: 'precopeo',
    slug: 'juegos-para-la-previa',
    title: 'Pre-Party',
    categories: ['fiesta'],
    accent: 'amber',
    seo: 'Retos de calentamiento para la previa: rompe el hielo y arranca la fiesta con tragos.',
    keywords: ['juegos para la previa', 'juegos de precopeo', 'previa con amigos'],
  },
  {
    gameId: 'ruleta',
    slug: 'ruleta-de-castigos',
    title: 'Ruleta de Castigos',
    categories: ['fiesta', 'grupos'],
    accent: 'violet',
    seo: 'Ruleta de castigos y shots online: gira y descubre a quién le toca y qué tiene que hacer.',
    keywords: ['ruleta de castigos', 'ruleta de shots', 'ruleta para beber'],
  },
  {
    gameId: 'dados',
    slug: 'dados-eroticos',
    title: 'Dados Eróticos',
    categories: ['parejas'],
    accent: 'lime',
    seo: 'Dados eróticos online para parejas: combina una acción y una parte del cuerpo y déjate llevar.',
    keywords: ['dados eroticos', 'dados sexuales', 'juego para parejas hot'],
  },
  {
    gameId: 'verdad-reto',
    slug: 'verdad-o-reto-para-parejas',
    title: 'Verdad o Reto',
    categories: ['parejas', 'grupos'],
    accent: 'magenta',
    seo: 'Verdad o Reto picante para parejas y grupos: secretos íntimos y retos que suben de tono.',
    keywords: ['verdad o reto para parejas', 'verdad o reto hot', 'verdad o reto extremo'],
  },
  {
    gameId: '5segundos',
    slug: 'preguntas-picantes-en-pareja',
    title: '5 Segundos Picante',
    categories: ['parejas'],
    accent: 'red',
    seo: 'Preguntas picantes contrarreloj: responde en 5 segundos o asume el castigo.',
    keywords: ['preguntas picantes', 'preguntas para parejas', 'juego de preguntas rapidas'],
  },
  {
    gameId: 'personalizado',
    slug: 'retos-personalizados',
    title: 'Reglas Propias',
    categories: ['parejas', 'grupos', 'fiesta'],
    accent: 'magenta',
    seo: 'Crea tus propios retos y castigos a medida y lánzalos al azar durante la partida.',
    keywords: ['retos personalizados', 'crear retos', 'reglas propias'],
  },
  {
    gameId: 'mix-azar',
    slug: 'modo-caos',
    title: 'Modo Caos',
    categories: ['grupos', 'fiesta'],
    accent: 'violet',
    seo: 'Modo Caos: una mezcla salvaje de verdad o reto, dados y castigos. Nunca sabes qué te toca.',
    keywords: ['modo caos', 'mezcla de juegos', 'juego para grupos'],
  },
  // ── Próximamente ──
  {
    gameId: null,
    slug: 'piramide-para-beber',
    title: 'La Pirámide',
    categories: ['fiesta'],
    accent: 'amber',
    seo: 'La Pirámide: juego de cartas virtual para beber. Reparte, apila y a ver quién aguanta.',
    keywords: ['piramide para beber', 'juego de cartas para tomar'],
    soon: true,
  },
  {
    gameId: null,
    slug: 'quien-es-mas-probable-que',
    title: '¿Quién es más probable que...?',
    categories: ['grupos', 'fiesta'],
    accent: 'violet',
    seo: '¿Quién es más probable que...? Señala al que mejor encaja con la frase. Puro caos grupal.',
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
