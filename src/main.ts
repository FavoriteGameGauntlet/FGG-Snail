import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router/router'
import './style.css'
import { persistentStorage, StoreKey } from './services/persistentStorage'

const pinia = createPinia()

createApp(App).use(router).use(pinia).mount('#app')

Object.defineProperty(window, 'persistentStorage', {
	get: () => persistentStorage,
})
