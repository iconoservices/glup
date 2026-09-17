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

// [n, o] como nombres. fisico = intenta que sean compatibles. targetGen = 'm' | 'h'
export function pickPareja(js = [], fisico = false, targetGen = null) {
  const norm = normalizar(js);
  const pool = norm.length ? norm : [{ name: 'alguien', gen: 'x', con: 'ambos' }, { name: 'otra persona', gen: 'x', con: 'ambos' }];
  
  let nCandidate = null;
  if (targetGen) {
    const matching = pool.filter((j) => j.gen === targetGen);
    if (matching.length > 0) {
      nCandidate = matching[Math.floor(Math.random() * matching.length)];
    }
  }

  const s = shuffle(pool);
  let n = nCandidate || s[0];
  let o = s.find((x) => x !== n) || pool[1] || { name: 'otra persona', gen: 'x', con: 'ambos' };

  if (fisico) {
    for (let i = 0; i < s.length; i++) {
      for (let k = i + 1; k < s.length; k++) {
        if (compatibles(s[i], s[k])) {
          if (!targetGen || s[i].gen === targetGen) {
            n = s[i];
            o = s[k];
            break;
          }
        }
      }
    }
  }
  return [nombre(n), nombre(o), n];
}

// [n, o, p] como nombres. fisico = intenta que n-o sean compatibles. targetGen = 'm' | 'h'
export function pickTrio(js = [], fisico = false, targetGen = null) {
  const norm = normalizar(js);
  const pool = norm.length >= 3 ? norm : [...norm, { name: 'alguien', gen: 'x', con: 'ambos' }, { name: 'otra persona', gen: 'x', con: 'ambos' }, { name: 'el tercero', gen: 'x', con: 'ambos' }];
  
  let nCandidate = null;
  if (targetGen) {
    const matching = pool.filter((j) => j.gen === targetGen);
    if (matching.length > 0) {
      nCandidate = matching[Math.floor(Math.random() * matching.length)];
    }
  }

  const s = shuffle(pool);
  let n = nCandidate || s[0];
  let remaining = s.filter((x) => x !== n);
  let o = remaining[0] || pool[0];
  let p = remaining[1] || pool[1];

  return [nombre(n), nombre(o), nombre(p), n];
}
