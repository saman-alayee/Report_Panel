// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: false },

  modules: ['@nuxtjs/tailwindcss', "@nuxt/icon", '@nuxtjs/color-mode'],
  css: ['~/assets/css/main.css'],
  plugins: [
    '~/plugins/pinia','~/plugins/vue3-toastify'
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
      apiBase: process.env.NUXT_PUBLIC_API_BASE || 'http://localhost:5000/api',
    },
  },
})