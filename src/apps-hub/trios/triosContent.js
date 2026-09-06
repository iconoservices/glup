// Juegos para Tríos +18 — contenido.
// {n} = un jugador · {o} = otro · {p} = el tercero · {no} = los otros dos

export const MODOS = [
  {
    id: 'vr',
    label: 'Verdad o Reto',
    emoji: '😏',
    nivel: 4,
    desc: 'Confesiones y retos entre los tres',
    ruta: '/juegos-para-trios/jugar?modo=vr',
  },
  {
    id: 'reto',
    label: 'Solo Retos',
    emoji: '🔥',
    nivel: 5,
    desc: 'Sin verdades: puro reto picante',
    ruta: '/juegos-para-trios/jugar?modo=reto',
  },
  {
    id: 'botella',
    label: 'La Botella',
    emoji: '🍾',
    nivel: 3,
    desc: 'Gira y apunta a quién le toca',
    ruta: '/juegos-para-trios/botella',
  },
];

export const NIVELES = [
  { id: 'picante', label: 'Picante', emoji: '😏', nivel: 4, desc: 'Sube de tono con calma' },
  { id: 'extremo', label: 'Extremo', emoji: '🔞', nivel: 5, desc: 'Solo si los tres se animan' },
];

export const PROMPTS = {
  picante: {
    verdad: [
      '{n}, ¿con cuál de los otros dos te irías si tuvieras que elegir uno?',
      '{n}, ¿qué te parece más atractivo de {o} y qué de {p}?',
      '{n}, ¿alguna vez fantaseaste con estar con más de una persona a la vez?',
      '{n}, ¿besarías a {o} y a {p} en la misma noche?',
      '{n}, del 1 al 10, ¿qué tan cómodo estás ahora mismo?',
      '{n}, ¿cuál es tu límite de esta noche que nadie debería cruzar?',
      '{n}, ¿qué te gustaría que {o} y {p} te hicieran a la vez?',
      '{n}, ¿a quién de los dos dejarías llevar el control?',
      '{n}, ¿alguna vez te sedujeron dos personas al mismo tiempo?',
      '{n}, ¿qué parte de tu cuerpo te gusta más que te toquen?',
      '{n}, ¿te pone más mirar o que te miren?',
      '{n}, ¿cuál de los tres crees que se va a soltar primero?',
    ],
    reto: [
      '{n}, dale un beso de 5 segundos a {o} mientras {p} decide dónde.',
      '{n}, quítate una prenda (ni zapatos ni calcetines).',
      '{n}, siéntate en las piernas de {o} hasta tu próximo turno.',
      '{n}, hazle un masaje de hombros a {o} mientras {p} te lo hace a ti.',
      '{n}, susúrrale al oído a {o} algo atrevido; {p} decide si lo repites en voz alta.',
      '{n}, deja que {o} y {p} elijan una prenda tuya para que te quites.',
      '{n}, mira fijo a {o} 20 segundos sin reírte mientras {p} intenta distraerte.',
      '{n}, dale un beso en el cuello a {o} durante 10 segundos.',
      '{n}, {o} guía tus manos y {p} dice hasta dónde.',
      '{n} y {o}, bailen pegados 20 segundos mientras {p} pone el ritmo.',
      '{n}, deja que {p} te pase un cubo de hielo por donde {o} señale.',
      '{n}, describe en voz alta qué harías con {o} y {p} si no hubiera reglas.',
    ],
  },
  extremo: {
    verdad: [
      '{n}, ¿harías un trío con {o} y {p} si pasara ahora mismo?',
      '{n}, ¿a quién de los dos besarías primero y a quién dejarías para el final?',
      '{n}, confiesa la fantasía más fuerte que se te cruzó esta noche.',
      '{n}, ¿prefieres estar en el medio o mirar?',
      '{n}, ¿qué te gustaría que {o} le haga a {p} delante de ti?',
      '{n}, ¿cuál es lo más atrevido que aceptarías hacer hoy?',
      '{n}, ¿te animarías a que {o} y {p} decidan tu próximo reto sin poder opinar?',
      '{n}, ¿qué palabra usamos si alguien quiere frenar todo?',
    ],
    reto: [
      '{n}, besa a {o} 10 segundos; {p} decide cuándo termina.',
      '{n}, quítate dos prendas o deja que {o} y {p} elijan una cada uno.',
      '{n}, recuéstate y deja que {o} y {p} te den un masaje a la vez durante 30 segundos.',
      '{n}, con los ojos vendados, adivina quién te besa la mano: ¿{o} o {p}?',
      '{n}, elige a uno para besar y al otro para sentarte en sus piernas, dos turnos.',
      '{n} y {o}, hagan la pose más comprometida que puedan sin quitarse ropa; {p} cuenta 15 segundos.',
      '{n}, deja que {o} te ate las manos con lo que encuentre mientras {p} te hace una pregunta íntima.',
      '{n}, muerde suave el labio de {o} y luego el de {p}.',
      '{n}, dile al oído a {o} y a {p} algo distinto y atrevido a cada uno.',
      '{n}, {p} pone las reglas de los próximos 2 minutos y {n} y {o} las siguen.',
      '{n}, dale un chupón a {o} donde no se vea con ropa.',
      '{n}, quítate una prenda cada vez que te rías en el próximo minuto.',
    ],
  },
};

// Retos que caen al girar la botella (el elegido cumple con quien giró)
export const BOTELLA_RETOS = [
  'un beso de 5 segundos, donde el grupo decida',
  'un beso en el cuello de 10 segundos',
  'quitarse una prenda',
  'sentarse en las piernas del otro un turno',
  'un masaje de hombros de 30 segundos',
  'susurrarle algo atrevido al oído',
  'mirarse fijo 20 segundos sin reírse',
  'un baile pegado de 20 segundos',
  'dejar que el otro le pase un cubo de hielo por el brazo',
  'un beso francés de 8 segundos',
  'que el otro elija qué prenda se quita',
  'morder suave el labio del otro',
];

const rand = (arr) => arr[Math.floor(Math.random() * arr.length)];

function tresJugadores(jugadores) {
  const pool = jugadores.length >= 3 ? [...jugadores] : [...jugadores, 'alguien', 'otra persona', 'el tercero'];
  // baraja
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool.slice(0, 3);
}

export function buildPrompt(nivelId, tipo, jugadores) {
  const lista = PROMPTS[nivelId]?.[tipo] || PROMPTS.picante[tipo];
  const text = rand(lista);
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
