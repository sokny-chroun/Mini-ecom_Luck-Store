import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import ConfirmDialog from "@/components/ui/ConfirmDialog.vue";

console.log('🚀 Starting Vue app...')

const app = createApp(App)
const pinia = createPinia()

// Use Pinia before router
app.use(pinia)
app.use(router)
app.component('ConfirmDialog', ConfirmDialog);

// Mount the app
app.mount('#app')

console.log('✅ App mounted with Pinia & Router')