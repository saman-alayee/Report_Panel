// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: false },

  modules: ['@nuxtjs/tailwindcss', "@nuxt/icon"],
  css: ['~/assets/css/main.css'],
  plugins: [
    '~/plugins/pinia','~/plugins/vue3-toastify'
  ],

})