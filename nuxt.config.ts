// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  modules: [
    '@nuxt/eslint',
    '@nuxt/scripts',
    '@nuxt/icon',
    '@ant-design-vue/nuxt',
    '@nuxtjs/supabase',
    '@nuxtjs/tailwindcss',
  ],
  supabase: {
    url: process.env.SUPABASE_URL,
    key: process.env.SUPABASE_KEY,
    redirect: false,
    useSsrCookies: true,
    redirectOptions: {
      login: '/login',
      callback: '/confirm',
      exclude: ['/', '/signup']
    }

  },
  
})
