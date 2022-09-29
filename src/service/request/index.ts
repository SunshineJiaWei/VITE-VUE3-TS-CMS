// 在这个类对axios进行封装 - 类比函数封装性更强
import axios from 'axios'
import type { AxiosInstance } from 'axios'
import { JWRequestInterceptors, JWRequestConfig } from './type'

const DEFAULT_LOADING = false

class JWRequest {
  instance: AxiosInstance
  interceptors?: JWRequestInterceptors
  showLoading: boolean
  loading?: any

  constructor(config: JWRequestConfig) {
    this.instance = axios.create(config)
    this.interceptors = config.interceptors
    this.showLoading = config.showLoading ?? DEFAULT_LOADING

    // 从传入config中取出的拦截器是对应实例的拦截器
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    )

    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    )

    // 添加所有的实例都有的拦截器
    this.instance.interceptors.request.use(
      (config) => {
        if (this.showLoading) {
          // ts不知道如何declear这个ElLoading
          this.loading = ElLoading.service({
            lock: true,
            text: '正在请求数据...',
            background: 'rgba(0,0,0,0.5)'
          })
        }
        console.log('所有实例都有的拦截器：请求拦截成功')
        return config
      },
      (err) => {
        console.log('所有实例都有的拦截器：请求拦截失败')
        return err
      }
    )

    this.instance.interceptors.response.use(
      (res) => {
        console.log('所有实例都有的拦截器：响应拦截成功')
        const data = res.data
        if (data.returnCode === '-1001') {
          console.log('请求失败，错误信息')
        } else {
          this.loading?.close()
          return data
        }
        return res.data
      },
      (err) => {
        console.log('所有实例都有的拦截器：响应拦截失败')
        this.loading?.close()
        // 判断不同的httpErrorCode显示不同的错误信息
        if (err.response.status === '404') {
          console.log('404错误~， 真实开发应该用switch判断')
        }
        return err
      }
    )
  }

  // 封装请求的方法
  request<T>(config: JWRequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      // 单个请求对请求config的处理
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config)
      }

      // 判断是否需要显示loading
      if (config.showLoading) {
        console.log('config.showLoading', config.showLoading)
        this.showLoading = config.showLoading
      }

      this.instance
        .request<any, T>(config)
        .then((res) => {
          // 单个请求对数据的处理
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res)
          }
          console.log('res', res)
          // 将showLoading变更回初始值，这样不会影响下一次请求
          this.showLoading = DEFAULT_LOADING
          // 将结果resolve返回出去
          resolve(res)
        })
        .catch((err) => {
          // 将showLoading变更回初始值，这样不会影响下一次请求
          this.showLoading = DEFAULT_LOADING
          reject(err)
          return err
        })
    })
  }

  get<T>(config: JWRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' })
  }

  post<T>(config: JWRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' })
  }

  delete<T>(config: JWRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE' })
  }

  patch<T>(config: JWRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'PATCH' })
  }
}

export default JWRequest
