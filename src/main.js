import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router/index.js'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import { lazyPlugin } from './directives'
import { componentPlugin } from './components'

import './styles/common.scss'
import './assets/iconfont/iconfont.css'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

createApp(App)
.use(pinia)
.use(router)
.use(lazyPlugin)
.use(componentPlugin)
.mount('#app')
