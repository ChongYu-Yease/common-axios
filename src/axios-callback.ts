import {
    AxiosRequestCallback,
    AxiosErrorCallback,
    AxiosResponseCallback,
    GetValueByKeyInOpject,
    GetConfigInConfigs,
    AddRequestLog,
    RequestLog,
    RemoveRequestLog,
} from './types'

import { handleRemoveResponseLog, handleAddResponseLog } from './config'

import axios from 'axios'

import qs from 'qs'

import { createLoadingNode, removeLoadingNode } from './create-elements'

// 请求记录
const requestLog: RequestLog = []

/**
 * 添加axios请求记录 并返回需不要需要创建遮罩层
 * @param config axios resquest config
 * @returns boolean
 */
const addRequestLog: AddRequestLog = (config) => {
    const key = [
        config.method,
        config.url,
        qs.stringify(config.params),
        qs.stringify(config.data),
    ].join('&')

    if (requestLog.length === 0) {
        requestLog.push(key)
        return true
    } else {
        requestLog.push(key)
        return false
    }
}

/**
 * 移除请求记录
 */
const removeRequestLog: RemoveRequestLog = () => {
    requestLog.pop()
    if (requestLog.length === 0) removeLoadingNode()
}

/**
 * 通过key查找object里面的值
 * @param key object的属性
 * @param object 数据
 * @returns object[key]
 */
const getValueByKeyInOpject: GetValueByKeyInOpject = (key, object) => {
    if (!key) return object
    if (key.includes('.')) {
        const keys: Array<string> = key.split('.')
        let index = 0
        let temValue: any
        while (index < keys.length) {
            const key = keys[index]
            if (!temValue) {
                temValue = object[key]
            } else {
                temValue = temValue[key]
            }
            index++
        }
        return temValue
    } else {
        return object[key]
    }
}

/**
 * 请求拦截器callback
 * @param config
 * @returns config
 */
export const axiosRequestCallback: AxiosRequestCallback = (config) => {
    const { needLoading, loadingText, axiosDebounce, contentType } = config

    // 先判断是否需要防抖 如果需要 需要防抖的话 如果接口被取消 就不再需要遮罩层
    if (axiosDebounce) {
        handleRemoveResponseLog(config) // 在请求开始前，对之前的请求做检查取消操作
        handleAddResponseLog(config) // 将当前请求添加到 pending 中
    }

    // 如果需要遮罩层 那就创建遮罩层节点
    if (needLoading) {
        const needLoad = addRequestLog(config)

        // TODO 向map里面添加数据
        if (needLoad) createLoadingNode(loadingText)
    }
    // 修改content-type
    if (contentType) {
        config.headers = {
            ...config.headers,
            'Content-Type': contentType,
        }
    }
    return config
}

/**
 * 请求前错误回调
 * @param error 错误信息
 * @returns error
 */
export const axiosRequestErrorCallback: AxiosErrorCallback = (error) => {
    removeLoadingNode()
    return Promise.reject(error)
}

/**
 * 获取用户配置 临时配置优先级高于初始化配置
 * @param initResponseConfig 用户初始化的配置
 * @param temResponseConfig 用户临时配置
 */
const getConfigInConfigs: GetConfigInConfigs = (
    initResponseConfig,
    temResponseConfig
) => {
    // 计算 successKey
    const successKey = temResponseConfig.successKey
        ? temResponseConfig.successKey
        : initResponseConfig.successKey
        ? initResponseConfig.successKey
        : ''

    // 计算 successKeyValue
    const successKeyValue = temResponseConfig.successKeyValue
        ? temResponseConfig.successKeyValue
        : initResponseConfig.successKeyValue
        ? initResponseConfig.successKeyValue
        : ''

    // 计算 dataKey
    const dataKey = temResponseConfig.dataKey
        ? temResponseConfig.dataKey
        : initResponseConfig.dataKey
        ? initResponseConfig.dataKey
        : ''

    // 计算 messageKey
    const messageKey = temResponseConfig.messageKey
        ? temResponseConfig.messageKey
        : initResponseConfig.messageKey
        ? initResponseConfig.messageKey
        : ''

    // 重置 临时配置
    temResponseConfig.successKey = ''
    temResponseConfig.successKeyValue = ''
    temResponseConfig.messageKey = ''
    temResponseConfig.dataKey = ''

    return { successKey, successKeyValue, dataKey, messageKey }
}

/**
 *
 * @param axiosResponse 请求返回的参数
 * @returns
 */
export const axiosResponseCallback: AxiosResponseCallback = (
    axiosResponse,
    initResponseConfig,
    temResponseConfig
) => {
    // 请求完毕无论成功与否，关闭遮罩层
    removeRequestLog()
    // 获取用户临时配置
    const { successKey, successKeyValue, dataKey, messageKey } =
        getConfigInConfigs(initResponseConfig, temResponseConfig)

    if (successKey && successKeyValue) {
        const _successKeyValue = getValueByKeyInOpject(
            successKey,
            axiosResponse.data
        )

        if (_successKeyValue == successKeyValue) {
            // createMessage('成功了!', 'success')
            // createMessage('默认的!', 'info')
            // createMessage('警告的!', 'warning')
            // createMessage('错误的!', 'danger')
            if (dataKey) {
                return Promise.resolve(
                    getValueByKeyInOpject(dataKey, axiosResponse.data)
                )
            } else {
                return Promise.resolve(axiosResponse.data)
            }
        } else {
            if (messageKey) {
                const message = getValueByKeyInOpject(
                    messageKey,
                    axiosResponse.data
                )
                throw new Error(message)
            }
            throw SyntaxError(axiosResponse.data.message)
        }
    } else {
        return Promise.resolve(axiosResponse)
    }
}
/**
 *
 * @param axiosResponse 请求返回的参数
 * @returns
 */
export const axiosResponseErrorCallback: AxiosErrorCallback = (error) => {
    removeLoadingNode()
    if (axios.isCancel(error)) {
        console.log('axios.isCancel')
    } else {
        console.log('else', error)
    }
    return Promise.reject(error)
}
