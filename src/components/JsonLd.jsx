import React from 'react';
import { Head } from 'vite-react-ssg';

// Inyecta uno o varios bloques JSON-LD en el <head>.
export default function JsonLd({ data }) {
  const list = (Array.isArray(data) ? data : [data]).filter(Boolean);
  return (
    <Head>
      {list.map((d, i) => (
        <script key={i} type="application/ld+json">{JSON.stringify(d)}</script>
      ))}
    </Head>
  );
}
