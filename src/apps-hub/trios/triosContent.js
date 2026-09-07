// Juegos para Tríos +18 — contenido (español neutro).
// {n} = una persona · {o} = otra · {p} = el tercero · {no} = otras dos

export const MODOS = [
  { id: 'vr', label: 'Verdad o Reto', emoji: '😏', nivel: 4, desc: 'Confesiones y retos entre los tres', ruta: '/juegos-para-trios/jugar?modo=vr' },
  { id: 'reto', label: 'Solo Retos', emoji: '🔥', nivel: 5, desc: 'Sin verdades: puro reto picante', ruta: '/juegos-para-trios/jugar?modo=reto' },
  { id: 'botella', label: 'La Botella', emoji: '🍾', nivel: 3, desc: 'Gira y apunta a quién le toca', ruta: '/juegos-para-trios/botella' },
];

// Niveles reales de contenido (para la vista /contenido)
export const NIVELES = [
  { id: 'picante', label: 'Picante', emoji: '😏', nivel: 4, desc: 'Sube de tono con calma' },
  { id: 'extremo', label: 'Extremo', emoji: '🔞', nivel: 5, desc: 'Solo si los tres se animan' },
];

// Opciones del selector en la home (incluye los modos combinados)
export const SELECTOR = [
  { id: 'picante', label: 'Picante', emoji: '😏' },
  { id: 'extremo', label: 'Extremo', emoji: '🔞' },
  { id: 'mezcla', label: 'Al azar', emoji: '🎲' },
  { id: 'progresivo', label: 'Ascendente', emoji: '📈' },
];

export const PROMPTS = {
  picante: {
    verdad: [
      '{n}, si tuvieras que elegir a uno de los otros dos para pasar la noche, ¿a quién y por qué?',
      '{n}, ¿qué te parece más atractivo de {o} y qué de {p}? Sé específico.',
      '{n}, ¿alguna vez fantaseaste con dos personas a la vez? Cuenta lo que quieras.',
      '{n}, ¿has estado en un trío? Si sí, cuenta cómo empezó; si no, cómo te lo imaginas.',
      '{n}, si {o} y {p} te besaran al mismo tiempo, ¿dónde querrías cada boca?',
      '{n}, del 1 al 10, ¿qué tan encendido estás ahora mismo?',
      '{n}, ¿cuál es el límite de esta noche que nadie debería cruzar?',
      '{n}, ¿qué te gustaría que {o} y {p} te hicieran a la vez?',
      '{n}, ¿a cuál de los dos dejarías llevar el control y a cuál obedecerías?',
      '{n}, ¿qué parte de tu cuerpo te vuelve loco que te toquen y casi nadie acierta?',
      '{n}, ¿te pone más mirar cómo se tocan otros dos, o que te miren a ti?',
      '{n}, ¿quién de los tres crees que se va a soltar primero esta noche?',
      '{n}, describe con detalle el mejor beso que has dado.',
    ],
    reto: [
      '{n}, bésale la mano a {o} subiendo despacio hasta el codo, sin prisa.',
      '{n}, quítate una prenda mirando a los ojos a quien {p} señale.',
      '{n}, siéntate en las piernas de {o} de frente y quédate ahí hasta tu próximo turno.',
      '{n}, hazle a {o} un masaje lento de hombros mientras {p} te lo hace a ti.',
      '{n}, acércate al oído de {o} y susúrrale, con la voz baja, algo que te gustaría hacerle; {p} decide si lo repites en voz alta.',
      '{n}, deja que {o} y {p} elijan una prenda tuya para que te quites, y hazlo despacio.',
      '{n}, mira fijo a {o} 20 segundos, sin reírte, mientras {p} intenta distraerte tocándote el pelo.',
      '{n}, recórrele el cuello a {o} con besos lentos durante 10 segundos.',
      '{n}, {o} te guía las manos por su brazo y {p} dice hasta dónde puedes llegar.',
      '{n}, báilale a {o} muy pegado, marcando el ritmo con las caderas, mientras {p} pone la música con la boca.',
      '{n}, deja que {p} te pase un cubo de hielo por donde {o} señale, sin apartarte.',
      '{n}, apóyale la mano en el muslo a {o} y déjala ahí, quieta, hasta tu próximo turno.',
      '{n}, susúrrale al oído a {o} qué parte de su cuerpo miraste primero. {p} adivina: si acierta, bebe {n}; si falla, bebe {p} y {o} lo dice en voz alta.',
      '{n}, susúrrale al oído a {o} dónde le darías el primer beso. Si {p} adivina, {o} lo hace ahí mismo; si no, lo hace {n}.',
      '{n} y {o} se susurran al oído qué les gustaría del otro; {p} adivina de qué hablaron y, si falla, bebe.',
      '{n}, dale una palmada juguetona a {o} y luego acaricia donde diste, mientras {p} mira.',
      '{n}, describe en voz alta, con lujo de detalle, qué le harías a {o} y a {p} si no hubiera reglas.',
    ],
  },
  extremo: {
    verdad: [
      '{n}, si {o} y {p} te lo propusieran ahora mismo, ¿te animarías? Sé sincero.',
      '{n}, ¿a cuál de los dos besarías primero y a cuál dejarías para el final?',
      '{n}, cuenta con detalle la vez que estuviste más cerca de un trío (o cómo sería tu trío perfecto).',
      '{n}, confiesa la fantasía más fuerte que se te ha cruzado esta noche.',
      '{n}, ¿prefieres estar en el medio o mirar desde afuera?',
      '{n}, ¿qué te gustaría ver que {o} le hace a {p} delante de ti?',
      '{n}, ¿cuál es lo más atrevido que aceptarías hacer esta noche?',
      '{n}, ¿dejarías que {o} y {p} decidan tu próximo reto sin poder opinar?',
      '{n}, ¿qué palabra usamos si alguien quiere frenar todo?',
    ],
    reto: [
      '{n}, besa a {o} 10 segundos, subiendo la intensidad; {p} decide cuándo se corta.',
      '{n}, quítate dos prendas, o deja que {o} y {p} elijan una cada uno.',
      '{n}, recuéstate y deja que {o} y {p} te recorran los brazos y el cuello a la vez durante 30 segundos.',
      '{n}, con los ojos vendados, adivina solo por el beso en la mano quién es: ¿{o} o {p}?',
      '{n}, elige a uno para besar en la boca y al otro para sentarte encima dos turnos.',
      '{n} y {o}, junten los cuerpos en la pose más comprometida que puedan sin quitarse ropa; {p} cuenta 15 segundos en voz alta.',
      '{n}, deja que {o} te sujete las muñecas mientras {p} te hace al oído la pregunta más íntima que se le ocurra.',
      '{n}, muerde suave el labio de {o} y después el de {p}, sin prisa.',
      '{n}, agárrale una nalga a {o} 5 segundos, firme, mirándole a los ojos, mientras {p} mira de cerca.',
      '{n}, dale a {o} un beso y un agarrón de nalga a la vez; {p} puntúa del 1 al 10.',
      '{n}, por encima de la ropa, tócale una nalga a {o} y adivina de qué color lleva la ropa interior. Si aciertas, beso; si no, bebes.',
      '{n}, susúrrale al oído a {o} lo que te gustaría hacerle mientras le pones la mano encima de la ropa, donde se atreva.',
      '{n}, dile al oído a {o} y a {p} algo distinto y subido de tono a cada uno.',
      '{n}, {p} pone las reglas de los próximos 2 minutos y {n} y {o} las obedecen al pie de la letra.',
      '{n}, deja una marca de beso en {o} donde no se vea con ropa.',
      '{n}, siéntate a horcajadas sobre {o} y muévete despacio un turno mientras {p} lleva la cuenta.',
      '{n}, {o} y {p} deciden, entre susurros, cómo sigue tu próximo minuto.',
      '{n}, quítate una prenda cada vez que te rías en el próximo minuto; {o} y {p} van a intentar que te rías.',
    ],
  },
};

// Retos que caen al girar la botella (el elegido cumple con quien giró)
export const BOTELLA_RETOS = [
  'un beso de 5 segundos, donde el grupo decida',
  'besos lentos por el cuello durante 10 segundos',
  'quitarse una prenda, despacio',
  'sentarse encima del otro un turno entero',
  'un masaje lento de hombros de 30 segundos',
  'un susurro al oído contando lo que le gustaría',
  'mirarse a los ojos 20 segundos sin reírse',
  'un baile muy pegado de 20 segundos',
  'dejar que el otro le pase un cubo de hielo por el cuello',
  'un beso profundo de 8 segundos',
  'que el otro elija qué prenda se quita',
  'un mordisco suave en el labio',
  'una palmada y después una caricia donde dio',
  'una marca de beso donde no se vea con ropa',
];

const rand = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Memoria por lista: no repite hasta agotar las opciones.
const _usados = {};
function pick(arr, key) {
  if (!_usados[key]) _usados[key] = new Set();
  let opts = arr.filter((t) => !_usados[key].has(t));
  if (opts.length === 0) { _usados[key].clear(); opts = arr; }
  const t = rand(opts);
  _usados[key].add(t);
  return t;
}

export const pickBotellaReto = () => pick(BOTELLA_RETOS, 'botella');

function tresJugadores(jugadores) {
  const pool = jugadores.length >= 3 ? [...jugadores] : [...jugadores, 'alguien', 'otra persona', 'el tercero'];
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool.slice(0, 3);
}

function poolFor(nivelId, tipo, turno) {
  const p = PROMPTS.picante[tipo] || [];
  const e = PROMPTS.extremo[tipo] || [];
  if (nivelId === 'mezcla') return [...p, ...e];
  if (nivelId === 'progresivo') return turno < 3 ? [...p] : [...p, ...e];
  return PROMPTS[nivelId]?.[tipo] || p;
}

export function buildPrompt(nivelId, tipo, jugadores, turno = 0) {
  const text = pick(poolFor(nivelId, tipo, turno), `${nivelId}:${tipo}`);
  const [n, o, p] = tresJugadores(jugadores);
  return text
    .replaceAll('{no}', `${o} y ${p}`)
    .replaceAll('{n}', n)
    .replaceAll('{o}', o)
    .replaceAll('{p}', p);
}

export const contentStats = () =>
  NIVELES.map((nv) => ({
    ...nv,
    verdad: PROMPTS[nv.id]?.verdad?.length || 0,
    reto: PROMPTS[nv.id]?.reto?.length || 0,
  }));

export const totalPrompts = () =>
  contentStats().reduce((s, n) => s + n.verdad + n.reto, 0) + BOTELLA_RETOS.length;
