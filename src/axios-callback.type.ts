import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { AxiosRequestConfigs } from './index.types'

// interface AxiosResponses
//     extends Pick<AxiosResponse, Exclude<keyof AxiosResponse, 'config'>> {}
/**
 * axios 请求后成功的回调
 */
export type AxiosResponseCallback = (axiosResponse: AxiosResponse) => Promise<{
    code: number
    message: string
    data: any
}>

/**
 * axios 请求配置回调
 */
export type AxiosRequestCallback = (
    config: AxiosRequestConfigs
) => AxiosRequestConfig

/**
 * axios 请求前 请求后的错误回调 的声明
 */
export type AxiosErrorCallback = (error: Error) => Promise<Error>

/**
 * 执行方法返回的对象所包含的属性
 */
export type GetValueByKeyInOpject = (
    key: string,
    object: { [k: string]: any }
) => any

/**
 * 添加请求记录
 */
export type AddRequestLog = (axiosConfigs: AxiosRequestConfigs) => boolean

/**
 * 移除求情记录
 */
export type RemoveRequestLog = () => void

// 记录请求记录
export type RequestLog = Array<string>
