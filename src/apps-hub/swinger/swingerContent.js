// Fiestas Swinger — contenido para eventos de varias parejas (español neutro).
// {n} = una persona · {o} = otra · {no} = otras dos
import { pickPareja } from '../../lib/players';

export const MODOS = [
  { id: 'hielo', label: 'Rompehielos', emoji: '🥂', desc: 'Para cuando las parejas recién se conocen', ruta: '/fiestas-swinger/jugar?modo=hielo' },
  { id: 'vr', label: 'Verdad o Reto entre parejas', emoji: '🔥', desc: 'Confesiones y retos que cruzan a las parejas', ruta: '/fiestas-swinger/jugar?modo=vr' },
  { id: 'ruleta', label: 'La Ruleta de Parejas', emoji: '🎯', desc: 'Empareja a dos personas al azar y les da un reto', ruta: '/fiestas-swinger/ruleta' },
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

export const ROMPEHIELOS = [
  '{n}, presenta a tu pareja al grupo diciendo algo que casi nadie sabe de ella.',
  '{n}, dile a {o} qué fue lo primero que notaste de él o ella al llegar.',
  '{n}, cuenta cómo se conocieron tú y tu pareja, versión corta.',
  '{n}, elige a otra pareja del grupo y di qué te gusta de cómo se tratan.',
  '{n} y {o}, descubran tres cosas que tienen en común en un minuto.',
  '{n}, hazle a {o} una pregunta que nunca le harías en un ascensor.',
  '{n}, di qué te trajo a una fiesta como esta por primera vez.',
  '{n}, elige una canción para el grupo y di con quién la bailarías.',
  '{n}, brinda con {o} y di un deseo para la noche (dentro de lo razonable).',
  '{n}, cuenta cuál es tu regla número uno para una noche así.',
  '{n}, dile un cumplido sincero a la pareja de {o}.',
  '{n} y {o}, elijan la palabra que van a usar esta noche si algo no va.',
  '{n}, cuenta la señal que usas con tu pareja para decir "sí" y para decir "mejor no".',
  '{n}, di qué te pone más nervioso y qué más curioso de estar aquí.',
];

export const PROMPTS = {
  picante: {
    verdad: [
      '{n}, ¿qué te atrajo de venir a una fiesta de parejas?',
      '{n}, ¿coqueteas más con la mirada o con las palabras? Demuéstralo con {o}.',
      '{n}, además de tu pareja, ¿a quién del grupo mirarías dos veces y por qué?',
      '{n}, ¿a qué pareja del grupo le pedirías un consejo de cama?',
      '{n}, ¿prefieres conocer a la otra pareja hablando o bailando muy pegados?',
      '{n}, ¿cuál es tu límite de esta noche que nadie debería cruzar?',
      '{n}, ¿qué te da más celos y cómo lo manejas?',
      '{n}, ¿qué señal usan tú y tu pareja para frenar?',
      '{n}, ¿qué pregunta te gustaría que te hiciera {o} al oído?',
      '{n}, ¿te pone más mirar o que te miren?',
    ],
    reto: [
      '{n}, ofrécele una copa a {o} y brinden mirándose a los ojos sin hablar.',
      '{n}, saca a bailar a {o} una canción entera, cada vez más cerca.',
      '{n}, dale un abrazo largo y de verdad a la pareja de {o}.',
      '{n}, hazle a {o} un cumplido sobre algo que solo notarías fijándote mucho.',
      '{n}, cuéntale a {o} tu plan ideal para el resto de la noche, con detalles.',
      '{n}, dale un beso lento de 5 segundos a {o}.',
      '{n}, quítate una prenda, sin prisa y sin cortar el contacto visual.',
      '{n}, hazle un masaje de hombros a {o} mientras tu pareja te lo hace a ti.',
      '{n}, báilale a {o} muy pegado 20 segundos, marcando el ritmo con las caderas.',
      '{n} y {o}, mírense fijo 20 segundos sin reírse mientras sus parejas los rodean.',
      '{n}, elige a una pareja para el próximo reto y explica por qué justo esa.',
    ],
  },
  extremo: {
    verdad: [
      '{n}, ¿has fantaseado con una noche de intercambio? Cuenta poco o mucho.',
      '{n}, cuenta cómo fue tu primera fiesta swinger (o tu primer intercambio): qué pasó y cómo terminó.',
      '{n}, ¿qué te gustaría que tu pareja te viera hacer esta noche?',
      '{n}, ¿qué es lo más lejos que llegarías hoy con el permiso de tu pareja?',
      '{n}, ¿qué te frena más: la vergüenza o los celos?',
      '{n}, ¿qué te gustaría ver que {o} le hace a su pareja delante de ti?',
      '{n}, ¿en el medio o mirando desde una silla?',
      '{n}, confiesa la fantasía más fuerte que se te ha cruzado esta noche.',
    ],
    reto: [
      '{n}, acércate al oído de {o} y susúrrale, con la voz baja, lo que te gustaría hacerle; tu pareja decide si lo repites en voz alta.',
      '{n}, deja que {o} te pase un cubo de hielo por el cuello y la clavícula, despacio.',
      '{n}, siéntate en las piernas de {o} un turno mientras las dos parejas miran de cerca.',
      '{n}, dale una palmada a {o} y después acaricia donde diste, mientras tu pareja mira.',
      '{n}, agárrale una nalga a {o} 5 segundos, firme, mirándole a los ojos, con las parejas de acuerdo.',
      '{n}, por encima de la ropa, tócale una nalga a {o} y adivina de qué color lleva la ropa interior. Si aciertas, beso; si no, bebes.',
      '{n}, recórrele el cuello a {o} con besos lentos durante 10 segundos.',
      '{n}, deja que {o} elija qué prenda te quitas, y quítatela sin prisa.',
      '{n}, susúrrale al oído a {o} qué parte de su cuerpo miraste primero. Si alguna pareja adivina, bebe {n}; si nadie, bebe quien más se acercó y {o} lo dice en voz alta.',
      '{n}, susúrrale al oído a {o} dónde le darías el primer beso. Si adivinan, {o} lo hace ahí mismo; si no, lo hace {n}.',
      '{n} y {o} se susurran qué les gustaría del otro; el resto adivina de qué hablaron y, si falla, bebe.',
      '{n}, cuéntale al oído a {o} qué te gustaría de la noche; {o} decide si lo dice en voz alta.',
      '{n}, elige a alguien de otra pareja y báilale muy pegado 30 segundos.',
      '{n} y {o}, con {no} mirando, decidan entre susurros el próximo reto de las dos parejas.',
      '{n}, con los ojos vendados, adivina solo por el beso en la mano quién de la otra pareja es.',
      '{n}, junta tu cuerpo con el de {o} en la pose más comprometida que puedan sin quitarse ropa; cuenten 15 segundos.',
    ],
  },
};

export const RULETA_RETOS = [
  'un brindis mirándose a los ojos, sin hablar',
  'un baile muy pegado de 20 segundos',
  'un beso lento de 5 segundos',
  'contarse al oído una fantasía sin dar nombres',
  'un masaje de hombros de 30 segundos',
  'susurrarse qué les gustaría de la noche',
  'mirarse a los ojos 20 segundos sin reírse',
  'que cada uno se quite una prenda, por turnos',
  'presentarse de nuevo, ahora diciendo algo subido de tono',
  'elegir juntos la próxima canción y bailarla pegados',
  'una palmada y una caricia donde dio',
  'besos lentos por el cuello durante 10 segundos',
  'sentarse encima del otro un turno mientras las parejas miran',
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

export const pickRuletaReto = () => pick(RULETA_RETOS, 'ruleta');

export function buildIcebreaker(jugadores) {
  const [n, o] = pickPareja(jugadores, false);
  return pick(ROMPEHIELOS, 'hielo').replaceAll('{n}', n).replaceAll('{o}', o);
}

function poolFor(nivelId, tipo, turno) {
  const p = PROMPTS.picante[tipo] || [];
  const e = PROMPTS.extremo[tipo] || [];
  if (nivelId === 'mezcla') return [...p, ...e];
  if (nivelId === 'progresivo') return turno < 3 ? [...p] : [...p, ...e];
  return PROMPTS[nivelId]?.[tipo] || p;
}

export function buildPrompt(nivelId, tipo, jugadores, turno = 0) {
  const [n, o] = pickPareja(jugadores, tipo === 'reto');
  return pick(poolFor(nivelId, tipo, turno), `${nivelId}:${tipo}`)
    .replaceAll('{no}', 'las otras parejas')
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
