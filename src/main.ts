import { createApp } from 'vue'
import App from './App.vue'
import './style.css'

import 'normalize.css'
import './assets/scss/index.scss'

import router from './router'
import store from './store'

import { setupStore } from './store'

// 每次页面重载都会执行这里，获取本地数据保存到vuex
setupStore()

createApp(App).use(router).use(store).mount('#app')
