import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import { createI18n } from 'vue-i18n'

// 导入语言包
import zhCN from './locales/zh.json'
import enUS from './locales/en.json'

// 导入全局样式
import './styles/global.css'
import './styles/responsive.css'

// 创建i18n实例
const i18n = createI18n({
  legacy: false, // 启用Composition API模式
  locale: 'zh-CN', // 默认语言
  fallbackLocale: 'zh-CN',
  messages: {
    'zh-CN': zhCN,
    'en-US': enUS
  }
})

// 创建Pinia实例
const pinia = createPinia()

// 创建Vue应用
const app = createApp(App)

// 使用插件
app.use(router)
app.use(i18n)
app.use(pinia)

// 挂载应用
app.mount('#app') 