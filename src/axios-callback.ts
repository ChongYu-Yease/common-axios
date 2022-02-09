import {
    AxiosRequestCallback,
    AxiosErrorCallback,
    AxiosResponseCallback,
    GetValueByKeyInOpject,
    AddRequestLog,
    RequestLog,
    RemoveRequestLog,
} from './types'
import { handleRemoveResponseLog, handleAddResponseLog } from './config'
import axios from 'axios'
import qs from 'qs'
import { createLoadingNode, removeLoadingNode } from './create-elements'

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
    console.log(1111)

    removeLoadingNode()
    return Promise.reject(error)
}
/**
 *
 * @param axiosResponse 请求返回的参数
 * @returns
 */
export const axiosResponseCallback: AxiosResponseCallback = (
    axiosResponse,
    { successKey, successKeyValue, messageKey, dataKey }
) => {
    removeRequestLog()
    // 请求完毕无论成功与否，关闭遮罩层

    if (successKey && successKeyValue) {
        const codeValue = getValueByKeyInOpject(successKey, axiosResponse.data)
        if (codeValue == successKeyValue) {
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
                return Promise.reject(message)
            }
            return Promise.reject(axiosResponse.data)
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
        console.log('axios.isCancel(error)')
    } else {
        console.log('else', error)
    }

    return Promise.reject(error)
}
