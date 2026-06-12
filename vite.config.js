import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['*.png', '*.jpg', '*.webp', '*.svg', '*.ico'],
      manifest: {
        name: 'أوقات الصلاة — Azan Prayer Times',
        short_name: 'أوقات الصلاة',
        description: 'Real-time Islamic prayer times for cities worldwide. Fajr, Dhuhr, Asr, Maghrib, Isha with Hijri calendar and countdown.',
        theme_color: '#107C10',
        background_color: '#107C10',
        display: 'standalone',
        orientation: 'portrait-primary',
        scope: '/',
        start_url: '/',
        lang: 'ar',
        dir: 'rtl',
        categories: ['lifestyle', 'utilities'],
        icons: [
          {
            src: '/azan-modified.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any maskable',
          },
          {
            src: '/adzan-prayer-mic-call-muslim-islam-mosque-512.webp',
            sizes: '512x512',
            type: 'image/webp',
            purpose: 'any maskable',
          },
        ],
        shortcuts: [
          {
            name: 'أوقات اليوم',
            short_name: 'اليوم',
            url: '/',
            description: 'View today\'s prayer times',
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,webp,jpg,woff2}'],
        cleanupOutdatedCaches: true,
        skipWaiting: true,
        clientsClaim: true,
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/api\.aladhan\.com\/.*/i,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'aladhan-api',
              expiration: { maxEntries: 20, maxAgeSeconds: 3600 },
              networkTimeoutSeconds: 8,
            },
          },
          {
            urlPattern: /^https:\/\/fonts\.(googleapis|gstatic)\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts',
              expiration: { maxEntries: 10, maxAgeSeconds: 60 * 60 * 24 * 365 },
            },
          },
        ],
      },
      devOptions: { enabled: false },
    }),
  ],
  server: {
    host: '0.0.0.0',
    port: 5000,
    allowedHosts: true,
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          mui: ['@mui/material', '@mui/icons-material'],
          utils: ['axios', 'moment', 'moment-timezone'],
        },
      },
    },
  },
})
