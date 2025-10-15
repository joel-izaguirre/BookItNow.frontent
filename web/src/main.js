import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createI18n } from 'vue-i18n'
import { Clerk } from '@clerk/vue'

import App from './App.vue'
import router from './router'

// Import translations
import es from './i18n/locales/es.json'
import en from './i18n/locales/en.json'

// Import styles
import './assets/main.css'

// Configure i18n
const i18n = createI18n({
  locale: 'es',
  fallbackLocale: 'en',
  messages: {
    es,
    en
  }
})

// Configure Clerk
const clerkPublishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(i18n)
app.use(Clerk, {
  publishableKey: clerkPublishableKey
})

app.mount('#app')

