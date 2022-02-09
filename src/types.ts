import {
    AxiosRequestConfig,
    AxiosInstance,
    AxiosResponse,
    Canceler,
} from 'axios'

export type LogMap = Map<string, Canceler>

export type RequestLog = Array<string>

export type GetTextWith = (message: string) => number

export type CreateMessage = (
    message: string,
    type?: 'success' | 'info' | 'warning' | 'danger'
) => void

export type CreateMessageNode = (
    message: string,
    type?: 'success' | 'info' | 'warning' | 'danger'
) => HTMLDivElement

export type CreateMaskLayerNode = () => HTMLDivElement

export type CreateLoadingNode = (loadingText: string | undefined) => void

export type CreateDottingNode = () => HTMLSpanElement

export type CreateTextNode = (
    loadingText: string | undefined
) => HTMLSpanElement

export type RemoveLoadingNode = (className: string) => void

export type LoadingList = Map<string, Function>
/**
 * successKey 和 successKeyValue配对使用的 要么全部都有 要么一个没有
 */
type SuccessKeyAndSuccessKeyValue =
    | { successKey?: never; successKeyValue?: never }
    | { successKey: string; successKeyValue: string }
/**
 * 自定义 axios 的配置
 * 添加 needLoading 是否需要遮罩层
 * 添加 loadingText 遮罩层展示的内容
 * 添加 axiosDebounce 接口是否防抖
 * 添加 contentType 接口的请求方式
 * 添加 successKey 代表接口请求成功的字段
 * 添加 successKeyValue 代表接口请求成功的字段的值
 */
export type AxiosRequestConfigs = AxiosRequestConfig &
    SuccessKeyAndSuccessKeyValue & {
        needLoading?: boolean
        loadingText?: string
        axiosDebounce?: boolean
        contentType?:
            | 'application/json'
            | 'application/x-www-form-urlencoded'
            | ' multipart/form-data'

        messageKey?: string
        dataKey?: string
    }
/**
 * 添加请求记录
 */
export type AddRequestLog = (axiosConfigs: AxiosRequestConfigs) => boolean

/**
 * 移除求情记录
 */
export type RemoveRequestLog = () => void
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
        successKey: string | undefined
        successKeyValue: number | string | undefined
        dataKey: string | undefined
        messageKey: string | undefined
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
) => Promise<R> | Promise<T>

/**
 * 参数在data字段中的声明
 */
export type ParamsInDataHelper = <T = any, R = AxiosResponse<T>>(
    url: string,
    data?: any,
    config?: AxiosRequestConfigs
) => Promise<R> | Promise<T>

/**
 * 参数既可以在params也可以在data的声明
 */
export type ParamsInParamsOrDataHelper = <T = any, R = AxiosResponse<T>>(
    url: string,
    params: { params?: any; data?: any },
    config?: AxiosRequestConfigs
) => Promise<R> | Promise<T>

/**
 * 执行方法返回的对象所包含的属性
 */
export type GetValueByKeyInOpject = (
    key: string,
    object: { [k: string]: any }
) => any

export type HandleAddResponseLog = (config: AxiosRequestConfigs) => void

export type HandleRemoveResponseLog = (config: AxiosRequestConfigs) => void
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
