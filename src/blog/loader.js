import { marked } from 'marked';

// Carga todos los .md de posts/ en el build
const files = import.meta.glob('./posts/*.md', { query: '?raw', import: 'default', eager: true });

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
      val = val.replace(/^['"]|['"]$/g, '');
    }
    data[key] = val;
  });
  return { data, body: m[2] };
}

export const POSTS = Object.entries(files)
  .map(([path, raw]) => {
    const slug = path.split('/').pop().replace(/\.md$/, '');
    const { data, body } = parseFrontmatter(raw);
    return {
      slug,
      title: data.title || slug,
      description: data.description || '',
      emoji: data.emoji || '📝',
      date: data.date || '',
      read: data.read || '5',
      tags: Array.isArray(data.tags) ? data.tags : [],
      hero: data.hero || data.description || '',
      html: marked.parse(body),
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
