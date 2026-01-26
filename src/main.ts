import 'temporal-polyfill/global'

import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router/router'
import './style.css'

const pinia = createPinia()

createApp(App).use(router).use(pinia).mount('#app')
