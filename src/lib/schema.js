import { SITE_URL } from './ui';

const ORG = {
  '@type': 'Organization',
  name: 'Glup Juegos',
  url: SITE_URL + '/',
  logo: SITE_URL + '/pwa-512x512.png',
};

export const websiteSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Glup Juegos',
  url: SITE_URL + '/',
  inLanguage: 'es',
  publisher: ORG,
});

// Página de un juego → WebApplication (categoría juego)
export const gameSchema = (game, path) => ({
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: `${game.title} online`,
  url: SITE_URL + path,
  description: game.seo,
  applicationCategory: 'GameApplication',
  operatingSystem: 'Web',
  browserRequirements: 'Requiere un navegador moderno',
  isAccessibleForFree: true,
  inLanguage: 'es',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  aggregateRating: game.rating && game.rating !== '—'
    ? { '@type': 'AggregateRating', ratingValue: game.rating, ratingCount: 40, bestRating: '5' }
    : undefined,
  publisher: ORG,
});

export const breadcrumbSchema = (items) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((it, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: it.name,
    item: SITE_URL + it.path,
  })),
});

export const articleSchema = (post, path) => ({
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: post.title,
  description: post.description,
  url: SITE_URL + path,
  datePublished: post.date,
  dateModified: post.updated || post.date,
  inLanguage: 'es',
  author: { '@type': 'Organization', name: 'Equipo de Glup' },
  publisher: ORG,
  articleSection: post.category,
  image: SITE_URL + '/og.png',
});

export const faqSchema = (faq) =>
  faq && faq.length
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faq.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      }
    : null;
