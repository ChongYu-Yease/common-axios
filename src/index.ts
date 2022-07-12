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
 * 错误 消息 配置
 * errorStatusKey 和 errorStatusKeyValue 要么全部都有 要么一个没有
 */
export type ErrorStatusKeyAnderrorStatusKeyValue =
    | {
        /* 代表失败的参数的key */
        errorStatusKey?: never

        /* 代表失败的参数的key所对应的值 */
        errorStatusKeyValue?: never
    }
    | {
        /* 代表失败的参数的key */
        errorStatusKey: string

        /* 代表失败的参数的key所对应的值 */
        errorStatusKeyValue: string | number
    }

/**
 * 成功 消息 配置
 * successStatusKey 和 successStatusKeyValue 要么全部都有 要么一个没有
 */
export type SuccessStatusKeyAndsuccessStatusKeyValue = {
    /* 代表成功的参数的key */
    successStatusKey?: never

    /* 代表成功的参数的key所对应的值 */
    successStatusKeyValue?: never
} | {
    /* 代表成功的参数的key */
    successStatusKey: string

    /* 代表成功的参数的key所对应的值 */
    successStatusKeyValue: string | number
}

// axios content-type
export type AxiosRequestContentType = {
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
export type AxiosRequestConfigs =
    AxiosRequestConfig &
    SuccessStatusKeyAndsuccessStatusKeyValue &
    ErrorStatusKeyAnderrorStatusKeyValue &
    AxiosRequestContentType &
    {
        /* 是否创建遮罩层，默认为false */
        needLoading?: boolean

        /* 遮罩层展示的内容 默认为 "拼命加载中" */
        loadingText?: string

        /* 接口防抖 应用场景：同一个接口，同一个请求方式，同样的请求参数发起了多次数据请求，当第一次发起请求的接口没有返回数据之前，后续的接口都会被取消 */
        axiosDebounce?: boolean

        /* 消息持续时间 默认为2000毫秒 */
        messageDuration?: number

        /* 消息提示位置 默认为left */
        messagePosition?: 'left' | 'center' | 'right'

        /* 错误消息字段所对应的key 默认undefind */
        errorMessageContentKey?: string

        /* 错误消息持续时间 如果没有配置 且配置了 messageDuration 属性 则执行 messageDuration 的配置  */
        errorMessageDuration?: number

        /* 错误消息提示的位置 如果没有配置 且配置了 messagePosition 属性 则执行 messagePosition 的配置  */
        errorMessagePosition?: 'left' | 'center' | 'right'

        /* 错误消息提示的自定义内容 优先级高于 errorMessageContentKey 所对应的内容 */
        errorMessageContent?: string

        /* 成功消息字段所对应的key 默认undefind */
        successMessageContentKey?: string

        /* 成功消息持续时间 如果没有配置 且配置了 messageDuration 属性 则执行 messageDuration 的配置 */
        successMessageDuration?: number

        /* 成功消息提示的位置 如果没有配置 且配置了 messagePosition 属性 则执行 messagePosition 的配置 */
        successMessagePosition?: 'left' | 'center' | 'right'

        /* 成功消息提示的自定义内容 优先级高于 successMessageContentKey 所对应的内容 */
        successMessageContent?: string

        /* 代表返回数据的key，支持a.b.c */
        /**
         * 例如: 后端返回的数据是
         *
         * {
         *  a: {
         *       b:{
         *          c:"我是c"
         *         }
         *     }
         *  }
         *
        */
        dataKey?: string

        /* 拦截成功回调 用于全局拦截 */
        axiosResponseCallback?: (axiosResponse: AxiosResponse) => void

        /* 请求成功回调 用于全局拦截 */
        axiosRequestCallback?: (axiosRequestConfigs: AxiosRequestConfigs) => void
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


/* 创建axios实例 */
import { createAxiosInstance } from './core/create-axios'



/* 创建axioshelper */
import {
    createParamsInParamsHelper,
    createParamsInDataHelper,
    createParamsInParamsOrDataHelper,
} from './core/create-helper'

/* axios request 所有的回调函数 */
import {
    axiosRequestCallback,
    axiosRequestErrorCallback,
} from "./core/axios-request-callback"

/* axios response 所有的回调函数 */
import {
    axiosResponseCallback,
    axiosResponseErrorCallback,
} from './core/axios-response-callback'



/**
 * @param {AxiosRequestConfigs}initAxiosRequestConfig
 * @returns {}
 */
export const createAxios: CreateAxios = (initAxiosRequestConfig) => {
    /* 创建axios实例 */
    const axiosInstance = createAxiosInstance(initAxiosRequestConfig)

    /** 添加请求拦截器 **/
    axiosInstance.interceptors.request.use(
        (config: AxiosRequestConfigs) => axiosRequestCallback(config),
        (error) => axiosRequestErrorCallback(error)
    )

    /** 添加响应拦截器 **/
    axiosInstance.interceptors.response.use(
        (axiosResponse) => axiosResponseCallback(axiosResponse),
        (error) => axiosResponseErrorCallback(error)
    )

    const axiosHelpers: AxiosHelpers = {
        get: createParamsInParamsHelper(axiosInstance, 'get'),

        head: createParamsInParamsHelper(axiosInstance, 'head'),

        delete: createParamsInParamsOrDataHelper(axiosInstance, 'delete'),

        options: createParamsInParamsOrDataHelper(axiosInstance, 'options'),

        post: createParamsInDataHelper(axiosInstance, 'post'),

        put: createParamsInDataHelper(axiosInstance, 'put'),

        patch: createParamsInDataHelper(axiosInstance, 'patch'),
    }

    return axiosHelpers
}
