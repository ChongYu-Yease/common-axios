/* 创建axios实例 */
import { createAxiosInstance } from './create-axios'

/* 创建axioshelper */
import {
    createParamsInParamsHelper,
    createParamsInDataHelper,
    createParamsInParamsOrDataHelper,
} from './create-helper'

import {
    axiosRequestCallback,
    axiosRequestErrorCallback,
    axiosResponseCallback,
    axiosResponseErrorCallback,
} from './axios-callback'

import { CreateAxios, AxiosHelpers, AxiosRequestConfigs } from './index.types'

// 引入公共样式 主要是body 遮罩层 loading动画的效果
import './index.css'

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
