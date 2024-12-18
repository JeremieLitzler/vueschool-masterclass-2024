import './assets/index.css'
import 'iconify-icon'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { plugin } from '@formkit/vue'
import defaultConfig from '../formkit.config'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
// formKit
app.use(plugin, defaultConfig)

app.config.errorHandler = (error) => console.error(error)

app.mount('#app')
