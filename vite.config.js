import { writeFileSync } from 'node:fs'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import { GAMES, CATEGORIES } from './src/catalog.js'

const SITE = 'https://glup.bogahub.app'

function buildSitemap() {
  const paths = [
    '/',
    '/glup',
    ...CATEGORIES.map((c) => `/glup/${c.id}`),
    ...GAMES.map((g) => `/glup/${g.slug}`),
    '/verdad-o-reto-18',
    '/verdad-o-reto-18/contenido',
  ]
  const urls = paths
    .map((p) => `  <url><loc>${SITE}${p}</loc><changefreq>weekly</changefreq><priority>${p === '/' ? '1.0' : '0.8'}</priority></url>`)
    .join('\n')
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
}

// https://vite.dev/config/
export default defineConfig({
  ssgOptions: {
    formatting: 'minify',
    onFinished() {
      writeFileSync('dist/sitemap.xml', buildSitemap())
    },
  },
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'favicon.svg', 'apple-touch-icon-180x180.png'],
      workbox: {
        cleanupOutdatedCaches: true,
        clientsClaim: true,
        skipWaiting: true,
        // No precachear los HTML: así una versión nueva siempre llega fresca
        // de la red y no se queda una pantalla vieja pegada tras un deploy.
        globPatterns: ['**/*.{js,css,woff2,woff,ttf,png,svg,ico,webmanifest}'],
        navigateFallback: null,
        runtimeCaching: [
          {
            urlPattern: ({ request }) => request.mode === 'navigate',
            handler: 'NetworkFirst',
            options: {
              cacheName: 'paginas',
              networkTimeoutSeconds: 4,
              expiration: { maxEntries: 40, maxAgeSeconds: 60 * 60 * 24 * 7 },
            },
          },
        ],
      },
      manifest: {
        name: 'Glup! — Juegos para beber, parejas y grupos',
        short_name: 'Glup!',
        description: 'Juegos para la previa, juegos eróticos para parejas y retos para grupos. Gratis y sin descargar.',
        lang: 'es',
        theme_color: '#0b0f18',
        background_color: '#0b0f18',
        display: 'standalone',
        orientation: 'portrait',
        categories: ['games', 'entertainment'],
        icons: [
          { src: 'pwa-64x64.png', sizes: '64x64', type: 'image/png' },
          { src: 'pwa-192x192.png', sizes: '192x192', type: 'image/png' },
          { src: 'pwa-512x512.png', sizes: '512x512', type: 'image/png' },
          { src: 'maskable-icon-512x512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' }
        ]
      }
    })
  ],
  server: {
    port: 3060,
    host: '0.0.0.0'
  }
})
