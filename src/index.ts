import {
    createAxiosInstance,
    createParamsInParamsHelper,
    createParamsInDataHelper,
    createParamsInParamsOrDataHelper,
    axiosRequestCallback,
    axiosRequestErrorCallback,
    axiosResponseCallback,
    axiosResponseErrorCallback,
} from './config'

import { CreateAxios, AxiosHelpers, AxiosRequestConfigs } from './types'
/**
 * @param AxiosRequestConfigs
 */
export const createAxios: CreateAxios = (initAxiosRequestConfig) => {
    const successKey = initAxiosRequestConfig.successKey || 'code'

    const successKeyValue = initAxiosRequestConfig.successKeyValue || 200

    const messageKey = initAxiosRequestConfig.messageKey || 'message'

    const dataKey = initAxiosRequestConfig.dataKey || 'data'

    let temSuccessKey: string

    let temSuccessKeyValue: string | number

    let temMessageKey: string

    let temDataKey: string

    /* 创建axios实例 */
    const axiosInstance = createAxiosInstance(initAxiosRequestConfig)

    /** 添加请求拦截器 **/
    axiosInstance.interceptors.request.use(
        (config: AxiosRequestConfigs) => {
            const { successKey, successKeyValue, messageKey, dataKey } = config
            temSuccessKey = successKey ? successKey : ''
            temSuccessKeyValue = successKeyValue ? successKeyValue : ''
            temMessageKey = messageKey ? messageKey : ''
            temDataKey = dataKey ? dataKey : ''
            return axiosRequestCallback(config)
        },
        (error) => axiosRequestErrorCallback(error)
    )
    /** 添加响应拦截器  **/
    axiosInstance.interceptors.response.use(
        (axiosResponse) =>
            axiosResponseCallback(axiosResponse, {
                // 临时配置的优先级更高
                successKey: temSuccessKey ? temSuccessKey : successKey,
                successKeyValue: temSuccessKeyValue
                    ? temSuccessKeyValue
                    : successKeyValue,
                dataKey: temDataKey ? temDataKey : dataKey,
                messageKey: temMessageKey ? temMessageKey : messageKey,
            }),
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
