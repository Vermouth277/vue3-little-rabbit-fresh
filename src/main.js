import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router/index.js'
import { createPinia } from 'pinia'

import { lazyPlugin } from './directives'

import './styles/common.scss'

createApp(App)
.use(createPinia())
.use(router)
.use(lazyPlugin)
.mount('#app')
