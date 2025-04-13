// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite';

export default defineNuxtConfig({
  devtools: { enabled: true },

  // Runtime config
  runtimeConfig: {
    // Server-only secrets
    redisUrl: process.env.REDIS_URL || '',
    jwtSecret: process.env.JWT_SECRET || 'default_development_secret',

    // Public variables accessible on client side
    public: {
      apiBaseUrl: process.env.API_BASE_URL || '/api',
    }
  },

  routeRules: {
    // Fix manifest-route-rule middleware conflict by setting override to true
    '/**': { middlewareOptions: { 'manifest-route-rule': { override: true } } } as any
  },

  modules: [
    '@pinia/nuxt',
    '@nuxt/content',
    '@nuxt/image',
    '@vueuse/nuxt',
    'nuxt-icon',
    ['@nuxtjs/color-mode', {
      preference: 'dark',
      fallback: 'dark',
      classSuffix: '',
    }],
    'shadcn-nuxt',
  ],

  css: [
    '~/assets/css/tailwind.css',
    '~/assets/css/transitions.css',
    'primevue/resources/themes/aura-light-blue/theme.css',
  ],

  build: {
    transpile: ['primevue', 'chart.js', 'chart.js/auto']
  },

  vite: {
    plugins: [
      tailwindcss(),
    ],
    build: {
      rollupOptions: {
        // Removed external: ['chart.js/auto'] to fix Vercel deployment issue
      }
    },
  },

  app: {
    head: {
      title: 'FinCrack - Modern Financial Solutions',
      meta: [
        { name: 'description', content: 'Advanced financial management platform for modern investors and traders' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Gugi&display=swap' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Varela+Round&display=swap' }
      ]
    },
    pageTransition: {
      name: 'page',
      mode: 'default',
      appear: true
    }
  },

  compatibilityDate: '2025-04-10'
})