import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import router from './router'
import store from './store'
import jwRequest from './service'

createApp(App).use(router).use(store).mount('#app')

type DataType = {
  data: any
  returnCode: string
  success: boolean
}

jwRequest
  .request<DataType>({
    url: '/home/multidata',
    method: 'GET',
    showLoading: false,
    interceptors: {
      requestInterceptor: (config) => {
        console.log('单独请求的config')
        return config
      },
      responseInterceptor: (res) => {
        console.log('单独响应的res')
        return res
      }
    }
  })
  .then((res) => {
    console.log('res.data', res.data)
    console.log('res.returnCode', res.returnCode)
    console.log('res.success', res.success)
  })

jwRequest
  .get<DataType>({
    url: '/home/multidata',
    showLoading: false
  })
  .then((res) => {
    console.log('res.data', res.data)
    console.log('res.returnCode', res.returnCode)
    console.log('res.success', res.success)
  })
