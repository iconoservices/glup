import sharp from 'sharp';
import { readdirSync, readFileSync, mkdirSync, existsSync } from 'node:fs';

const COLORS = {
  Pareja: '#ff2e88',
  Fiesta: '#ffce3a',
  Grupos: '#b06bff',
  'Verdad o Reto': '#ff2e88',
  'Tríos': '#a15cff',
  Swinger: '#14b6a8',
  Guía: '#1fa8ff',
};

// Carpeta donde dejar fotos reales: assets/blog-covers/<slug>.jpg|png
// Si existe, se usa esa (recortada a 1200x675) en vez de la portada generada.
const PHOTO_DIR = 'assets/blog-covers';

function fm(raw) {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  const d = {};
  if (m) m[1].split(/\r?\n/).forEach((l) => {
    const i = l.indexOf(':');
    if (i > -1) d[l.slice(0, i).trim()] = l.slice(i + 1).trim().replace(/^['"]|['"]$/g, '');
  });
  return d;
}

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// Hash simple y estable a partir del slug → cada portada sale distinta.
function hash(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 16777619); }
  return () => { h = Math.imul(h ^ (h >>> 15), 2246822507); h = Math.imul(h ^ (h >>> 13), 3266489909); return ((h ^= h >>> 16) >>> 0) / 4294967296; };
}

function mix(hex, other, t) {
  const p = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
  const [r1, g1, b1] = p(hex.length === 4 ? '#' + [...hex.slice(1)].map((c) => c + c).join('') : hex);
  const [r2, g2, b2] = p(other);
  const c = (a, b) => Math.round(a + (b - a) * t).toString(16).padStart(2, '0');
  return `#${c(r1, r2)}${c(g1, g2)}${c(b1, b2)}`;
}

function generatedCover(slug, category) {
  const accent = COLORS[category] || '#1fa8ff';
  const cat = (category || 'Guía').toUpperCase();
  const catSize = Math.min(150, Math.floor(1050 / (cat.length * 0.62)));
  const rnd = hash(slug);

  const angle = Math.floor(rnd() * 360);
  const accent2 = mix(accent, '#0b0f18', 0.35 + rnd() * 0.3);
  const gx = Math.floor(15 + rnd() * 70);
  const gy = Math.floor(15 + rnd() * 70);
  const catY = Math.floor(300 + rnd() * 160);
  const catX = Math.floor(40 + rnd() * 90);

  // 3-5 formas decorativas sembradas por el slug
  let shapes = '';
  const n = 3 + Math.floor(rnd() * 3);
  for (let i = 0; i < n; i++) {
    const cx = Math.floor(rnd() * 1200);
    const cy = Math.floor(rnd() * 675);
    const r = Math.floor(90 + rnd() * 320);
    const light = rnd() > 0.5;
    shapes += `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${light ? '#ffffff' : '#0b0f18'}" fill-opacity="${(0.04 + rnd() * 0.09).toFixed(3)}"/>`;
  }

  const svg = `<svg width="1200" height="675" viewBox="0 0 1200 675" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bg" gradientTransform="rotate(${angle} 0.5 0.5)">
        <stop offset="0%" stop-color="${accent}" stop-opacity="0.6"/>
        <stop offset="55%" stop-color="${accent2}" stop-opacity="0.9"/>
        <stop offset="100%" stop-color="#0b0f18"/>
      </linearGradient>
      <radialGradient id="glow" cx="${gx}%" cy="${gy}%" r="70%">
        <stop offset="0%" stop-color="${accent}" stop-opacity="0.45"/>
        <stop offset="100%" stop-color="${accent}" stop-opacity="0"/>
      </radialGradient>
    </defs>
    <rect width="1200" height="675" fill="#0b0f18"/>
    <rect width="1200" height="675" fill="url(#bg)"/>
    <rect width="1200" height="675" fill="url(#glow)"/>
    ${shapes}
    <text x="${catX}" y="${catY}" font-family="Arial Black, Arial, Helvetica, sans-serif" font-size="${catSize}" font-weight="900" fill="#ffffff" fill-opacity="0.9" letter-spacing="1">${esc(cat)}</text>
  </svg>`;

  return sharp(Buffer.from(svg));
}

mkdirSync('public/blog', { recursive: true });

const files = readdirSync('src/blog/posts').filter((f) => f.endsWith('.md'));
for (const f of files) {
  const slug = f.replace(/\.md$/, '');
  const d = fm(readFileSync('src/blog/posts/' + f, 'utf8'));
  const out = `public/blog/cover-${slug}.jpg`;

  const photo = ['jpg', 'jpeg', 'png', 'webp']
    .map((ext) => `${PHOTO_DIR}/${slug}.${ext}`)
    .find((p) => existsSync(p));

  if (photo) {
    await sharp(photo).resize(1200, 675, { fit: 'cover', position: 'attention' }).jpeg({ quality: 84 }).toFile(out);
    console.log(`cover-${slug}.jpg  (foto: ${photo})`);
  } else {
    await generatedCover(slug, d.category).jpeg({ quality: 82 }).toFile(out);
    console.log(`cover-${slug}.jpg  (generada)`);
  }
}
