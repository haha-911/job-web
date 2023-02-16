import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'element-plus/dist/index.css'
import 'normalize.css'
import './assets/css/base.css'
import eventBus from 'vue3-eventbus'
import router from './router'



const app = createApp(App)

app.use(eventBus)


app.use(ElementPlus,{
    locale: zhCn,
  })

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }

// 使用路由钩子函数修改网页title
router.beforeEach((to,form,next)=>{
    if (to.meta.title) {
        document.title = to.meta.title
       } else {
        document.title = '求职招聘网'
       }
    next()
})

app.use(router).mount('#app')
