import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import store from './store'
import vue3TreeOrg from 'vue3-tree-org'
//import 'vue3-tree-org/lib/vue3-tree-org.css'
import 'animate.css/animate.min.css'
import '@/style/global.less'
import { indicatorRecords} from '@/js/visitor.js'
import * as ElIconModules from '@element-plus/icons-vue'

const app = createApp(App)
for (const [key, component] of Object.entries(ElIconModules)) {
    app.component(key, component)
}
router.afterEach((to, from, next) => {
    //pv记录
    indicatorRecords(to);
})
app.use(vue3TreeOrg).use(store).use(ElementPlus).use(router).mount('#app')
