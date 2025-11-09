import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router/router'
import { createPinia } from 'pinia'
import './style.css'

import axios from 'axios'
import { API_URL } from './constants/apiUrl'

axios.defaults.baseURL = API_URL

const pinia = createPinia()

createApp(App).use(router).use(pinia).mount('#app')
