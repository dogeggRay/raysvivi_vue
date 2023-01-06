import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import store from './store'
import 'animate.css/animate.min.css'

import * as ElIconModules from '@element-plus/icons-vue'

const app = createApp(App)
for (const [key, component] of Object.entries(ElIconModules)) {
    app.component(key, component)
}

app.use(store).use(ElementPlus).use(router).mount('#app')
