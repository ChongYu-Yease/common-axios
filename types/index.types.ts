import { AxiosRequestConfig, AxiosResponse } from 'axios'

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

export type LoadingList = Map<string, Function>


/**
 * 失败配置
 * errorKey 和 errorKeyValue 要么全部都有 要么一个没有
 */
type ErrorKeyAndErrorKeyValue =
    | {
        errorKey?: never /* 代表失败的参数的key */
        errorKeyValue?: never /* 代表失败的参数的key所对应的值 */
    }
    | {
        errorKey: string /* 代表失败的参数的key */
        errorKeyValue: string /* 代表失败的参数的key所对应的值 */
    }

// axios content-type
type AxiosRequestContentType = {
    contentType?:
    | 'application/json'
    | 'application/x-www-form-urlencoded'
    | ' multipart/form-data'
}

/**
 * 自定义 axios 的配置
 * 添加 needLoading 是否需要遮罩层
 * 添加 loadingText 遮罩层展示的内容
 * 添加 axiosDebounce 接口是否防抖
 * 添加 contentType 接口的请求方式
 * 添加 axiosResponseCallback 代表响应拦截器成功的回调
 * 添加 axiosRequestCallback 代表请求拦截器成功的回调
 */
export type AxiosRequestConfigs = AxiosRequestConfig &
    ErrorKeyAndErrorKeyValue &
    AxiosRequestContentType & {
        needLoading?: boolean /* 是否创建遮罩层，默认为否 */
        loadingText?: string /* 遮罩层展示的内容 默认为拼命加载中*/
        axiosDebounce?: boolean /* 接口防抖 应用场景：同一个接口，同一个请求方式，同样的请求参数发起了多次数据请求，当第一次发起请求的接口没有返回数据之前，后续的接口都会被取消 */
        messageKey?: string /* 消息字段 */
        dataKey?: string /* 数据的字段 */
        // 拦截成功回调 用于全局拦截
        axiosResponseCallback?: (axiosResponse: AxiosResponse) => void
        // 请求成功回调 用于全局拦截
        axiosRequestCallback?: (
            axiosRequestConfigs: AxiosRequestConfigs
        ) => void
    }

/**
 * 参数在params的声明
 */
export type ParamsInParamsHelper = <T = any>(
    url: string,
    params?: any,
    config?: AxiosRequestConfigs
) => Promise<T>

/**
 * 参数在data字段中的声明
 */
export type ParamsInDataHelper = <T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfigs
) => Promise<T>

/**
 * 参数既可以在params也可以在data的声明
 */
export type ParamsInParamsOrDataHelper = <T = any>(
    url: string,
    params: { params?: any; data?: any },
    config?: AxiosRequestConfigs
) => Promise<T>

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
