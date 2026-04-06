import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router/index.js'
import { createPinia } from 'pinia'

import { lazyPlugin } from './directives'
import { componentPlugin } from './components'

import './styles/common.scss'
import './assets/iconfont/iconfont.css'

createApp(App)
.use(createPinia())
.use(router)
.use(lazyPlugin)
.use(componentPlugin)
.mount('#app')
