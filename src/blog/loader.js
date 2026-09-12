import { marked } from 'marked';
import { REVISTA_BUILD, GAMES_ORIGIN } from '../lib/buildMode';

// Carga todos los .md de posts/ en el build
const files = import.meta.glob('./posts/*.md', { query: '?raw', import: 'default', eager: true });

// Cuando la Revista vive en su propio dominio, los enlaces internos a juegos
// (/glup/..., /verdad-o-reto-18, etc. escritos en las notas) tienen que ser
// absolutos, porque esas rutas no existen en este sitio.
const RUTAS_JUEGOS = /href="\/(glup|verdad-o-reto-18|juegos-para-trios|fiestas-swinger|contenido)/g;
function absolutizarEnlaces(html) {
  if (!REVISTA_BUILD) return html;
  return html.replace(RUTAS_JUEGOS, `href="${GAMES_ORIGIN}/$1`);
}

function parseFrontmatter(raw) {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!m) return { data: {}, body: raw };
  const data = {};
  m[1].split(/\r?\n/).forEach((line) => {
    const i = line.indexOf(':');
    if (i === -1) return;
    const key = line.slice(0, i).trim();
    let val = line.slice(i + 1).trim();
    if (val.startsWith('[') && val.endsWith(']')) {
      val = val.slice(1, -1).split(',').map((s) => s.trim().replace(/^['"]|['"]$/g, '')).filter(Boolean);
    } else {
      val = val.replace(/^['"]|['"]$/g, '').replace(/\\"/g, '"');
    }
    data[key] = val;
  });
  return { data, body: m[2] };
}

// Extrae pares pregunta/respuesta de la sección "Preguntas frecuentes"
function parseFaq(body) {
  const sec = body.split(/^##\s+Preguntas frecuentes\s*$/m)[1];
  if (!sec) return [];
  const stop = sec.search(/^---\s*$|^##\s+/m);
  const chunk = stop > -1 ? sec.slice(0, stop) : sec;
  const faq = [];
  const re = /\*\*(.+?)\*\*\s*\n([\s\S]*?)(?=\n\*\*|\n*$)/g;
  let m;
  while ((m = re.exec(chunk)) !== null) {
    const q = m[1].trim();
    const a = m[2].replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').replace(/\s+/g, ' ').trim();
    if (q && a) faq.push({ q, a });
  }
  return faq;
}

export const POSTS = Object.entries(files)
  .map(([path, raw]) => {
    const slug = path.split('/').pop().replace(/\.md$/, '');
    const { data, body } = parseFrontmatter(raw);
    return {
      slug,
      cover: `/blog/cover-${slug}.jpg`,
      title: data.title || slug,
      description: data.description || '',
      emoji: data.emoji || '📝',
      date: data.date || '',
      updated: data.updated || data.date || '',
      read: data.read || '5',
      category: data.category || 'Guía',
      tags: Array.isArray(data.tags) ? data.tags : [],
      hero: data.hero || data.description || '',
      summary: data.summary || '',
      faq: parseFaq(body),
      html: absolutizarEnlaces(marked.parse(body)),
    };
  })
  .sort((a, b) => (b.date || '').localeCompare(a.date || ''));

export const postBySlug = (slug) => POSTS.find((p) => p.slug === slug);

export const formatDate = (d) => {
  if (!d) return '';
  try {
    return new Date(d + 'T00:00:00').toLocaleDateString('es', { day: 'numeric', month: 'long', year: 'numeric' });
  } catch {
    return d;
  }
};
