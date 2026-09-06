import React from 'react';
import { Head } from 'vite-react-ssg';
import { SITE_URL } from '../lib/ui';

/**
 * Metadatos por página (title, description, canonical, Open Graph).
 * `path` es la ruta absoluta desde la raíz, ej. "/botella-borracha-online".
 */
export default function Seo({ title, description, path = '/' }) {
  const url = SITE_URL + (path === '/' ? '/' : path);
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta name="twitter:card" content="summary_large_image" />
    </Head>
  );
}
