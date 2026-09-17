// Sin Límites +18 — contenido (español neutro).
// {n} = una persona · {o} = otra
import { pickPareja } from '../../lib/players';

export const MODOS = [
  { id: 'vr', label: 'Verdad o Reto', emoji: '🖤', nivel: 5, desc: 'Confesiones sin filtro y retos al límite', ruta: '/sin-limites/jugar?modo=vr' },
  { id: 'reto', label: 'Solo Retos', emoji: '⛓️', nivel: 5, desc: 'Sin verdades: puro reto', ruta: '/sin-limites/jugar?modo=reto' },
];

// Niveles reales de contenido (para la vista /contenido)
export const NIVELES = [
  { id: 'fuerte', label: 'Fuerte', emoji: '🔥', nivel: 5, desc: 'Contacto directo, ropa fuera, mucha tensión' },
  { id: 'sinlimites', label: 'Sin Límites', emoji: '🔞', nivel: 6, desc: 'El tope: exhibición, entrega total al grupo' },
];

// Opciones del selector en la home
export const SELECTOR = [
  { id: 'fuerte', label: 'Fuerte', emoji: '🔥' },
  { id: 'sinlimites', label: 'Sin Límites', emoji: '🔞' },
  { id: 'mezcla', label: 'Al azar', emoji: '🎲' },
  { id: 'progresivo', label: 'Ascendente', emoji: '📈' },
];

export const PROMPTS = {
  fuerte: {
    verdad: [
      '{n}, ¿cuál es la fantasía que nunca le has contado a nadie del grupo?',
      '{n}, del 1 al 10, ¿qué tan lejos llegarías esta noche si nadie te juzgara?',
      '{n}, ¿qué es lo más atrevido que has hecho enfrente de otras personas?',
      '{n}, ¿te gusta más que te miren a ti o mirar a los demás?',
      '{n}, ¿a quién del grupo te gustaría ver desnudo esta noche?',
      '{n}, ¿cuál es la parte de tu cuerpo que más te gusta que admiren?',
      '{n}, describe sin filtro la última vez que perdiste el control.',
      '{n}, ¿qué prenda te quitarías primero si tuvieras que hacerlo ya mismo frente a todos?',
      '{n}, ¿cuál es tu límite real esta noche, el que nadie debería cruzar?',
      '{n}, ¿preferirías que {o} te desvista, o desvestir tú a {o} frente al grupo?',
    ],
    reto: [
      '{n}, quítate una prenda parándote al centro para que todos vean.',
      '{n}, deja que el grupo elija qué prenda te quitas y hazlo despacio.',
      '{n}, bésale el cuello a {o} durante 15 segundos mientras todos miran.',
      '{n}, camina por el centro de la sala en ropa interior durante 20 segundos.',
      '{n}, deja que {o} te desabroche una prenda con los dientes.',
      '{n}, ponte de pie y deja que dos personas del grupo te toquen los hombros y la espalda a la vez.',
      '{n}, quédate solo en ropa interior el resto de esta ronda.',
      '{n}, deja que {o} te dé un masaje de un minuto entero, sin ropa arriba, frente al grupo.',
      '{n}, posa como en una sesión de fotos 15 segundos, con la prenda que el grupo elija fuera.',
      '{n}, siéntate en las piernas de {o} sin la parte de arriba y quédate ahí hasta tu próximo turno.',
      '{n}, deja que {o} te recorra la espalda con hielo mientras el grupo cuenta hasta 20.',
    ],
  },
  sinlimites: {
    verdad: [
      '{n}, confiesa con detalle la fantasía más fuerte que tienes con más de una persona del grupo.',
      '{n}, ¿te animarías a quedarte sin ropa frente a todos ahora mismo? ¿Por qué sí o por qué no?',
      '{n}, ¿qué es lo más lejos que has llegado siendo observado por otros?',
      '{n}, si el grupo decidiera por ti esta noche, ¿hasta dónde dejarías que lleguen?',
      '{n}, ¿qué palabra usamos si en cualquier momento quieres frenar todo?',
      '{n}, describe qué sentirías si {o} se desnudara frente a ti ahora mismo.',
      '{n}, ¿prefieres ser el centro de atención desnudo, o que lo sea {o} mientras miras?',
    ],
    reto: [
      '{n}, quédate completamente sin ropa frente al grupo durante el resto de esta ronda (o hasta que digas "paso").',
      '{n}, deja que {o} te quite la última prenda, despacio, con todos mirando.',
      '{n}, ponte de pie al centro y deja que el grupo decida, entre todos, qué prenda sale a continuación.',
      '{n}, recuéstate y deja que {o} te recorra todo el cuerpo con las manos durante 30 segundos, sin ropa, mientras el grupo mira en silencio.',
      '{n}, báilale a {o} sin ropa un turno entero, muy cerca, sin que se toquen todavía.',
      '{n}, quédate quieto en el centro mientras dos personas del grupo, por turnos, te dan un beso donde ellas elijan (nunca en zonas íntimas).',
      '{n}, deja que el grupo te tome una foto en la pose que decidan (para verla ahí mismo y borrarla al terminar la ronda).',
      '{n} y {o}, quítense la ropa que les queda al mismo tiempo, mirándose a los ojos, mientras el grupo cuenta hacia atrás desde 10.',
    ],
  },
};

const rand = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Memoria por lista: no repite hasta agotar las opciones.
const _usados = {};
function pick(arr, key) {
  if (!arr.length) return '';
  if (!_usados[key]) _usados[key] = new Set();
  let opts = arr.filter((t) => !_usados[key].has(t));
  if (opts.length === 0) { _usados[key].clear(); opts = arr; }
  const t = rand(opts);
  _usados[key].add(t);
  return t;
}

// Retos escritos por el grupo (en memoria, no se guardan en ningún servidor).
const _custom = { verdad: [], reto: [] };

export function addCustomReto(tipo, texto) {
  const t = texto.trim();
  if (!t) return;
  _custom[tipo === 'verdad' ? 'verdad' : 'reto'].push(t);
}

export function customCount(tipo) {
  return _custom[tipo === 'verdad' ? 'verdad' : 'reto'].length;
}

function poolFor(nivelId, tipo, turno) {
  const f = PROMPTS.fuerte[tipo] || [];
  const s = PROMPTS.sinlimites[tipo] || [];
  const c = _custom[tipo] || [];
  if (nivelId === 'mezcla') return [...f, ...s, ...c];
  if (nivelId === 'progresivo') return turno < 3 ? [...f, ...c] : [...f, ...s, ...c];
  return [...(PROMPTS[nivelId]?.[tipo] || f), ...c];
}

export function buildPrompt(nivelId, tipo, jugadores, turno = 0) {
  const text = pick(poolFor(nivelId, tipo, turno), `${nivelId}:${tipo}`);
  const [n, o] = pickPareja(jugadores, tipo === 'reto');
  return text.replaceAll('{n}', n).replaceAll('{o}', o);
}

export const contentStats = () =>
  NIVELES.map((nv) => ({
    ...nv,
    verdad: PROMPTS[nv.id]?.verdad?.length || 0,
    reto: PROMPTS[nv.id]?.reto?.length || 0,
  }));
