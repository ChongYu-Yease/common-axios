import {
    AxiosRequestConfig,
    AxiosInstance,
    AxiosResponse,
    Canceler,
} from 'axios'

export type LogMap = Map<string, Canceler>

export type CreateLoadingNode = (loadingText: string | undefined) => void

export type RemoveLoadingNode = (className: string) => void

export type LoadingList = Map<string, Function>
/**
 * 自定义 axios 的配置
 * 添加 needLoading 是否需要遮罩层
 * 添加 loadingText 遮罩层展示的内容
 * 添加 axiosDebounce 接口是否防抖
 * 添加 contentType 接口的请求方式
 * 添加 successKey 代表接口请求成功的字段
 * 添加 successKeyValue 代表接口请求成功的字段的值
 */
export interface AxiosRequestConfigs extends AxiosRequestConfig {
    needLoading?: boolean
    loadingText?: string
    axiosDebounce?: boolean
    contentType?:
        | 'application/json'
        | 'application/x-www-form-urlencoded'
        | ' multipart/form-data'
    successKey?: string
    successKeyValue?: string | number
    messageKey?: string
    dataKey?: string
}
/**
 * 创建axios实例
 */
export type CreateAxiosInstance = (config: AxiosRequestConfigs) => AxiosInstance
/**
 * axios的请求方法
 */
export type AxiosMethods =
    | 'get'
    | 'post'
    | 'put'
    | 'delete'
    | 'head'
    | 'put'
    | 'patch'
    | 'options'

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
 * axios 请求后成功的回调
 */
export type AxiosResponseCallback = (
    axiosResponse: AxiosResponse<any>,
    axiosResponseConfig: {
        successKey: string
        successKeyValue: number | string
        dataKey: string
        messageKey: string
    }
) => Promise<{
    code: number
    message: string
    data: any
}>

/**
 * 参数在params的声明
 */
export type ParamsInParamsHelper = <T = any, R = AxiosResponse<T>>(
    url: string,
    params?: any,
    config?: AxiosRequestConfigs
) => Promise<R>

/**
 * 参数在data字段中的声明
 */
export type ParamsInDataHelper = <T = any, R = AxiosResponse<T>>(
    url: string,
    data?: any,
    config?: AxiosRequestConfigs
) => Promise<R>

/**
 * 参数既可以在params也可以在data的声明
 */
export type ParamsInParamsOrDataHelper = <T = any, R = AxiosResponse<T>>(
    url: string,
    params: { params?: any; data?: any },
    config?: AxiosRequestConfigs
) => Promise<R>

// export type CreateParamsInParamsHelper = (
//     axiosInstance: AxiosInstance,
//     method: AxiosMethods
// ) => (
//     url: string,
//     params?: any,
//     config?: AxiosRequestConfigs
// ) => ParamsInParamsHelper
/**
 * 执行方法返回的对象所包含的属性
 */
export interface AxiosHelpers {
    get: ParamsInParamsHelper
    head: ParamsInParamsHelper
    options: ParamsInParamsOrDataHelper
    delete: ParamsInParamsOrDataHelper
    put: ParamsInDataHelper
    post: ParamsInDataHelper
    patch: ParamsInDataHelper
}

export type CreateAxios = (
    axiosRequestConfigs: AxiosRequestConfigs
) => AxiosHelpers
