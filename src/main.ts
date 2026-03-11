import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router/router'
import { persistentStorage } from './services/persistentStorage'
import { initStores } from './stores/initStores'
import './style.css'

const pinia = createPinia()

createApp(App).use(router).use(pinia).mount('#app')
initStores()

Object.defineProperty(window, 'persistentStorage', {
	get: () => persistentStorage,
})
