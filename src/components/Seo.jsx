import React from 'react';
import { Head } from 'vite-react-ssg';
import { SITE_URL } from '../lib/ui';

/**
 * Metadatos por página (title, description, canonical, Open Graph).
 * `path` es la ruta absoluta desde la raíz.
 */
export default function Seo({ title, description, path = '/', image = '/og.png', type = 'website' }) {
  const url = SITE_URL + (path === '/' ? '/' : path);
  const img = image.startsWith('http') ? image : SITE_URL + image;
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={img} />
      <meta property="og:site_name" content="Glup Juegos" />
      <meta property="og:locale" content="es_ES" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={img} />
    </Head>
  );
}
