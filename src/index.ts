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

import { CreateAxios, AxiosHelpers, AxiosRequestConfigs } from './types'

// 引入公共样式 主要是body 遮罩层 loading动画的效果
import './index.css'

/**
 * @param AxiosRequestConfigs
 */
export const createAxios: CreateAxios = (initAxiosRequestConfig) => {
    // 初始化的用户配置
    const initResponseConfig: AxiosRequestConfigs = {
        // 代表成功的key
        successKey: initAxiosRequestConfig.successKey
            ? initAxiosRequestConfig.successKey
            : '',

        // 代表成功key的value
        successKeyValue: initAxiosRequestConfig.successKeyValue
            ? initAxiosRequestConfig.successKeyValue
            : '',

        // 代表信息的key
        messageKey: initAxiosRequestConfig.messageKey,

        // 代表数据的key
        dataKey: initAxiosRequestConfig.dataKey,
    }

    // 临时的用户配置
    const temResponseConfig: AxiosRequestConfigs = {
        // 临时代表成功的key
        successKey: '',

        // 临时代表成功的key的值
        successKeyValue: '',

        // 临时代表信息的key
        messageKey: '',

        // 临时代表数据的key
        dataKey: '',
    }

    /* 创建axios实例 */
    const axiosInstance = createAxiosInstance(initAxiosRequestConfig)

    /** 添加请求拦截器 **/
    axiosInstance.interceptors.request.use(
        (config: AxiosRequestConfigs) => {
            // 将临时配置保存起来，给 添加响应拦截 器使用
            temResponseConfig.successKey = config.successKey
                ? config.successKey
                : ''

            temResponseConfig.successKeyValue = config.successKeyValue
                ? config.successKeyValue
                : ''

            temResponseConfig.messageKey = config.messageKey

            temResponseConfig.dataKey = config.dataKey

            return axiosRequestCallback(config)
        },
        (error) => axiosRequestErrorCallback(error)
    )
    /** 添加响应拦截器 **/
    axiosInstance.interceptors.response.use(
        (axiosResponse) => {
            return axiosResponseCallback(
                axiosResponse,
                initResponseConfig,
                temResponseConfig
            )
        },
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
