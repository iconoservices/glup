import sharp from 'sharp';
import { readdirSync, readFileSync, mkdirSync } from 'node:fs';

const COLORS = {
  Pareja: '#ff2e88',
  Fiesta: '#ffce3a',
  Grupos: '#b06bff',
  'Verdad o Reto': '#ff2e88',
  'Tríos': '#a15cff',
  Swinger: '#14b6a8',
  Guía: '#1fa8ff',
};

function fm(raw) {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  const d = {};
  if (m) m[1].split(/\r?\n/).forEach((l) => {
    const i = l.indexOf(':');
    if (i > -1) d[l.slice(0, i).trim()] = l.slice(i + 1).trim().replace(/^['"]|['"]$/g, '');
  });
  return d;
}

function wrap(text, max) {
  const words = text.split(' ');
  const lines = [];
  let cur = '';
  for (const w of words) {
    if ((cur + ' ' + w).trim().length > max) { lines.push(cur.trim()); cur = w; }
    else cur += ' ' + w;
  }
  if (cur.trim()) lines.push(cur.trim());
  return lines.slice(0, 4);
}

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

mkdirSync('public/blog', { recursive: true });

const files = readdirSync('src/blog/posts').filter((f) => f.endsWith('.md'));
for (const f of files) {
  const slug = f.replace(/\.md$/, '');
  const d = fm(readFileSync('src/blog/posts/' + f, 'utf8'));
  const accent = COLORS[d.category] || '#1fa8ff';
  const cat = (d.category || 'Guía').toUpperCase();
  const catSize = Math.min(148, Math.floor(1050 / (cat.length * 0.62)));

  const svg = `<svg width="1200" height="675" viewBox="0 0 1200 675" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="${accent}" stop-opacity="0.55"/>
        <stop offset="55%" stop-color="${accent}" stop-opacity="0.12"/>
        <stop offset="100%" stop-color="#0b0f18"/>
      </linearGradient>
      <radialGradient id="glow" cx="80%" cy="85%" r="75%">
        <stop offset="0%" stop-color="${accent}" stop-opacity="0.4"/>
        <stop offset="100%" stop-color="${accent}" stop-opacity="0"/>
      </radialGradient>
    </defs>
    <rect width="1200" height="675" fill="#0b0f18"/>
    <rect width="1200" height="675" fill="url(#bg)"/>
    <rect width="1200" height="675" fill="url(#glow)"/>
    <circle cx="1010" cy="150" r="320" fill="#ffffff" fill-opacity="0.05"/>
    <circle cx="180" cy="560" r="230" fill="#0b0f18" fill-opacity="0.3"/>
    <text x="70" y="378" font-family="Arial Black, Arial, Helvetica, sans-serif" font-size="${catSize}" font-weight="900" fill="#ffffff" fill-opacity="0.92" letter-spacing="1">${esc(cat)}</text>
  </svg>`;

  await sharp(Buffer.from(svg)).jpeg({ quality: 82 }).toFile(`public/blog/cover-${slug}.jpg`);
  console.log('cover-' + slug + '.jpg');
}
