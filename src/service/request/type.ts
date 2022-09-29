import { AxiosRequestConfig, AxiosResponse } from 'axios'

export interface JWRequestInterceptors<T = AxiosResponse> {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorCatch?: (error: any) => any
  responseInterceptor?: (res: T) => T
  responseInterceptorCatch?: (error: any) => any
}

export interface JWRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: JWRequestInterceptors<T>
  showLoading?: boolean
}
