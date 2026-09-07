// Fiestas Swinger — contenido para eventos de varias parejas.
// {n} = una persona · {o} = otra · {no} = otras dos

export const MODOS = [
  {
    id: 'hielo',
    label: 'Rompehielos',
    emoji: '🥂',
    desc: 'Para cuando las parejas recién se conocen',
    ruta: '/fiestas-swinger/jugar?modo=hielo',
  },
  {
    id: 'vr',
    label: 'Verdad o Reto entre parejas',
    emoji: '🔥',
    desc: 'Confesiones y retos que cruzan a las parejas',
    ruta: '/fiestas-swinger/jugar?modo=vr',
  },
  {
    id: 'ruleta',
    label: 'La Ruleta de Parejas',
    emoji: '🎯',
    desc: 'Empareja a dos personas al azar y les da un reto',
    ruta: '/fiestas-swinger/ruleta',
  },
];

// Niveles reales de contenido (para la vista /contenido)
export const NIVELES = [
  { id: 'picante', label: 'Picante', emoji: '🔥', desc: 'Coqueto, sube de a poco' },
  { id: 'extremo', label: 'Extremo', emoji: '🔞', desc: 'Solo si todos se animan' },
];

// Opciones del selector en la home (incluye los modos combinados)
export const SELECTOR = [
  { id: 'picante', label: 'Picante', emoji: '🔥' },
  { id: 'extremo', label: 'Extremo', emoji: '🔞' },
  { id: 'mezcla', label: 'Al azar', emoji: '🎲' },
  { id: 'progresivo', label: 'Ascendente', emoji: '📈' },
];

// Se muestran una vez, al empezar (no en cada reto)
export const REGLAS = [
  'Cualquiera dice “paso” y se respeta, sin explicaciones.',
  'Acuerden una palabra que frena todo al instante.',
  'Ningún reto que cruce a dos personas se hace sin el sí de sus parejas.',
  'Tu pareja tiene prioridad sobre el juego.',
];

export const ROMPEHIELOS = [
  '{n}, presentá a tu pareja al grupo diciendo algo que casi nadie sabe de ella.',
  '{n}, decile a {o} qué fue lo primero que notaste al llegar.',
  '{n}, contá cómo se conocieron vos y tu pareja, versión corta.',
  '{n}, elegí a otra pareja del grupo y decí qué te gusta de cómo se tratan.',
  '{n} y {o}, descubran tres cosas que tienen en común en un minuto.',
  '{n}, hacele una pregunta a {o} que nunca le harías en un ascensor.',
  '{n}, decí qué te trajo a una fiesta como esta por primera vez.',
  '{n}, elegí una canción para el grupo y contá con quién la bailarías.',
  '{n}, brindá con {o} y decí un deseo para la noche (dentro de lo razonable).',
  '{n}, contá cuál es tu regla número uno para una noche así.',
  '{n}, decile un cumplido sincero a la pareja de {o}.',
  '{n} y {o}, elijan una palabra que van a usar esta noche si algo no va.',
  '{n}, contá la señal que usás con tu pareja para decir "sí" y para decir "mejor no".',
  '{n}, decí qué te pone más nervioso y más curioso de estar acá.',
];

export const PROMPTS = {
  picante: {
    verdad: [
      '{n}, ¿qué te atrajo de venir a una fiesta de parejas?',
      '{n}, ¿coqueteás más con la mirada o con las palabras?',
      '{n}, ¿a qué persona del grupo, además de tu pareja, mirarías dos veces?',
      '{n}, ¿a qué pareja del grupo le pedirías un consejo de relación?',
      '{n}, ¿preferís conocer a la otra pareja hablando o bailando?',
      '{n}, ¿cuál es tu límite de esta noche que nadie debería cruzar?',
      '{n}, ¿qué te da más celos y cómo lo manejás?',
      '{n}, ¿qué señal usan vos y tu pareja para frenar?',
      '{n}, ¿qué pregunta te gustaría que te hiciera {o}?',
      '{n}, ¿preferís mirar o que te miren?',
    ],
    reto: [
      '{n}, ofrecele una copa a {o} y brinden mirándose a los ojos.',
      '{n}, sacá a bailar a {o} una canción.',
      '{n}, dale un abrazo largo a la pareja de {o}.',
      '{n}, hacele a {o} un cumplido sobre algo que no sea físico.',
      '{n}, contale a {o} tu plan ideal para el resto de la noche.',
      '{n}, dale un beso de 5 segundos a {o}.',
      '{n}, quitate una prenda o dejá que tu pareja elija cuál.',
      '{n}, hacele un masaje de hombros a {o} mientras tu pareja te lo hace a vos.',
      '{n}, bailá pegado con {o} 20 segundos.',
      '{n} y {o}, mírense fijo 20 segundos sin reírse mientras sus parejas cuentan.',
      '{n}, elegí a una pareja para el próximo reto y explicá por qué.',
    ],
  },
  extremo: {
    verdad: [
      '{n}, ¿fantaseaste alguna vez con una noche de intercambio? contá poco o mucho.',
      '{n}, ¿qué te gustaría que tu pareja te viera hacer esta noche?',
      '{n}, ¿qué es lo más lejos que llegarías hoy con acuerdo de tu pareja?',
      '{n}, ¿qué te frena más: la vergüenza o los celos?',
      '{n}, ¿qué te gustaría que {o} le haga a su pareja delante tuyo?',
      '{n}, ¿en el medio o mirando?',
      '{n}, confesá la fantasía más fuerte que se te cruzó esta noche.',
    ],
    reto: [
      '{n}, susurrale algo atrevido al oído a {o}; tu pareja decide si lo repetís en voz alta.',
      '{n}, dejá que {o} te pase un cubo de hielo por el brazo o el cuello.',
      '{n}, sentate en las piernas de {o} un turno mientras las parejas miran.',
      '{n}, una palmada juguetona a {o} mientras tu pareja mira.',
      '{n}, apoyá la mano en la cintura de {o} durante una canción.',
      '{n}, dale un beso en el cuello a {o} durante 10 segundos.',
      '{n}, dejá que {o} elija qué prenda te quitás.',
      '{n}, contale al oído a {o} qué te gustaría de la noche; {o} decide si lo dice fuerte.',
      '{n}, elegí a una persona de otra pareja para un baile pegado de 30 segundos.',
      '{n} y {o}, con {no} mirando, decidan juntos el próximo reto de las dos parejas.',
      '{n}, con los ojos vendados, adiviná quién te da un beso en la mano.',
    ],
  },
};

export const RULETA_RETOS = [
  'un brindis mirándose a los ojos',
  'un baile pegado de 20 segundos',
  'un beso de 5 segundos',
  'contarse una fantasía sin dar nombres',
  'un masaje de hombros de 30 segundos',
  'susurrarse al oído qué les gustaría de la noche',
  'mirarse fijo 20 segundos sin reírse',
  'que cada uno se quite una prenda',
  'presentarse de nuevo, ahora diciendo algo atrevido',
  'elegir juntos la próxima canción y con quién bailarla',
  'una palmada juguetona',
  'un beso en el cuello de 10 segundos',
  'sentarse en las piernas del otro un turno mientras las parejas miran',
];

const rand = (arr) => arr[Math.floor(Math.random() * arr.length)];

function dos(jugadores) {
  const pool = jugadores.length >= 2 ? [...jugadores] : ['alguien', 'otra persona'];
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return [pool[0], pool[1], pool[2] || 'las otras parejas'];
}

export function buildIcebreaker(jugadores) {
  const [n, o] = dos(jugadores);
  return rand(ROMPEHIELOS).replaceAll('{n}', n).replaceAll('{o}', o);
}

// nivelId: 'picante' | 'extremo' | 'mezcla' | 'progresivo'
function poolFor(nivelId, tipo, turno) {
  const p = PROMPTS.picante[tipo] || [];
  const e = PROMPTS.extremo[tipo] || [];
  if (nivelId === 'mezcla') return [...p, ...e];
  if (nivelId === 'progresivo') return turno < 3 ? [...p] : [...p, ...e];
  return PROMPTS[nivelId]?.[tipo] || p;
}

export function buildPrompt(nivelId, tipo, jugadores, turno = 0) {
  const [n, o, p] = dos(jugadores);
  return rand(poolFor(nivelId, tipo, turno))
    .replaceAll('{no}', p)
    .replaceAll('{n}', n)
    .replaceAll('{o}', o);
}

export const contentStats = () =>
  NIVELES.map((nv) => ({
    ...nv,
    verdad: PROMPTS[nv.id]?.verdad?.length || 0,
    reto: PROMPTS[nv.id]?.reto?.length || 0,
  }));

export const totalPrompts = () =>
  ROMPEHIELOS.length +
  contentStats().reduce((s, n) => s + n.verdad + n.reto, 0) +
  RULETA_RETOS.length;
