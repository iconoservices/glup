import { writeFileSync } from 'node:fs'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import { GAMES, CATEGORIES } from './src/catalog.js'

const SITE = 'https://glup.bogahub.app'

function buildSitemap() {
  const paths = ['/', ...CATEGORIES.map((c) => `/${c.id}`), ...GAMES.map((g) => `/${g.slug}`)]
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
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg'],
      manifest: {
        name: 'Glup! — Juegos para beber, parejas y grupos',
        short_name: 'Glup!',
        description: 'Juegos para la previa, juegos eróticos para parejas y retos para grupos. Gratis y sin descargar.',
        theme_color: '#150a10',
        background_color: '#150a10',
        display: 'standalone',
        orientation: 'portrait',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      }
    })
  ],
  server: {
    port: 3060,
    host: '0.0.0.0'
  }
})
