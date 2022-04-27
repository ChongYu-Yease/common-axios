import { AxiosResponse } from 'axios'
import { AxiosRequestConfigs } from './index.types'
/**
 * axios 请求后成功的回调
 */
export type AxiosResponseCallback = <T = any, R = AxiosResponse<T>>(
    axiosResponse: AxiosResponse
) => Promise<R> | Promise<T>

/**
 * axios 请求配置回调
 */
export type AxiosRequestCallback = (
    config: AxiosRequestConfigs
) => AxiosRequestConfigs

/**
 * axios 请求前 请求后的错误回调 的声明
 */
export type AxiosErrorCallback = (error: Error) => Promise<Error>


