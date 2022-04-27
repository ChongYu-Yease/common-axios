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



import {
    CreateAxios,
    AxiosHelpers,
    AxiosRequestConfigs,
} from '../types/index.types'

/**
 * @param AxiosRequestConfigs
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
