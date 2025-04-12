// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite';

export default defineNuxtConfig({
  devtools: { enabled: true },

  // Runtime config
  runtimeConfig: {
    // Keys within public will be exposed to the client
    public: {
      // Public config here
      alphaVantageApiKey: process.env.NUXT_ALPHA_VANTAGE_API_KEY || '', // Expose Alpha Vantage API key to client
      finnhubApiKey: process.env.NUXT_FINNHUB_API_KEY || 'cvsttqhr01qhup0t27agcvsttqhr01qhup0t27b0', // Expose Finnhub API key to client
    },
    // Private keys only available on the server
    alphaVantageApiKey: process.env.NUXT_ALPHA_VANTAGE_API_KEY || '', // Alpha Vantage API key
    finnhubApiKey: process.env.NUXT_FINNHUB_API_KEY || 'cvsttqhr01qhup0t27agcvsttqhr01qhup0t27b0', // Finnhub API key
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
    transpile: ['primevue']
  },

  vite: {
    plugins: [
      tailwindcss(),
    ],
  },

  app: {
    head: {
      title: 'FinHack - Modern Financial Solutions',
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