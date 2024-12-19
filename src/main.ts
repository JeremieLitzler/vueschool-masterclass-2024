import './assets/index.css'
import 'iconify-icon'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { plugin } from '@formkit/vue'
import defaultConfig from '../formkit.config'
import App from './App.vue'
import router from './router'
import { createMetaManager } from 'vue-meta'
const app = createApp(App)

app.use(createPinia())
app.use(router)
// TODO > adding formKit
app.use(plugin, defaultConfig)
// TODO > adding useMeta support
app.use(createMetaManager())

// TODO > adding a custom handler
app.config.errorHandler = (error) => {
  console.error(error)
}

app.mount('#app')
