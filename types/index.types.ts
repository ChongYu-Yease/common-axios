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
 * successKey 和 successKeyValue配对使用的 要么全部都有 要么一个没有
 */
type SuccessKeyAndSuccessKeyValue =
    | {
          successKey?: never /* 代表成功的参数的key */
          successKeyValue?: never /* 代表成功的参数的key所对应的值 */
      }
    | {
          successKey: string /* 代表成功的参数的key */
          successKeyValue: string /* 代表成功的参数的key所对应的值 */
      }

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
        needLoading?: boolean /* 是否创建遮罩层，默认为否 */
        loadingText?: string /* 遮罩层展示的内容*/
        axiosDebounce?: boolean /* 接口防抖 应用场景：同一个接口，同一个请求方式，同样的请求参数发起了多次数据请求，当第一次发起请求的接口没有返回数据之前，后续的接口都会被取消 */
        contentType?: /* 请求参数在request body 请求的contentType 默认为'application/json' */
        | 'application/json'
            | 'application/x-www-form-urlencoded'
            | ' multipart/form-data'
        messageKey?: string /* 消息字段 */
        dataKey?: string /* 数据的字段 */
        axiosResponseCallback?: (axiosResponse: AxiosResponse) => void
        axiosRequestCallback?: (
            axiosRequestConfigs: AxiosRequestConfigs
        ) => void
    }

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
