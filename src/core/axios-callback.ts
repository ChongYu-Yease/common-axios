import {
    AxiosRequestCallback,
    AxiosErrorCallback,
    AxiosResponseCallback,
} from '../../types/axios-callback.type'

import { AxiosRequestConfigs } from '../../types/index.types'

// axios  防抖
import { AxiosDebounce } from './axios-debounce'

// 创建防抖实例
const axiosDebounceInstance = new AxiosDebounce()

import axios from 'axios'

import { Mask } from './create-mask'

// 遮罩层实例
const maskInstance = new Mask()

import { Message } from './create-message'

// 创建message实例
const messageInstance = new Message()

import { getValueByKeyInOpject } from "../utils/index"

/**
 * 请求前成功回调
 * @param config
 * @returns config
 */
export const axiosRequestCallback: AxiosRequestCallback = (config) => {
    const {
        needLoading,
        loadingText,
        axiosDebounce,
        contentType,
        axiosRequestCallback,
    } = config

    if (axiosRequestCallback && typeof axiosRequestCallback === 'function') {
        axiosRequestCallback(config)
    }

    // 先判断是否需要防抖 如果需要 需要防抖的话 如果接口被取消 就不再需要遮罩层
    if (axiosDebounce) {
        axiosDebounceInstance.handleRemoveAxiosQueue(config) // 在请求开始前，对之前的请求做检查取消操作
        axiosDebounceInstance.handleAddAxiosQueue(config) // 将当前请求添加到 pending 中
    }

    // 创建遮罩层
    if (needLoading || loadingText) {
        maskInstance.createLoading(config)
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
    return Promise.reject(error)
}

/**
 *
 * @param axiosResponse 请求返回成功回调
 * @returns
 */
export const axiosResponseCallback: AxiosResponseCallback = (axiosResponse) => {
    // 关闭遮罩层
    maskInstance.removeLoading(axiosResponse.config as AxiosRequestConfigs)
    // 获取配置
    const {
        errorKey,
        errorKeyValue,
        dataKey,
        messageKey,
        axiosResponseCallback,
    } = axiosResponse.config as AxiosRequestConfigs

    // 执行自定义事件
    if (axiosResponseCallback && typeof axiosResponseCallback == 'function') {
        axiosResponseCallback(axiosResponse)
    }

    // 处理错误提示
    if (errorKey && errorKeyValue) {
        // 获取代表失败的值
        const _errorKeyValue = getValueByKeyInOpject(
            errorKey,
            axiosResponse.data
        )

        if (_errorKeyValue == errorKeyValue) {
            if (messageKey) {
                // 获取消息内容
                const messageValue = getValueByKeyInOpject(
                    messageKey,
                    axiosResponse.data
                )
                messageInstance.createMessage({
                    message: `${messageValue}`,
                    messageType: 'error',
                    center: false,
                    messageDuration: 2000,
                    showClose: false,
                })
            }
        }
    }

    // 返回数据
    if (dataKey) {
        return Promise.resolve(
            getValueByKeyInOpject(dataKey, axiosResponse.data)
        )
    } else {
        return Promise.resolve(axiosResponse.data)
    }


}

/**
 *
 * @param axiosResponse 请求返回错误回调
 * @returns
 */
export const axiosResponseErrorCallback: AxiosErrorCallback = (error) => {
    if (axios.isCancel(error)) {
        messageInstance.createMessage({
            message: `检测到${error.message}多次重复请求，接口已取消`,
            messageType: 'error',
            center: true,
        })
    } else {
        messageInstance.createMessage({
            message: error.message,
            messageType: 'error',
            center: true,
        })
    }
    return Promise.reject(error)
}
