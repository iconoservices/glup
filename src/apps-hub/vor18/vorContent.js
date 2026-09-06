// Verdad o Reto +18 — niveles y contenido.
// {n} = un jugador al azar · {o} = otro jugador · {yo} = quien juega

export const NIVELES = [
  { id: 'suave', label: 'Suave', emoji: '😇', nivel: 1, desc: 'Para romper el hielo' },
  { id: 'atrevido', label: 'Atrevido', emoji: '😏', nivel: 2, desc: 'Sube la temperatura' },
  { id: 'hardcore', label: 'Hardcore', emoji: '🔥', nivel: 4, desc: 'Sin vergüenza' },
  { id: 'loco', label: 'Loco', emoji: '🤪', nivel: 3, desc: 'Caos total' },
  { id: 'pareja', label: 'Pareja', emoji: '💑', nivel: 3, desc: 'Solo para dos' },
  { id: '4play', label: '4Play', emoji: '🔞', nivel: 5, desc: 'Nivel dios' },
];

export const PROMPTS = {
  suave: {
    verdad: [
      '{n}, ¿cuál ha sido tu peor cita?',
      '{n}, ¿alguna vez has espiado el celular de tu pareja?',
      '{n}, ¿quién te parece más atractivo de esta sala?',
      '{n}, ¿cuál es el apodo más cursi que te han puesto?',
      '{n}, ¿te has enamorado de un amigo o amiga?',
    ],
    reto: [
      '{n}, dale un abrazo de 20 segundos a {o}.',
      '{n}, imita cómo ligas y que el grupo puntúe.',
      '{n}, deja que {o} revise tu última búsqueda en el navegador.',
      '{n}, dile un piropo a {o} mirándole a los ojos.',
    ],
  },
  atrevido: {
    verdad: [
      '{n}, ¿cuál es tu fantasía más recurrente?',
      '{n}, ¿con quién de esta sala te irías si pudieras?',
      '{n}, ¿qué es lo más atrevido que has hecho en público?',
      '{n}, del 1 al 10, ¿qué tan bueno eres en la cama?',
    ],
    reto: [
      '{n}, quítate una prenda (no zapatos ni calcetines).',
      '{n}, hazle un baile sensual a {o} durante 20 segundos.',
      '{n}, susúrrale algo subido de tono al oído de {o}.',
      '{n}, deja que {o} te dé un mordisco suave donde elija.',
    ],
  },
  hardcore: {
    verdad: [
      '{n}, ¿has enviado fotos íntimas? ¿a quién fue la última?',
      '{n}, ¿cuál es el lugar más arriesgado donde lo has hecho?',
      '{n}, ¿has tenido un sueño húmedo con alguien de esta sala?',
      '{n}, nombra tu fetiche sin rodeos.',
    ],
    reto: [
      '{n}, besa el cuello de {o} durante 10 segundos.',
      '{n}, pásale un cubo de hielo a {o} por donde el grupo diga.',
      '{n}, deja que {o} te quite una prenda usando solo los dientes.',
      '{n}, simula tu mejor cara de placer durante 5 segundos.',
    ],
  },
  loco: {
    verdad: [
      '{n}, ¿cuál es la mentira más grande que has dicho para no quedar mal?',
      '{n}, ¿qué harías con 10.000 soles ahora mismo?',
      '{n}, cuenta la anécdota más vergonzosa de tu vida.',
    ],
    reto: [
      '{n}, habla como bebé hasta tu próximo turno.',
      '{n}, deja que el grupo te reescriba el estado de WhatsApp.',
      '{n}, llama a un contacto al azar y cántale "feliz cumpleaños".',
      '{n} y {o}, intercambien una prenda de ropa ahora.',
    ],
  },
  pareja: {
    verdad: [
      '{n}, ¿qué es lo que más te gusta que te hagan y nunca lo has pedido?',
      '{n}, ¿cuándo fue la última vez que deseaste a tu pareja de verdad?',
      '{n}, ¿hay algo que te gustaría probar y no te has atrevido a decir?',
    ],
    reto: [
      '{n}, dale un beso a {o} como si fuera la primera vez.',
      '{n}, dile a {o} tres cosas que te encienden de él o ella.',
      '{n}, véndale los ojos a {o} y hazle adivinar 3 cosas por el tacto.',
    ],
  },
  '4play': {
    verdad: [
      '{n}, ¿estarías dispuesto a un trío con alguien de esta sala?',
      '{n}, ¿a quién de aquí te llevarías a la cama sin pensarlo?',
      '{n}, confiesa el pensamiento más sucio que has tenido hoy.',
    ],
    reto: [
      '{n}, besa apasionadamente a {o} durante 10 segundos.',
      '{n}, siéntate en las piernas de {o} hasta tu próximo turno.',
      '{n}, deja que {o} escriba con el dedo una palabra en tu espalda y adivínala.',
    ],
  },
};

const rand = (arr) => arr[Math.floor(Math.random() * arr.length)];

export function buildPrompt(nivelId, tipo, jugadores) {
  const lista = PROMPTS[nivelId]?.[tipo] || PROMPTS.suave[tipo];
  let text = rand(lista);
  const pool = jugadores.length ? [...jugadores] : ['alguien', 'otra persona'];
  const n = rand(pool);
  const rest = pool.filter((x) => x !== n);
  const o = rest.length ? rand(rest) : 'alguien del grupo';
  return text.replaceAll('{n}', n).replaceAll('{o}', o).replaceAll('{yo}', n);
}
