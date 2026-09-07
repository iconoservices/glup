// Modelo de jugador: { name, gen, con }
//   gen: 'h' hombre · 'm' mujer · 'x' sin especificar
//   con: 'h' · 'm' · 'ambos'   (con quién acepta retos de contacto)

export const GEN_OPCIONES = [
  { id: 'h', label: 'Hombre' },
  { id: 'm', label: 'Mujer' },
  { id: 'x', label: 'Prefiero no decir' },
];

export const CON_OPCIONES = [
  { id: 'h', label: 'Hombres' },
  { id: 'm', label: 'Mujeres' },
  { id: 'ambos', label: 'Ambos' },
];

export const nombre = (j) => (typeof j === 'string' ? j : (j && j.name) || '');
export const nombres = (js = []) => js.map(nombre);

export const normalizar = (js = []) =>
  js.map((j) => (typeof j === 'string' ? { name: j, gen: 'x', con: 'ambos' } : { gen: 'x', con: 'ambos', ...j }));

// ¿A y B pueden hacer un reto de contacto entre ellos?
export function compatibles(a, b) {
  if (!a || !b || a === b) return false;
  const ga = typeof a === 'string' ? 'x' : a.gen || 'x';
  const gb = typeof b === 'string' ? 'x' : b.gen || 'x';
  const ca = typeof a === 'string' ? 'ambos' : a.con || 'ambos';
  const cb = typeof b === 'string' ? 'ambos' : b.con || 'ambos';
  const ok = (con, gen) => con === 'ambos' || gen === 'x' || con === gen;
  return ok(ca, gb) && ok(cb, ga);
}

const shuffle = (arr) => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

// [n, o] como nombres. fisico = intenta que sean compatibles.
export function pickPareja(js = [], fisico = false) {
  const pool = js.length ? js : ['alguien', 'otra persona'];
  const s = shuffle(pool);
  if (fisico) {
    for (let i = 0; i < s.length; i++) {
      for (let k = i + 1; k < s.length; k++) {
        if (compatibles(s[i], s[k])) return [nombre(s[i]), nombre(s[k])];
      }
    }
  }
  return [nombre(s[0]), nombre(s[1] ?? 'alguien del grupo')];
}

// [n, o, p] como nombres. fisico = intenta que n-o sean compatibles.
export function pickTrio(js = [], fisico = false) {
  const pool = js.length >= 3 ? js : [...js, 'alguien', 'otra persona', 'el tercero'];
  const s = shuffle(pool);
  let n = s[0];
  let o = s[1];
  if (fisico) {
    let hallado = false;
    for (let i = 0; i < s.length && !hallado; i++) {
      for (let k = 0; k < s.length && !hallado; k++) {
        if (i !== k && compatibles(s[i], s[k])) {
          n = s[i];
          o = s[k];
          hallado = true;
        }
      }
    }
  }
  const p = s.find((x) => x !== n && x !== o) || s[2] || 'el tercero';
  return [nombre(n), nombre(o), nombre(p)];
}
