// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: false },

  // App configuration for base URL
  app: {
    baseURL: '/panel/',
    buildAssetsDir: '/_nuxt/',
  },

  modules: ['@nuxtjs/tailwindcss', "@nuxt/icon", '@nuxtjs/color-mode'],
  
  css: ['~/assets/css/main.css'],
  
  plugins: [
    '~/plugins/pinia',
    '~/plugins/vue3-toastify'
  ],
  
  colorMode: {
    preference: 'system',
    fallback: 'light',
    classSuffix: '',
  },
  
  tailwindcss: {
    configPath: '~/tailwind.config.ts',
  },
  
  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || 'https://api.daartads.com/api/v1',
    },
  },
  
  // Nitro configuration for production
  nitro: {
    preset: 'node-server',
    baseURL: '/panel/',
    serveStatic: true,
    output: {
      publicDir: 'dist',
      serverDir: 'server',
    },
    // Ensure proper routing
    routeRules: {
      '/**': { proxy: { to: '/panel/**' } }
    }
  },
  
  // Enable SPA fallback for proper routing
  ssr: true,
  
  // Router configuration
  router: {
    options: {
      strict: false
    }
  },
  
  // Build configuration
  build: {
    transpile: ['@pinia/nuxt'],
  },
})