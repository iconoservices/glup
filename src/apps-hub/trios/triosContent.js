// Juegos para Tríos +18 — contenido (español neutro).
// {n} = una persona · {o} = otra · {p} = el tercero · {no} = otras dos
import { pickTrio, nombre } from '../../lib/players';

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
  { id: 'progresivo', label: 'Modo Automático', emoji: '🔥' },
  { id: 'picante', label: 'Picante', emoji: '😏' },
  { id: 'extremo', label: 'Extremo', emoji: '🔞' },
  { id: 'mezcla', label: 'Al azar', emoji: '🎲' },
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
      '{n}, ¿qué fantasía en trío siempre has querido cumplir?',
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
      '{n}, describe en voz alta, con lujo de detalle, qué le harías a {o} y a {p} si pudieras hacer lo que quisieras.',
    ],
  },
  extremo: {
    verdad: [
      { text: '{n}, ¿a quién de los dos te gustaría chuparle primero y por qué?', role: 'cualquiera' },
      { text: '{n}, ¿preferirías que te usaran la boca los dos al mismo tiempo o que uno te penetre mientras el otro te toca?', role: 'cualquiera' },
      { text: '{n}, ¿qué te pone más: que te digan lo que tienes que hacer o que simplemente te usen?', role: 'cualquiera' },
      { text: '{n}, ¿quién crees que se corre más rápido si los otros dos lo estimulan juntos?', role: 'cualquiera' },
      { text: '{n}, ¿te gustaría que te grabaran mientras os lo hacéis los tres?', role: 'cualquiera' },
      { text: '{n}, ¿qué posición de trío te gustaría probar esta noche?', role: 'cualquiera' },
      { text: '{n}, ¿quién de los tres tiene el cuerpo que más te pone ahora mismo?', role: 'cualquiera' },
      { text: '{n}, ¿preferirías correrte en la boca, en la cara o dentro?', role: 'cualquiera' },
      { text: '{n}, ¿te excitaría más mandar o que te manden un rato?', role: 'cualquiera' },
      { text: '{n}, si pudieras pedir una cosa concreta a los otros dos ahora mismo, ¿qué les pedirías?', role: 'cualquiera' },
      { text: '{m}, ¿quién de los dos hombres ({h1} o {h2}) te provoca más ganas de chupársela primero y por qué exactamente?', role: 'mujer' },
      { text: '{m}, ¿qué parte del cuerpo de cada hombre ({h1} y {h2}) te provoca más ganas de lamer o morder?', role: 'mujer' },
      { text: '{m}, ¿preferirías chupársela a los dos al mismo tiempo o que los dos te penetren a la vez (uno delante y otro detrás)?', role: 'mujer' },
      { text: '{m}, ¿te gustaría probar sexo anal con los dos? ¿Quién te lo metería primero ({h1} o {h2}) y cómo te lo imaginas?', role: 'mujer' },
    ],
    reto: [
      // Para cualquiera (según a quién le toque):
      { text: '{n}, ponte de rodillas y chúpales a los otros dos durante 40 segundos (sin manos).', role: 'cualquiera' },
      { text: '{n}, acuéstate y deja que uno se siente en tu cara mientras el otro te penetra o te toca.', role: 'cualquiera' },
      { text: '{n}, ponte a cuatro patas: uno te usa la boca y el otro te penetra.', role: 'cualquiera' },
      { text: '{n}, quédate quieto con las manos atrás mientras los otros dos te tocan y te usan durante 1 minuto.', role: 'cualquiera' },
      { text: '{n}, besa a los otros dos a la vez (lengua) mientras te tocan.', role: 'cualquiera' },
      // Más enfocados al chico que toma más iniciativa / activo:
      { text: '{h1}, ordena a los otros dos qué posición tienen que ponerse y que lo cumplan 45 segundos.', role: 'hombre' },
      { text: '{h1}, penetra a {m} mientras el otro le chupa los pechos o la toca.', role: 'hombre' },
      { text: '{h1}, haz que el otro chico se ponga de rodillas y le chupe a {m} mientras tú la penetras.', role: 'hombre' },
      { text: '{h1}, usa a {m} como quieras durante 1 minuto mientras el otro solo mira y se toca.', role: 'hombre' },
      { text: '{h1}, decide tú la posición de los tres y mándala durante al menos 1 minuto.', role: 'hombre' },
      // Retos de dinámica conjunta:
      { text: '{m}, siéntate sobre la cara de uno ({h1} o {h2}) mientras el otro te penetra 45 segundos.', role: 'mujer' },
      { text: 'Uno de los hombres ({h1} o {h2}) penetra a {m} mientras ella le chupa la polla al otro. Cuando digan "cambio", intercambian.', role: 'mujer' },
      { text: 'Posición 69 doble: {m} se tumba, un hombre ({h1} o {h2}) se pone encima de su cara y el otro se une como quiera. 1 minuto.', role: 'todos' },
      { text: '{m}, con {h1} y {h2}: intentad la doble penetración (uno en vagina y otro en culo, o los dos en vagina) al menos 1 minuto.', role: 'mujer' },
      { text: '{m}, mastúrbalos a {h1} y a {h2} al mismo tiempo mientras ellos te acarician los pechos y el cuerpo.', role: 'mujer' },
      { text: 'Reto final: los tres se estimulan mutuamente hasta que alguien se corra. El primero que se corra tiene que lamer a los otros dos.', role: 'todos' },
      { text: '{n}, besa a {o} 10 segundos, subiendo la intensidad; {p} decide cuándo se corta.', role: 'cualquiera' },
      { text: '{n}, quítate dos prendas, o deja que {o} y {p} elijan una cada uno.', role: 'cualquiera' },
      { text: '{n}, recuéstate y deja que {o} y {p} te recorran los brazos y el cuello a la vez durante 30 segundos.', role: 'cualquiera' },
      { text: '{n}, con los ojos vendados, adivina solo por el beso en la mano quién es: ¿{o} o {p}?', role: 'cualquiera' },
      { text: '{n}, elige a uno para besar en la boca y al otro para sentarte encima dos turnos.', role: 'cualquiera' },
      { text: '{n} y {o}, junten los cuerpos en la pose más comprometida que puedan sin quitarse ropa; {p} cuenta 15 segundos en voz alta.', role: 'cualquiera' },
      { text: '{n}, deja que {o} te sujete las muñecas mientras {p} te hace al oído la pregunta más íntima que se le ocurra.', role: 'cualquiera' },
      { text: '{n}, muerde suave el labio de {o} y después el de {p}, sin prisa.', role: 'cualquiera' },
      { text: '{n}, agárrale una nalga a {o} 5 segundos, firme, mirándole a los ojos, mientras {p} mira de cerca.', role: 'cualquiera' },
      { text: '{n}, dale a {o} un beso y un agarrón de nalga a la vez; {p} puntúa del 1 al 10.', role: 'cualquiera' },
      { text: '{n}, por encima de la ropa, tócale una nalga a {o} y adivina de qué color lleva la ropa interior. Si aciertas, beso; si no, bebes.', role: 'cualquiera' },
      { text: '{n}, susúrrale al oído a {o} lo que te gustaría hacerle mientras le pones la mano encima de la ropa, donde se atreva.', role: 'cualquiera' },
      { text: '{n}, dile al oído a {o} y a {p} algo distinto y subido de tono a cada uno.', role: 'cualquiera' },
      { text: '{n}, {p} toma el control total de los próximos 2 minutos y {n} y {o} hacen lo que ordene.', role: 'cualquiera' },
      { text: '{n}, deja una marca de beso en {o} donde no se vea con ropa.', role: 'cualquiera' },
      { text: '{n}, siéntate a horcajadas sobre {o} y muévete despacio un turno mientras {p} lleva la cuenta.', role: 'cualquiera' },
      { text: '{n}, dale a {o} un beso lento en el vientre, justo sobre la ropa, mientras {p} mira.', role: 'cualquiera' },
      { text: '{n}, con {o} de pie, bésale despacio de la clavícula hacia abajo hasta donde te atrevas, por encima de la ropa; {p} dice cuándo parar.', role: 'cualquiera' },
      { text: '{n}, {o} y {p} deciden, entre susurros, cómo sigue tu próximo minuto.', role: 'cualquiera' },
      { text: '{n}, quítate una prenda cada vez que te rías en el próximo minuto; {o} y {p} van a intentar que te rías.', role: 'cualquiera' },
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
  if (!arr.length) return '';
  if (!_usados[key]) _usados[key] = new Set();
  let opts = arr.filter((t) => !_usados[key].has(typeof t === 'string' ? t : t.text));
  if (opts.length === 0) { _usados[key].clear(); opts = arr; }
  const t = rand(opts);
  _usados[key].add(typeof t === 'string' ? t : t.text);
  return t;
}

export const TRIOS_SUAVE = {
  verdad: [
    '¿Qué fue lo primero que miraste de los otros dos cuando se juntaron hoy?',
    '¿Alguna vez habías fantaseado con dos personas a la vez? Cuéntalo sin filtro.',
    '¿Quién de los otros dos crees que tiene la mirada más seductora?',
    '¿Qué parte de tu cuerpo te encanta que te acaricien suavemente y casi nadie lo hace?',
    'Si te dieran un beso suave con los ojos vendados, ¿crees que reconocerías quién fue?',
    '¿Quién de los tres crees que tiene la boca que más te provoca besar con calma?',
    '¿Te gusta más que te toquen despacio por sorpresa o que te miren fijo antes de tocarte?',
    'Describe con detalle cómo sería el beso de tres perfecto para ti.',
    '¿Quién de los tres crees que se va a encender primero hoy?',
    '¿Qué prenda de las que llevan puestas los otros dos te parece más sexy?',
  ],
  reto: [
    'Siéntate en las piernas de {o} de frente, con ropa, y quédate ahí hasta tu próximo turno.',
    'Mira fijo a los ojos de {o} durante 20 segundos sin reírte. {p} cuenta los segundos en voz alta.',
    'Hazle a {o} un masaje lento de hombros y cuello durante 30 segundos mientras {p} te acaricia la espalda.',
    'Recórrele el cuello a {o} con besos lentos y suaves durante 15 segundos.',
    'Bésale suavemente la comisura de los labios a {o} y luego a {p}, sin prisa.',
    'Susúrrale al oído a {o} algo íntimo que te gustaría que pase esta noche. {p} intenta adivinar qué dijiste.',
    'Pasa tus manos por los brazos y hombros de {o} muy despacio, mirándole fijo a los ojos.',
    'Apoya tu mano en el muslo de {o} y déjala ahí, quieta, hasta tu próximo turno.',
    'Báilale a {o} muy pegado durante 20 segundos marcando las caderas, mientras {p} pone el ritmo.',
    'Pásale un cubito de hielo por el cuello o la clavícula a {o} muy despacio.',
    'Dale un beso en la boca a {o} de 8 segundos sin lengua, saboreando el momento.',
    'Pasa tu nariz por el cuello de {o} oliendo su piel mientras {p} te acaricia el cabello.',
  ],
};

export const TRIOS_PICANTE_FASE = {
  verdad: [
    '¿A quién de los otros dos te mueres de ganas de ver sin camiseta o blusa primero?',
    '¿Preferirías que te desnudaran entre los dos despacio o desnudarlos tú a ellos?',
    '¿Qué parte íntima te provoca más que te besen o muerdan suavemente?',
    'Del 1 al 10, ¿qué tan caliente estás ahora mismo con lo que ha pasado?',
    '¿Qué fantasía de trío quieres cumplir sí o sí esta noche si nadie juzga?',
    '¿Prefieres que te besen en la boca mientras te tocan por dentro de la ropa o mirar cómo se tocan los otros dos?',
  ],
  reto: [
    'Quítate la primera prenda (camiseta, blusa, chaqueta) despacio frente a los dos.',
    'Deja que los otros dos elijan una prenda tuya para que te quites lentamente.',
    'Besa apasionadamente a {o} con lengua durante 20 segundos mientras {p} te acaricia la cintura.',
    'Mete tu mano por debajo de la camiseta de {o} y recórrele la espalda o el abdomen durante 25 segundos.',
    'Dale un beso lento en el cuello a {o} bajando hasta el escote o el pecho por encima de la ropa.',
    'Agárrale una nalga a {o} con firmeza durante 5 segundos mirándole fijo a los ojos.',
    'Muerde suavemente el labio inferior de {o} y después el de {p}.',
    'Ambos te chupan un pezón por encima de la ropa (o directo si ya no hay camiseta) durante 30 segundos.',
    'Desabróchale una prenda a {o} usando solo una mano o los dientes.',
    'Siéntate a horcajadas sobre {o} y muévete despacio al ritmo de la música mientras {p} mira.',
    'Besa los labios de {o} y déjale una caricia firme en los muslos internos.',
  ],
};

export const pickBotellaReto = () => pick(BOTELLA_RETOS, 'botella');

export const TRIOS_PAREJA = {
  verdad: [
    '¿Te excita más ver a tu pareja con el invitado o participar activamente?',
    '¿Qué te gustaría que el invitado le hiciera a tu pareja mientras tú miras?',
    '¿Preferirías que tu pareja eligiera cómo te toca el invitado, o decidirlo tú?',
    '¿Te pone más celos o más caliente ver a tu pareja gemir con otra persona?',
    '¿Qué parte del cuerpo del invitado te gustaría que tu pareja probara primero?',
    '¿Te gustaría que el invitado te besara mientras tu pareja te toca?',
    '¿Quién crees que te pone más caliente ahora mismo: tu pareja o el invitado?',
    '¿Preferirías que te desnudaran entre los dos o que uno te desnude mientras el otro mira?',
    '¿Qué te gustaría escuchar mientras os lo estáis haciendo los tres?',
    'Si pudieras pedir una sola cosa ahora mismo, ¿qué les pedirías a los otros dos?',
  ],
  reto: [
    'Tu pareja elige dónde te besa el invitado (cuello, pecho, boca, muslos…).',
    'Ambos te chupan un pezón cada uno durante 30 segundos.',
    'Hazle un oral al invitado mientras tu pareja te mira y se toca.',
    'Tu pareja te toca por encima de la ropa mientras el invitado te besa el cuello.',
    'Siéntate entre los dos y deja que te toquen el pecho y los muslos al mismo tiempo.',
    'El invitado te desnuda la parte de arriba mientras tu pareja te besa.',
    'Tu pareja elige a quién le haces sexo oral primero.',
    'Los dos te lamen el cuello y las orejas al mismo tiempo mientras te tocan.',
    'Tu pareja decide la posición de los tres durante 1 minuto (caricias, besos y orales).',
    'Ponte a cuatro patas. Tu pareja elige quién te penetra 1 vez mientras el otro te mira.',
    'Ponte a cuatro patas. Tu pareja elige quién te penetra 2 veces mientras el otro te mira.',
    'Ponte a cuatro patas. Tu pareja elige quién te penetra 3 veces mientras el otro te mira.',
    'Ponte a cuatro patas. Tu pareja elige quién te penetra 4 veces mientras el otro te mira.',
    'Ponte a cuatro patas. Tu pareja elige quién te penetra 5 veces mientras el otro te mira.',
    'Ponte a cuatro patas. Él te la mete lentamente solo 1 vez hasta el fondo y la saca, mientras el otro te mira.',
    'Ponte a cuatro patas. Él te la mete lentamente 2 veces (entra y sale completo) mientras el otro observa.',
    'Ponte a cuatro patas. Él te la mete hasta el fondo y la mantiene dentro 3 segundos sin moverse, luego la saca. El otro mira.',
    'Ponte a cuatro patas. Él te la mete y la deja dentro 4 segundos sin moverse. Solo siente el pulso. Después la saca.',
    'Ponte a cuatro patas. Él te la mete y la mantiene quieta 5 segundos dentro. El otro te mira todo el tiempo.',
    'Siéntate encima de su pene erecto (del invitado o del otro) sin moverte durante 4 segundos. Solo siente cómo late dentro. Luego levántate despacio.',
    'Siéntate en su pene y quédate completamente quieta 5 segundos. No te muevas ni un poco. Al salir, hazlo lento para que se note la excitación.',
    'Siéntate en su pene erecto, métetelo hasta el fondo y mantente quieta 3 segundos mientras el otro te mira. Luego levántate despacio sin frotar.',
    'Ábrete de piernas. Él te da un solo beso lento y profundo de 5 segundos en el clítoris mientras el otro observa. Nada más, solo ese beso.',
    'Ponte de rodillas y chúpales la polla a los dos al mismo tiempo durante 30 segundos.',
    'Ponte de rodillas. Chúpale la polla a uno mientras solo agarras y acaricias la del otro con la mano.',
    'Ponte de rodillas. Chúpale a uno durante 20 segundos y luego cambia al otro, sin usar las manos.',
    'Ponte de rodillas entre los dos. Uno te la mete en la boca y tú solo sostienes la del otro con la mano, sin chupársela.',
    'Siéntate encima de él (pene dentro) y salta/rebota durante 10 segundos mientras el otro cuenta en voz alta.',
    'Móntalo y salta encima de él durante 8 segundos. El otro cuenta y te mira.',
    'Siéntate en su pene y haz 10 saltitos cortos sin parar. El otro cuenta cada uno.',
    'Móntalo, métetelo hasta el fondo y rebota despacio durante 10 segundos mientras el otro te observa.',
  ],
};

export const TRIOS_AMIGOS = {
  verdad: [
    '¿Quién de los otros dos crees que besa mejor?',
    '¿A cuál de los dos preferirías que te tocara primero?',
    '¿Qué te pone más: que te elijan o ser tú quien elige?',
    '¿Quién crees que se pone más caliente más rápido si lo estimulan los otros dos?',
    '¿Qué te gustaría que te hicieran los dos al mismo tiempo ahora mismo?',
    '¿Preferirías que te besaran los dos a la vez o uno después del otro?',
    '¿Quién tiene la boca que más te gustaría probar?',
    '¿Te excita más mandar un rato o que te manden?',
    '¿Qué parte del cuerpo de cada uno te provoca más ganas de lamer?',
    'Si pudieras pedir solo una cosa ahora mismo, ¿qué sería?',
  ],
  reto: [
    'La persona a la que le toque elige dónde la besan los otros dos.',
    'Ambos te chupan un pezón cada uno durante 30 segundos.',
    'Besa a los otros dos con lengua, 20 segundos cada uno.',
    'Siéntate entre los dos y deja que te toquen el pecho y entre las piernas por encima de la ropa.',
    'Hazle sexo oral a uno durante 30 segundos mientras el otro te besa.',
    'Los tres se tocan y se besan mutuamente durante 1 minuto.',
    'Quítale la parte de arriba a los otros dos con las manos y la boca.',
    'Masturba a los dos al mismo tiempo durante 40 segundos.',
    'Ponte a cuatro patas. La persona a la que le toque elige quién la penetra 1 vez mientras el otro mira.',
    'Ponte a cuatro patas. La persona a la que le toque elige quién la penetra 2 veces mientras el otro mira.',
    'Ponte a cuatro patas. La persona a la que le toque elige quién la penetra 3 veces mientras el otro mira.',
    'Ponte a cuatro patas. La persona a la que le toque elige quién la penetra 4 veces mientras el otro mira.',
    'Ponte a cuatro patas. La persona a la que le toque elige quién la penetra 5 veces mientras el otro mira.',
    'Ponte a cuatro patas. Uno te la mete lentamente solo 1 vez hasta el fondo y la saca, mientras el otro te mira.',
    'Ponte a cuatro patas. Uno te la mete lentamente 2 veces (entra y sale completo) mientras el otro observa.',
    'Ponte a cuatro patas. Él te la mete hasta el fondo y la mantiene dentro 3 segundos sin moverse, luego la saca. El otro mira.',
    'Ponte a cuatro patas. Él te la mete y la deja dentro 4 segundos sin moverse. Solo siente el pulso. Después la saca.',
    'Ponte a cuatro patas. Él te la mete y la mantiene quieta 5 segundos dentro. El otro te mira todo el tiempo.',
    'Siéntate encima de su pene erecto sin moverte durante 4 segundos. Solo siente cómo late dentro. Luego levántate despacio.',
    'Siéntate en su pene y quédate completamente quieta 5 segundos. No te muevas ni un poco. Al salir, hazlo lento para que se note la excitación.',
    'Siéntate en su pene erecto, métetelo hasta el fondo y mantente quieta 3 segundos mientras el otro te mira. Luego levántate despacio sin frotar.',
    'Ábrete de piernas. Uno te da un solo beso lento y profundo de 5 segundos en el clítoris mientras el otro observa. Nada más, solo ese beso.',
    'Ponte de rodillas y chúpales la polla a los dos al mismo tiempo durante 30 segundos.',
    'Ponte de rodillas. Chúpale la polla a uno mientras solo agarras y acaricias la del otro con la mano.',
    'Ponte de rodillas. Chúpale a uno durante 20 segundos y luego cambia al otro, sin usar las manos.',
    'Ponte de rodillas entre los dos. Uno te la mete en la boca y tú solo sostienes la del otro con la mano, sin chupársela.',
    'Siéntate encima de él (pene dentro) y salta/rebota durante 10 segundos mientras el otro cuenta en voz alta.',
    'Móntalo y salta encima de él durante 8 segundos. El otro cuenta y te mira.',
    'Siéntate en su pene y haz 10 saltitos cortos sin parar. El otro cuenta cada uno.',
    'Móntalo, métetelo hasta el fondo y rebota despacio durante 10 segundos mientras el otro te observa.',
  ],
};

// Retos específicos para cuando a un hombre le toca en un trío mixto (HMH / 2H + 1M)
export const RETOS_HOMBRE_HMH = {
  pareja: [
    'Penetra a {m} lentamente mientras el invitado mira y se toca.',
    'Ponte detrás de {m} y dale 3 embestidas lentas hasta el fondo mientras el invitado la besa en la boca.',
    'Bésale el cuello y los pechos a {m} mientras el invitado le acaricia las nalgas.',
    'Mira de cerca cómo el invitado besa a {m} durante 30 segundos mientras tú te masturbas.',
    'Tú y el invitado le chupan un pezón a {m} cada uno al mismo tiempo durante 30 segundos.',
    'Elige tú en qué posición penetras a {m} durante 45 segundos mientras el invitado observa.',
    '{m} te hace sexo oral a ti mientras tú decides si el invitado puede tocarla o solo mirar.',
    'Dale una palmada firme en las nalgas a {m} y después bésala apasionadamente.',
  ],
  invitado: [
    'Penetra a {m} mientras su pareja te mira de cerca y se masturba.',
    'Ponte detrás de {m} y dale 3 embestidas lentas hasta el fondo mientras su pareja la besa en la boca.',
    'Bésale los pechos y el vientre a {m} mientras su pareja la penetra.',
    'Hazle sexo oral a {m} durante 30 segundos mientras su pareja te observa.',
    'Tú y la pareja se turnan para acariciar y besar a {m} por todo el cuerpo durante 1 minuto.',
  ],
  amigos: [
    'Penetra a {m} mientras el otro chico le besa los pechos o la acaricia.',
    'Ponte detrás de {m} y dale 3 embestidas lentas hasta el fondo mientras el otro la besa en la boca.',
    'Bésale el cuello y los pechos a {m} mientras el otro le toca las nalgas.',
    'Tú y el otro chico le chupan un pezón a {m} cada uno al mismo tiempo durante 30 segundos.',
    'Acaricia y masturba a {m} mientras el otro le da besos en la boca.',
    'Elige tú la posición de {m} y penetra lentamente 2 veces mientras el otro mira.',
  ],
};

// Preguntas y retos para el Invitado/a cuando le toca su turno en Pareja + Invitado
export const PROMPTS_INVITADO = {
  verdad: [
    '¿A cuál de los dos de la pareja te gustaría besar o tocar primero y por qué?',
    '¿Qué es lo que más morbo o excitación te da de meterte en la cama con esta pareja?',
    '¿Prefieres que la pareja lleve el control de lo que te hacen o mandar tú un rato?',
    '¿Quién de la pareja crees que tiene el cuerpo que más te pone ahora mismo?',
    '¿Te gustaría ver a la pareja haciéndolo frente a ti antes de unirte tú?',
  ],
  reto_mujer: [
    'Ponte a cuatro patas. La pareja elige quién te penetra 2 veces mientras el otro mira.',
    'Siéntate encima del pene erecto de uno de ellos sin moverte durante 4 segundos. Luego levántate despacio.',
    'Ponte de rodillas y chúpales la polla a los dos al mismo tiempo durante 30 segundos.',
    'Ábrete de piernas. Uno de ellos te da un solo beso lento de 5 segundos en el clítoris mientras el otro observa.',
    'La pareja elige en qué parte del cuerpo te besan entre los dos al mismo tiempo.',
    'Besa apasionadamente a uno de la pareja mientras el otro te acaricia la cintura o el pecho.',
    'Deja que la pareja elija qué prenda te quitas lentamente.',
    'Siéntate entre los dos y deja que te toquen por encima de la ropa durante 30 segundos.',
  ],
  reto_hombre: [
    'Penetra a {m} mientras su pareja te mira de cerca y se masturba.',
    'Ponte detrás de {m} y dale 3 embestidas lentas hasta el fondo mientras su pareja la besa en la boca.',
    'Bésale los pechos y el vientre a {m} mientras su pareja la penetra.',
    'Hazle sexo oral a {m} durante 30 segundos mientras su pareja te observa.',
    'Besa apasionadamente a la mujer de la pareja durante 20 segundos.',
    'La pareja decide qué prenda tuya se quita primero.',
  ],
};

function esRetoExclusivoMujer(texto = '') {
  const t = texto.toLowerCase();
  return (
    t.includes('clítoris') ||
    t.includes('siéntate en su pene') ||
    t.includes('siéntate encima de su pene') ||
    t.includes('chúpales la polla a los dos') ||
    t.includes('chúpale la polla a uno') ||
    t.includes('te la mete en la boca') ||
    t.includes('móntalo') ||
    t.includes('salta/rebota') ||
    t.includes('saltitos cortos') ||
    t.includes('rebota despacio') ||
    t.includes('él te la mete lentamente') ||
    t.includes('él te la mete hasta el fondo') ||
    t.includes('quién te penetra')
  );
}

export function buildBotellaPrompt(elegido, tipo = 'reto', jugadores = [], relacion = 'pareja', nivel = 'suave') {
  const norm = Array.isArray(jugadores)
    ? jugadores.map((j, idx) => (typeof j === 'string' ? { name: j, gen: 'x', con: 'ambos', idx } : { gen: 'x', con: 'ambos', idx, ...j }))
    : [];
  const elNombre = nombre(elegido);
  const elegIndex = norm.findIndex((j) => j.name.toLowerCase() === elNombre.toLowerCase());
  const elObj = elegIndex >= 0 ? norm[elegIndex] : { name: elNombre, gen: 'x', con: 'ambos', idx: 0 };
  const idx = elegIndex >= 0 ? elegIndex : 0;

  const comp = getComposicion(jugadores);
  const esHMH = comp.tipo === 'HMH';
  const esHombre = elObj.gen === 'h';
  const esMujer = elObj.gen === 'm';

  // Pareja + Invitado: por defecto los 2 primeros son la pareja, el 3ero es el invitado
  const esInvitado = relacion === 'pareja' && (elObj.esInvitado || idx === 2);
  const parejaObj = norm.find((j, i) => i !== idx && i !== 2) || norm[(idx + 1) % norm.length];
  const invitadoObj = norm[2] || norm[norm.length - 1];
  const mName = comp.m ? nombre(comp.m) : (norm.find((j) => j.gen === 'm')?.name || 'ella');

  let text = '';
  let roleLabel = relacion === 'pareja' ? (esInvitado ? '✨ Invitado/a' : '💍 Pareja') : '⚡ 3 Amigos / Libres';

  // Si el nivel es Suave (calentamiento con ropa):
  if (nivel === 'suave') {
    const pool = tipo === 'verdad' ? TRIOS_SUAVE.verdad : TRIOS_SUAVE.reto;
    text = pick(pool, `bot_suave_${tipo}`);
  } else if (nivel === 'picante') {
    // Si el nivel es Picante (empieza a salir ropa, besos con lengua):
    const pool = tipo === 'verdad' ? TRIOS_PICANTE_FASE.verdad : TRIOS_PICANTE_FASE.reto;
    text = pick(pool, `bot_picante_${tipo}`);
  } else {
    // Nivel Extremo / Al Límite (retos explícitos según rol y género):
    if (relacion === 'pareja') {
      if (esInvitado) {
        if (tipo === 'verdad') {
          text = pick(PROMPTS_INVITADO.verdad, 'bot_inv_v');
        } else {
          const pool = esHombre ? PROMPTS_INVITADO.reto_hombre : PROMPTS_INVITADO.reto_mujer;
          text = pick(pool, `bot_inv_r_${esHombre ? 'h' : 'm'}`);
        }
      } else {
        // Es miembro de la pareja
        if (tipo === 'verdad') {
          text = pick(TRIOS_PAREJA.verdad, 'bot_par_v');
        } else {
          if (esHMH && esHombre) {
            text = pick(RETOS_HOMBRE_HMH.pareja, 'bot_par_r_h');
          } else {
            text = pick(TRIOS_PAREJA.reto, 'bot_par_r');
          }
        }
      }
    } else {
      // 3 Amigos / Libres
      if (tipo === 'verdad') {
        text = pick(TRIOS_AMIGOS.verdad, 'bot_amg_v');
      } else {
        if (esHMH && esHombre) {
          text = pick(RETOS_HOMBRE_HMH.amigos, 'bot_amg_r_h');
        } else {
          // Para mujeres o tríos del mismo sexo: lista completa de amigos
          text = pick(TRIOS_AMIGOS.reto, 'bot_amg_r');
        }
      }
    }
  }

  // Interpolar nombres
  const parejaNombre = parejaObj ? nombre(parejaObj) : 'tu pareja';
  const invNombre = invitadoObj ? nombre(invitadoObj) : 'el invitado';
  const otros = norm.filter((j) => j.name.toLowerCase() !== elNombre.toLowerCase());
  const otro1 = otros[0] ? nombre(otros[0]) : 'otra persona';
  const otro2 = otros[1] ? nombre(otros[1]) : 'el tercero';

  text = (text || '')
    .replaceAll('{m}', mName)
    .replaceAll('{pareja}', parejaNombre)
    .replaceAll('{invitado}', invNombre)
    .replaceAll('{n}', elNombre)
    .replaceAll('{o}', otro1)
    .replaceAll('{p}', otro2);

  return {
    text,
    jugador: elNombre,
    gen: elObj.gen,
    roleLabel,
    nivel,
  };
}

export function getComposicion(jugadores = []) {
  const norm = Array.isArray(jugadores) ? jugadores.map((j) => (typeof j === 'string' ? { name: j, gen: 'x' } : j)) : [];
  const mujeres = norm.filter((j) => j.gen === 'm');
  const hombres = norm.filter((j) => j.gen === 'h');

  if (hombres.length >= 2 && mujeres.length >= 1) {
    return {
      tipo: 'HMH',
      badge: '2H + 1M (HMH)',
      label: '2 Hombres + 1 Mujer',
      m: mujeres[0],
      h1: hombres[0],
      h2: hombres[1],
      hombres,
      mujeres,
    };
  }
  if (mujeres.length >= 2 && hombres.length >= 1) {
    return {
      tipo: 'MHM',
      badge: '2M + 1H (MHM)',
      label: '2 Mujeres + 1 Hombre',
      h: hombres[0],
      m1: mujeres[0],
      m2: mujeres[1],
      hombres,
      mujeres,
    };
  }
  if (hombres.length >= 3) {
    return { tipo: 'HHH', badge: '3 Hombres (HHH)', label: '3 Hombres', hombres, mujeres };
  }
  if (mujeres.length >= 3) {
    return { tipo: 'MMM', badge: '3 Mujeres (MMM)', label: '3 Mujeres', hombres, mujeres };
  }
  return { tipo: 'MIX', badge: 'Trío Mixto', label: 'Trío Mixto', hombres, mujeres };
}

function poolFor(nivelId, tipo, turno) {
  const p = PROMPTS.picante[tipo] || [];
  const e = PROMPTS.extremo[tipo] || [];
  if (nivelId === 'mezcla') return [...p, ...e];
  if (nivelId === 'progresivo') return turno < 3 ? [...p] : [...p, ...e];
  return PROMPTS[nivelId]?.[tipo] || p;
}

export function buildPrompt(nivelId, tipo, jugadores = [], turno = 0, relacion = 'pareja') {
  const norm = Array.isArray(jugadores) ? jugadores.map((j) => (typeof j === 'string' ? { name: j, gen: 'x' } : j)) : [];
  const comp = getComposicion(jugadores);
  
  // Si se juega en modo específico Pareja o Amigos, enriquecemos con los prompts directos
  if (relacion === 'pareja' || relacion === 'solteros') {
    const elegido = norm[turno % (norm.length || 1)] || { name: 'Alguien', gen: 'x' };
    return buildBotellaPrompt(elegido, tipo, jugadores, relacion);
  }

  const rawItem = pick(poolFor(nivelId, tipo, turno), `${nivelId}:${tipo}`);
  const isObj = typeof rawItem === 'object' && rawItem !== null;
  let text = isObj ? rawItem.text : rawItem;
  const role = isObj ? rawItem.role : 'cualquiera';

  let jugador = null;
  let roleLabel = 'LE TOCA A';

  if (role === 'todos') {
    jugador = { name: 'Los tres juntos', gen: 'x' };
    roleLabel = 'PARA LOS TRES';
  } else if (role === 'mujer') {
    if (comp.m) {
      jugador = comp.m;
    } else if (comp.m1) {
      jugador = comp.m1;
    } else {
      const [nCand, , , nObj] = pickTrio(jugadores, tipo === 'reto', 'm');
      jugador = nObj || { name: nCand, gen: 'm' };
    }
    roleLabel = 'RETO DE LA MUJER · LE TOCA A';
  } else {
    const [nCand, , , nObj] = pickTrio(jugadores, tipo === 'reto');
    jugador = nObj || { name: nCand, gen: 'x' };
    roleLabel = 'LE TOCA A';
  }

  const mName = comp.m?.name || comp.m1?.name || (norm.find((j) => j.gen === 'm')?.name) || jugador?.name || 'la mujer';
  const h1Name = comp.h1?.name || comp.h?.name || (norm.find((j) => j.gen === 'h')?.name) || 'el primer hombre';
  const h2Name = comp.h2?.name || (norm.filter((j) => j.gen === 'h')[1]?.name) || 'el segundo hombre';

  let n = jugador?.name || (norm[0]?.name) || 'alguien';
  let otros = norm.filter((j) => j.name !== n);
  let o = otros[0]?.name || 'otra persona';
  let p = otros[1]?.name || 'el tercero';

  text = text
    .replaceAll('{m}', mName)
    .replaceAll('{h1}', h1Name)
    .replaceAll('{h2}', h2Name)
    .replaceAll('{no}', `${o} y ${p}`)
    .replaceAll('{n}', n)
    .replaceAll('{o}', o)
    .replaceAll('{p}', p)
    .replaceAll('{mojado/duro}', jugador?.gen === 'm' ? 'mojada' : 'duro')
    .replaceAll('{el/la}', jugador?.gen === 'm' ? 'la' : 'el');

  return {
    text,
    jugador,
    roleLabel,
    composicion: comp,
    toString() {
      return this.text;
    },
  };
}

export const contentStats = () =>
  NIVELES.map((nv) => ({
    ...nv,
    verdad: PROMPTS[nv.id]?.verdad?.length || 0,
    reto: PROMPTS[nv.id]?.reto?.length || 0,
  }));

export const totalPrompts = () =>
  contentStats().reduce((s, n) => s + n.verdad + n.reto, 0) + BOTELLA_RETOS.length;
